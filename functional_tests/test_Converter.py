import time
import random
import requests
import pytest
from selenium import webdriver
# from budget.modules import Proj/
from django.contrib.staticfiles.testing import StaticLiveServerTestCase
from django.urls import reverse
from selenium.common import TimeoutException
from selenium.webdriver.common.by import By
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions


class TestConverterHTML(StaticLiveServerTestCase):
    def setUp(self):
        self.driver = webdriver.Chrome('chromedriver.exe')

    # Check if title for converter.html is correct
    def test_converter_title(self):
        self.driver.get(self.live_server_url + '/conv')
        self.assertEquals(self.driver.title, "Currency Converter")

    # Check random flag in controlFlag function
    def test_controlFlag_US_flag(self):
        self.driver.get(self.live_server_url + '/conv')
        select_element = self.driver.find_element(By.ID, 'selector1')
        flagList = ['US', 'EU', 'GB', 'CH', 'PL']
        pick = random.choice(flagList)
        print(f"Picked country = {pick}")
        # Selection
        select_element.send_keys(pick)
        # Wait for flag to update
        wait = WebDriverWait(self.driver, 10)
        flag1_element = wait.until(expected_conditions.presence_of_element_located((By.ID, 'flag1')))
        # Check updated image
        self.assertEqual(flag1_element.get_attribute('src'), f'https://www.countryflagicons.com/FLAT/64/{pick}.png')

    # def test_conversion_button(self):
    #     self.driver.get(self.live_server_url + '/conv')
    #     button = self.driver.find_element(By.ID, 'exchange-button')
    #     button.click()

    # Crushes after print("2")
    def test_conversion_getRates(self):
        with open('App/static/js/converter.js', 'r') as f:
            js_file = f.read()
        curr = 'chf'
        resultFunc = self.driver.execute_script(js_file + f'; return getRates({curr});')
        print("resultFunc = " + str(resultFunc))

        response = requests.get(f'http://api.nbp.pl/api/exchangerates/rates/a/{curr}/')
        data = response.json()
        rates = data['rates']
        mid = rates[0]['mid']
        print("apiFunc = " + str(mid))
        self.assertEqual(resultFunc, str(mid), "Comparison Done")

    # def test_getRates(self):

    def tearDown(self):
        self.driver.quit()
