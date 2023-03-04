import time
import random

from selenium import webdriver
# from budget.modules import Proj/
from django.contrib.staticfiles.testing import StaticLiveServerTestCase
from django.urls import reverse
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
        # Selection 'US'
        select_element.send_keys(pick)
        # Wait for flag to update
        wait = WebDriverWait(self.driver, 10)
        flag1_element = wait.until(expected_conditions.presence_of_element_located((By.ID, 'flag1')))
        # Check updated image
        self.assertEqual(flag1_element.get_attribute('src'), f'https://www.countryflagicons.com/FLAT/64/{pick}.png')

    def tearDown(self):
        self.driver.quit()
