from django.shortcuts import render

def homeAdmin(request):
    return render(request, 'admin.html')
def facturas(request):
    return render(request, 'orders.html')
def registrados(request):
    return render(request, 'registered.html')
def concurrentes(request):
    return render(request, 'concurrent.html')
def empleado(request):
    return render(request, 'empleado.html')
def consultas(request):
    return render(request, 'query.html')
def productos(request):
    return render (request, 'products.html')