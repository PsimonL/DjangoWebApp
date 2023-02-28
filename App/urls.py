from django.urls import path
from . import views

# URLconf
urlpatterns = [
    path('', views.get_homepage, name='homepage'),  # home
    path('conv', views.get_converter, name='converter'),  # conv
    path('charts', views.get_charts, name='charts'),  # charts
]
