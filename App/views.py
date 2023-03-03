from django.shortcuts import render
from django.http import HttpResponse
from .models import History


# Create your views here.
# Templates handler; request -> response


def get_homepage(request):
    return render(request, './homepage.html')


def get_converter(request): # (request, id)
    # listall = History.objects.get(id=id)
    # items = listall.item_get(id=1)
    return render(request, './converter.html')


def get_charts(request):
    return render(request, './charts.html')
