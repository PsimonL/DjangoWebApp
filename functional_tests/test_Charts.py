import time
from selenium import webdriver
# from budget.modules import Proj/
from django.contrib.staticfiles.testing import StaticLiveServerTestCase
from django.urls import reverse
from selenium.webdriver.common.by import By
from selenium.webdriver.common.alert import Alert
from selenium.webdriver.support import expected_conditions
from selenium.webdriver.support.wait import WebDriverWait


class TestChartsHTML(StaticLiveServerTestCase):

    def setUp(self):
        self.driver = webdriver.Chrome('chromedriver.exe')

    # Check if title for charts.html is correct
    def test_charts_title(self):
        self.driver.get(self.live_server_url + '/charts')
        self.assertEquals(self.driver.title, "Currency Exchange Charts")

    def test_button_click_go_home(self):
        self.driver.get(self.live_server_url + '/charts')
        button = self.driver.find_element(By.ID, 'go-home')
        button.click()
        new_url = self.driver.current_url
        self.assertEqual(new_url, f'{self.live_server_url}/')

    def test_alert(self):
        self.driver.get(self.live_server_url + '/charts')
        alert_button = self.driver.find_element(By.XPATH, "//button[@id='go-charts']")
        alert_button.click()
        # Wait for the alert to appear
        wait = WebDriverWait(self.driver, 5)
        wait.until(expected_conditions.alert_is_present())
        # Switch to the alert and get its text
        alert = Alert(self.driver)
        alert_text = alert.text
        # Accept the alert
        alert.accept()
        self.assertEqual(alert_text, "That's your current location!!!")

    # Not finished, tests for plotting, apis operations
    def test_a(self):
        self.driver.get(self.live_server_url + '/charts')
        with open('App/static/js/charts.js', 'r') as f:
            js_file = f.read()


    def tearDown(self):
        self.driver.quit()
