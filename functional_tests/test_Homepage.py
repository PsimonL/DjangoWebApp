import time
from selenium import webdriver
# from budget.modules import Proj/
from django.contrib.staticfiles.testing import StaticLiveServerTestCase
from django.urls import reverse
from selenium.webdriver.common.by import By


class TestHomepageHTML(StaticLiveServerTestCase):

    def setUp(self):
        self.driver = webdriver.Chrome('chromedriver.exe')

    # Check if title for homepage.html is correct
    def test_homepage_title(self):  # python manage.py test functional_tests
        self.driver.get(self.live_server_url)
        self.assertEqual(self.driver.title, "Homepage for Currency Converter")

    # Check if "main" div exists in homepage.html
    def test_homepage_main_div(self):
        # time.sleep(1)
        self.driver.get(self.live_server_url)
        try:
            div = self.driver.find_element(By.CLASS_NAME, 'main')
            print(f"TEST PASSED: Found main div => {str(div)}")
        except:
            print("Could not find main div")
        finally:
            print("Test done")

    # Check if "main" div contains proper h1 text
    def test_homepage_main_div_h1(self):
        # time.sleep(1)
        self.driver.get(self.live_server_url)
        div = self.driver.find_element(By.CLASS_NAME, 'main')
        header1 = div.find_element(By.TAG_NAME, 'h1')
        self.assertEquals(header1.text, 'Welcome to Currency Converter!')

    # Check if anchor element in footer contains proper URL
    def test_homepage_footer_anchor_URL(self):
        self.driver.get(self.live_server_url)
        footer = self.driver.find_element(By.TAG_NAME, 'footer')
        p = footer.find_element(By.TAG_NAME, 'p')
        a = p.find_element(By.TAG_NAME, 'a')
        expected_url = "https://github.com/PsimonL"
        self.assertEquals(a.get_attribute('href'), expected_url)

    # Check if 'go-conv' button directs user to 'converter.html'
    def test_button_click_go_conv(self):
        self.driver.get(self.live_server_url)
        button = self.driver.find_element(By.ID, 'go-conv')
        button.click()
        new_url = self.driver.current_url
        self.assertEqual(new_url, f'{self.live_server_url}/conv')




    def tearDown(self):
        self.driver.quit()