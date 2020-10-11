from django.urls import path
from rest_framework import routers
from .views import LessonPlanViewSet, MaterialsViewAPI, MyOrdersAPI, CreatePaymentIntentAPI, StripeWebhookAPI

router = routers.DefaultRouter(trailing_slash=False)
router.register("materials", LessonPlanViewSet, "materials")

urlpatterns = router.urls + [
    path('view_materials/<int:id>', MaterialsViewAPI.as_view()),
    path('create_payment', CreatePaymentIntentAPI.as_view()),
    path('my_orders', MyOrdersAPI.as_view()),
    path('stripe_webhook', StripeWebhookAPI.as_view())
]
