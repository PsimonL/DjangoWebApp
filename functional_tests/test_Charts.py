import time
from selenium import webdriver
# from budget.modules import Proj/
from django.contrib.staticfiles.testing import StaticLiveServerTestCase
from django.urls import reverse
from selenium.webdriver.common.by import By
class TestChartsHTML(StaticLiveServerTestCase):

    def setUp(self):
        self.driver = webdriver.Chrome('chromedriver.exe')

    # Check if title for charts.html is correct
    def test_charts_title(self):
        self.driver.get(self.live_server_url + '/charts')
        self.assertEquals(self.driver.title, "Currency Exchange Charts")

    def tearDown(self):
        self.driver.quit()