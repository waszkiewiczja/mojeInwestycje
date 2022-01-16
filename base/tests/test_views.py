from django.test import TestCase

from django.test import Client
from django.urls import reverse
from base.models import *

# Create your tests here.
class uTestViews(TestCase):
    # def test_homepage(self):
    #     client = Client()
    #     response = client.get(reverse('index'))
    #     self.assertEquals(response.status_code, 200)
    #     self.assertTemplateUsed(response, 'base/index.html')

    def test_page_save_api_to_database(self):
        client = Client()
        response = client.get(reverse('testab'))
        self.assertEquals(response.status_code, 200)

    def test_template_page_save_api_to_database(self):
        client = Client()
        response = client.get(reverse('testab'))
        self.assertTemplateUsed(response, 'base/testab.html')
        


