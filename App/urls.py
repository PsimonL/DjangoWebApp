from django.urls import path
from . import views


# URLconf
urlpatterns = [
    path('home', views.get_homepage, name='homepage'),
    path('conv', views.get_converter, name='converter'),
    path('charts', views.get_charts, name='charts'),
]