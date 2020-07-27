from django.contrib import admin
from .models import Level, Category, AgeGroup, MaterialsFile, LessonPlan, Order

class LessonPlanAdmin(admin.ModelAdmin):
    filter_horizontal = ("level", "category", "age_group", "permitted_user")

admin.site.register(Level)
admin.site.register(Category)
admin.site.register(AgeGroup)
admin.site.register(MaterialsFile)
admin.site.register(LessonPlan, LessonPlanAdmin)
admin.site.register(Order)
