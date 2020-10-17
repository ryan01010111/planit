from django.urls import path, include
from .views import RegisterAPI, LoginAPI, UserAPI, PurchasedMaterialsAPI
from knox import views as knox_views

urlpatterns = [
    path('auth', include('knox.urls')),
    path('auth/register', RegisterAPI.as_view()),
    path('auth/login', LoginAPI.as_view()),
    path('auth/user', UserAPI.as_view()),
    path('auth/logout', knox_views.LogoutView.as_view(), name='knox_logout'),
    path('auth/password_reset/',
         include('django_rest_passwordreset.urls', namespace='password_reset')),
    path('auth/purchased_materials', PurchasedMaterialsAPI.as_view())
]
