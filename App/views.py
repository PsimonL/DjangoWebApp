from django.shortcuts import render
from django.http import HttpResponse


# Create your views here.
# Templates handler; request -> response


def get_homepage(request):
    return render(request, './homepage.html')


def get_converter(request):
    return render(request, './converter.html')


def get_charts(request):
    return render(request, './charts.html')
