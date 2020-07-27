from rest_framework import serializers
from .models import LessonPlan, Order

# LessonPlan serializer
class LessonPlanSerializer(serializers.ModelSerializer):
    level = serializers.StringRelatedField(many=True)
    category = serializers.StringRelatedField(many=True)
    age_group = serializers.StringRelatedField(many=True)

    class Meta:
        model = LessonPlan
        fields = ("id", "title", "level", "category", "age_group", "duration",
            "description", "instructions", "sample_image", "price")

class OrderSerializer(serializers.ModelSerializer):
    item = serializers.StringRelatedField()

    class Meta:
        model = Order
        fields = ("id", "item", "total", "timestamp", "status")
