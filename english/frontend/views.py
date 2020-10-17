from django.shortcuts import render, redirect
from django.views.decorators.cache import never_cache


@never_cache
def index(request):
    return render(request, 'frontend/index.html')
