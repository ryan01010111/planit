from django.db import models
from django.conf import settings
from django.contrib.auth.models import User
import uuid
import os

ORDER_STATUSES = [
    (None, 'not open'),
    ('AP', 'awaiting payment'),
    ('PS', 'payment succeeded'),
    ('PF', 'payment failed')
]

def create_filename(instance, filename):
    ext = filename.split('.')[-1]
    new_filename = "%s.%s" % (uuid.uuid4(), ext)
    if ext.lower() in ['png', 'jpg', 'jpeg']:
        folder = 'sample_images'
    else:
        folder = 'materials'
    return os.path.join(f"{settings.MEDIA_ROOT}/{folder}", new_filename)


class Level(models.Model):
    code = models.CharField(max_length=16)

    def __str__(self):
        return self.code


class Category(models.Model):
    name = models.CharField(max_length=64)

    def __str__(self):
        return self.name

class AgeGroup(models.Model):
    name = models.CharField(max_length=64)

    def __str__(self):
        return self.name

class MaterialsFile(models.Model):
    name = models.CharField(max_length=128)
    file = models.FileField(null=True, blank=True, upload_to=create_filename)

    def __str__(self):
        return self.name

class LessonPlan(models.Model):
    title = models.CharField(max_length=128)
    level = models.ManyToManyField(Level, related_name="plans_by_level")
    category = models.ManyToManyField(Category, related_name="plans_by_category")
    age_group = models.ManyToManyField(AgeGroup, related_name="plans_by_age_group")
    duration = models.IntegerField()
    description = models.TextField()
    instructions = models.TextField()
    created = models.DateTimeField(auto_now_add=True)
    sample_image = models.ImageField(null=True, blank=True, upload_to=create_filename)
    materials_file = models.ForeignKey(MaterialsFile, null=True, blank=True, on_delete=models.SET_NULL)
    permitted_user = models.ManyToManyField(User, related_name="purchased_plans")
    price = models.DecimalField(max_digits=8, decimal_places=2, default=1.00)

    def __str__(self):
        return self.title

class Order(models.Model):
    user = models.ForeignKey(User, null=True, blank=True, on_delete=models.SET_NULL, related_name="orders")
    item = models.ForeignKey(LessonPlan, null=True, blank=True, on_delete=models.SET_NULL)
    total = models.DecimalField(max_digits=8, decimal_places=2)
    timestamp = models.DateTimeField(auto_now=True)
    placed = models.BooleanField(default=False)
    status = models.CharField(max_length=5, choices=ORDER_STATUSES, null=True, blank=True, default=None)

    def set_placed(self):
        self.placed = True
        if not self.status:
            self.status = 'AP'

    def set_status(self, new_status):
        self.status = new_status
        if not self.placed:
            self.placed = True

    def __str__(self):
        return str(self.pk)
