from django.shortcuts import render
# Create your views here.

def index(request):
    return render(request, 'index.html')

def category(request):
    return render(request, 'categorytemplate.html')

def preferences(request):
    return render(request, 'preferences.html')

def carrito(request):
    return render(request, 'carrito.html')