"""einshot URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
#Import for using the DB from sqlite from django.contrib import admin
from django.urls import path,include
from customer import views as customerViews
from administration import views as adminViews

urlpatterns = [
    # Admin path to the DB from sqlite path('admin/', admin.site.urls),
    path('', customerViews.index),
    path('preferences/', customerViews.preferences, name="preferences"),
    path('category/', customerViews.category, name="categorytemplate"),
    path('carrito/', customerViews.carrito, name="carrito"),
    path('admin/',adminViews.homeAdmin, name="adminindex"),
    path('admin/facturas', adminViews.facturas, name='empleado'),
    path('admin/registrados', adminViews.registrados, name='clientes registrados'),
    path('admin/concurrentes', adminViews.concurrentes, name='clientes concurrentes'),
    path('admin/empleado', adminViews.empleado, name='empleado'),
    path('admin/search', adminViews.consultas, name='consultas'),
    path('admin/producto', adminViews.productos, name='productos')
]
