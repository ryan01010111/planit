from rest_framework import viewsets, generics, permissions
from rest_framework.response import Response
from .serializers import LessonPlanSerializer, OrderSerializer
from django.contrib.auth.models import User
from .models import LessonPlan, MaterialsFile, Order
import stripe
import os
import json

stripe.api_key = os.getenv("STRIPE_SECRET_KEY")

class LessonPlanViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = LessonPlan.objects.all().order_by("-created")
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = LessonPlanSerializer

class MaterialsViewAPI(generics.RetrieveAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]

    def get(self, request, id):
        user = self.request.user
        isPurchased = id in user.purchased_plans.all().values_list("pk", flat=True)
        if isPurchased:
            item = user.purchased_plans.get(pk=id)
            url = item.materials_file.file.url
            return Response({ "url": str(url) })
        else:
            return Response({ "unauthorized": "you haven't purchased this item" }, 401)

class CreatePaymentIntentAPI(generics.CreateAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    
    def post(self, request):
        user = self.request.user
        try:
            data = json.loads(self.request.body)
            try:
                item = LessonPlan.objects.get(pk=data["itemID"])
            except LessonPlan.DoesNotExist:
                raise Exception("Item does not exist")

            order = None
            orders = user.orders.filter(placed=False)
            if not orders:
                order = Order(user=user, item=item)
            else:
                order = orders[0]
                order.item = item
            order.total = item.price
            order.save()

            order_amount = int(item.price * 100)     # smallest unit of currency
            description = item.title[0:23]          # max 22 chars

            payment_intent = stripe.PaymentIntent.create(
                amount = order_amount,
                currency = "usd",
                description = description,
                metadata = {"order_id": order.pk},
                payment_method_types = ["card"],
                receipt_email = user.email
            )
            return Response({ "clientSecret": payment_intent["client_secret"] })

        except Exception as e:
            return Response({ "error": str(e) }, 403)

class StripeWebhookAPI(generics.CreateAPIView):
    permission_classes = [
        permissions.AllowAny,
    ]

    def post(self, request):
        data = self.request.body
        event = None

        try:
            event = stripe.Event.construct_from(json.loads(data), stripe.api_key)
        except ValueError as e:
            return Response(status=400)

        if event.type == 'payment_intent.succeeded':
            payment_intent = event.data.object
            order_id = payment_intent["metadata"]["order_id"]
            order = Order.objects.get(pk=order_id)
            order.set_placed()
            order.save()
        elif event.type == 'charge.succeeded':
            payment_intent = event.data.object
            order_id = payment_intent["metadata"]["order_id"]
            order = Order.objects.get(pk=order_id)
            order.set_status('PS')
            order.save()
            user = order.user
            user.purchased_plans.add(order.item)
            user.save()
        elif event.type == 'charge.failed':
            payment_intent = event.data.object
            order_id = payment_intent["metadata"]["order_id"]
            order = Order.objects.get(pk=order_id)
            order.set_status('PF')
            order.save()
        else:
            return Response(status=400)

        return Response(status=200)

class MyOrdersAPI(generics.ListAPIView):
    serializer_class = OrderSerializer
    permission_classes = [
        permissions.IsAuthenticated,
    ]

    def get_queryset(self):
        user = self.request.user
        return user.orders.filter(placed=True).order_by("-timestamp")

    def list(self, request):
        queryset = self.get_queryset()
        serializer = OrderSerializer(queryset, many=True)
        return Response(serializer.data)
