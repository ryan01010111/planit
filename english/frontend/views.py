from django.shortcuts import render, redirect

def index(request):
    return render(request, 'frontend/index.html')

def catch(request):
    return redirect('index')

def catch_view(request, id):
    return redirect('index')
