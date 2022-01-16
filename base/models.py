from django.db import models
from django.db.models.signals import pre_save
from django.core.signals import request_started
from django.utils.text import slugify
import random
import string

from django.contrib.auth.models import User
import requests

import time, asyncio
from asgiref.sync import sync_to_async


# Create your models here.
class Profile(models.Model):
    name = models.CharField(max_length=200)
    

    def __str__ (self):
        return self.name


class Task(models.Model):
    title = models.CharField(max_length=200)
    price = models.FloatField(null=True, blank=True, default=0 )
    # user = models.OneToOneField(User, null=True, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True)
    slug = models.SlugField(max_length=200, null=True, blank=True)
    rodzajInw = models.CharField(max_length=200, default=False)
    complete = models.BooleanField(default=False)
    created = models.DateTimeField(auto_now_add=True)
    dataZakupu = models.CharField(max_length=20, blank=True, null=False )
    iloscZakupu = models.FloatField(default='1',blank=True)
    cenaZakupu = models.FloatField(default=1,blank=True)
    # profile = models.ForeignKey(Profile, null=True, on_delete= models.SET_NULL)
    

    def __str__ (self):
        return self.title

class StockPriceTest(models.Model):
    name = models.CharField(max_length=200)
    price = models.FloatField(default=0, null=True, blank=True)

    def __str__(self) -> str:
        return f'{self.name} {str(self.price)}'


class StockPrice(models.Model):
    name = models.CharField(max_length=200)
    price = models.FloatField(default=0, null=True, blank=True)

    def __str__(self) -> str:
        return f'{self.name} {self.price}'


class IndeksPrice(models.Model):
    name = models.CharField(max_length=200)
    price = models.CharField(max_length=200, null=True, blank=True)

    def __str__(self) -> str:
        return f'{self.name} {str(self.price)}'


class NewconnectPrice(models.Model):
    name = models.CharField(max_length=200)
    price = models.FloatField(default=0, null=True, blank=True)

    def __str__(self) -> str:
        return f'{self.name} {str(self.price)}'


class UsaStock(models.Model):
    name = models.CharField(max_length=200)
    price = models.CharField(max_length=200, null=True, blank=True)

    def __str__(self) -> str:
        return f'{self.name} {str(self.price)}'


class TestCopy(models.Model):
    name = models.CharField(max_length=200)
    price = models.CharField(max_length=200, null=True, blank=True)

    def __str__(self) -> str:
        return f'{self.name} {str(self.price)}'

from django.core.signals import request_finished
from django.dispatch import receiver

@receiver(request_finished)
def my_callback(sender, **kwargs):

    # start_time = time.time()
    # print('Start timer receiver')


    def get_tesla():
        try:
            tesla_r = requests.get('https://cloud.iexapis.com/stable/stock/tsla/quote?token=pk_b1da4aa5fd714d3db22ee5db45d173c8')
            tesla = str(tesla_r.json()["iexRealtimePrice"]).replace(".", ",")
            if tesla is not None:
                p, created = UsaStock.objects.update_or_create(
                name='tesla',
                defaults={'price': tesla},
                )
        except:
            print("fetch error tesla")
    # get_tesla()


    def get_amazon():
        try:
            amazon_r = requests.get('https://cloud.iexapis.com/stable/stock/amzn/quote?token=pk_b1da4aa5fd714d3db22ee5db45d173c8')
            amazon = str(amazon_r.json()["iexRealtimePrice"]).replace(".", ",")
            if amazon is not None:
                p, created = UsaStock.objects.update_or_create(
                name='amazon',
                defaults={'price': amazon},
                )
        except:
            print("fetch error amazon")
    # get_amazon()


    def get_netflix():
        try:
            netflix_r = requests.get('https://cloud.iexapis.com/stable/stock/nflx/quote?token=pk_b1da4aa5fd714d3db22ee5db45d173c8')
            netflix = str(netflix_r.json()["iexRealtimePrice"]).replace(".", ",")
            if netflix is not None:
                p, created = UsaStock.objects.update_or_create(
                name='netflix',
                defaults={'price': netflix},
                )
        except:
            print("fetch error netflix")
    # get_netflix()


    def get_sp500():
        try:
            sp500_r = requests.get('https://cloud.iexapis.com/stable/stock/spy/quote?token=pk_b1da4aa5fd714d3db22ee5db45d173c8')
            sp500 = str(sp500_r.json()["iexRealtimePrice"]).replace(".", ",")
            if sp500 is not None:
                p, created = UsaStock.objects.update_or_create(
                name='sp500',
                defaults={'price': sp500},
                )
        except:
            print("fetch error sp500")
    # get_sp500()


    # total_time = time.time() - start_time
    # print('Total time receiver', total_time)




def random_string_generator(size = 10, chars = string.ascii_lowercase + string.digits):
    return ''.join(random.choice(chars) for _ in range(size))


def create_slug(instance, new_slug = None):
    slug = slugify(instance.title.replace("ł", "l"))
    if new_slug is not None:
        slug = new_slug
    qs = Task.objects.filter(slug=slug).order_by("-id")
    exists = qs.exists()
    if exists:
        new_slug = "{slug}-{randstr}".format(slug=slug, randstr=random_string_generator(size=4))
        return create_slug(instance, new_slug=new_slug)
    return slug


def pre_save_task_receiver(sender, instance, *args, **kwargs):
    if not instance.slug:
        instance.slug = create_slug(instance)

    
pre_save.connect(pre_save_task_receiver, sender=Task)