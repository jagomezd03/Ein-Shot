from django.shortcuts import render
from django.http import HttpResponse
# Create your views here.

def index(request):
    return render(request, 'home.html')
def home_es(request):
    return render(request, 'es/main.html')
def menu_es(request):
    return render(request, 'es/menu.html')
def home_en(request):
    return render(request, 'en/main.html')
def menu_en(request):
    return render(request, 'en/menu.html')