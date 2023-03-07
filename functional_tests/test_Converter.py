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
        # Selection - insert into element
        select_element.send_keys(pick)
        # Wait for flag to update
        wait = WebDriverWait(self.driver, 10)
        flag1_element = wait.until(expected_conditions.presence_of_element_located((By.ID, 'flag1')))
        # Check updated image
        self.assertEqual(flag1_element.get_attribute('src'), f'https://www.countryflagicons.com/FLAT/64/{pick}.png')


    def test_conversion_getRates(self):
        self.driver.get(self.live_server_url + '/conv')
        with open('App/static/js/converter.js', 'r') as f:
            js_file = f.read()
        flagList = ['US', 'EU', 'GB', 'CH', 'PL']
        pick = random.choice(flagList)
        resultFunc = self.driver.execute_script(js_file + '; return getRates(arguments[0]);', pick)
        print("resultFunc = " + str(resultFunc))
        response = requests.get(f'http://api.nbp.pl/api/exchangerates/rates/a/{pick}/')
        data = response.json()
        rates = data['rates']
        mid = rates[0]['mid']
        print("apiFunc = " + str(mid))
        self.assertEqual(resultFunc, mid, "Comparison Done")

    def test_insert_field(self):
        self.driver.get(self.live_server_url + '/conv')
        insertion = self.driver.find_element(By.ID, 'enter')
        insertion.clear()
        num = random.randint(20, 200)
        insertion.send_keys(num)
        input_value = insertion.get_attribute('value')
        print("input_value = " + input_value)
        self.assertEqual(int(input_value), num)

    # Expected: 'Your conversion will appear here.'
    # Actual: '100 eur => 469.00000000000006 pln'
    def test_conversion_button(self):
        self.driver.get(self.live_server_url + '/conv')
        WebDriverWait(self.driver, 10).until(
            expected_conditions.presence_of_element_located((By.TAG_NAME, "body"))
        )

        self.driver.execute_script("document.dispatchEvent(new Event('DOMContentLoaded'));")

        output = self.driver.find_element(By.ID, 'conversion')
        print("output = " + output.text)

        self.driver.refresh()

        button = self.driver.find_element(By.CLASS_NAME, 'exchange-button')
        button.click()

        # WebDriverWait(self.driver, 5).until(
        #     expected_conditions.text_to_be_present_in_element_value(output, "100 eur => 469.00000000000006 pln")
        # )

        self.assertEqual(self.driver.find_element(By.ID, "conversion").text, "100 eur => 469.00000000000006 pln")


        # self.driver.get(self.live_server_url + '/conv')
        # insertion = self.driver.find_element(By.ID, 'enter')
        # input_value = insertion.get_attribute('value')
        # self.driver.refresh()
        # button = self.driver.find_element(By.CLASS_NAME, 'exchange-button')
        # button.click()
        # self.driver.refresh()
        # output = self.driver.find_element(By.ID, 'conversion')
        # output_value = output.get_attribute('value')
        # print("output_value = " + str(type(output_value)))
        # self.assertEqual(f"{input_value} eur => 469.00000000000006 pln", output_value)

    def tearDown(self):
        self.driver.quit()
