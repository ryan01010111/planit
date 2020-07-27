from django.urls import path
from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("materials", views.catch, name="materials"),
    path("view/<int:id>", views.catch_view, name="view")
]
