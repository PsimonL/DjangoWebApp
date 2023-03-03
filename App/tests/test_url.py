from django.test import TestCase
from django.test import SimpleTestCase
from django.urls import reverse, resolve
from App.views import get_homepage, get_converter, get_charts


# Naming conventions in Django!
# python manage.py test App
class TestUrls(SimpleTestCase):
    def test_setup(self):
        assert 1 == 1

    def test_homepage_url_is_reversed(self):
        url = reverse('homepage')
        print(resolve(url))
        self.assertEquals(resolve(url).func, get_homepage)

    def test_converter_url_is_reversed(self):
        url = reverse('converter')
        print(resolve(url))
        self.assertEquals(resolve(url).func, get_converter)

    def test_charts_url_is_reversed(self):
        url = reverse('charts')
        print(resolve(url))
        self.assertEquals(resolve(url).func, get_charts)
