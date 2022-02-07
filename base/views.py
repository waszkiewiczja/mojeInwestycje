import requests
from django.contrib.auth.models import AnonymousUser
from django.http.response import HttpResponse
from django.shortcuts import render
from .models import *
from .forms import *
from django.shortcuts import redirect
from django.forms import inlineformset_factory
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.forms import UserCreationForm
from .forms import CreateUserForm
from django.contrib import messages
from django.contrib.auth.decorators import login_required


from bs4 import BeautifulSoup as bs
from random import randint

from django.core.mail import send_mail
from django.conf import settings

from django.http import JsonResponse
import json

import time, asyncio
from asgiref.sync import sync_to_async
import aiohttp


# Create your views here.


def registerPage(request):
	if request.user.is_authenticated:
		return redirect('index')
	else:
		tesla = UsaStock.objects.get(name='tesla')
		amazon = UsaStock.objects.get(name='amazon')
		netflix = UsaStock.objects.get(name='netflix')
		sp500 = UsaStock.objects.get(name='sp500')
		get_cdprojekt = StockPrice.objects.get(name="CDPROJEKT")
		cdprojekt = str(get_cdprojekt.price).replace(".", ",")
		get_wig20 = IndeksPrice.objects.get(name="WIG20")
		wig20 = get_wig20.price

		form = CreateUserForm()
		if request.method=="POST":
			form=CreateUserForm(request.POST)
			if form.is_valid():
				form.save()
				user = form.cleaned_data.get('username')
				email = form.cleaned_data.get('email')
				messages.success(request, 'Stworzono' + user)

				# send_mail(
				# 	'Witaj w moje-finanse.pl, ',
				# 	'Twoje konto zostało założone.',
				# 	'www.moje-finanse.pl',
				# 	settings.EMAIL_HOST_USER,
				# 	[email],
				# 	fail_silently=False,
				# )

				username = request.POST.get('username')
				password = request.POST.get('password1')
				user = authenticate(request, username=username, password=password)

				if user is not None:
					login(request,user)
					return redirect('index')

				return redirect ('login')
		context = {'form':form, "cdprojekt":cdprojekt, "wig20":wig20, "tesla":tesla, "amazon":amazon, "netflix":netflix, "sp500":sp500}
		return render(request, 'base/register.html', context)


def loginPage(request):
	if request.user.is_authenticated:
		return redirect('index')
	else:
		tesla = UsaStock.objects.get(name='tesla')
		amazon = UsaStock.objects.get(name='amazon')
		netflix = UsaStock.objects.get(name='netflix')
		sp500 = UsaStock.objects.get(name='sp500')
		get_cdprojekt = StockPrice.objects.get(name="CDPROJEKT")
		cdprojekt = str(get_cdprojekt.price).replace(".", ",")
		get_wig20 = IndeksPrice.objects.get(name="WIG20")
		wig20=get_wig20.price
		if request.method=='POST':
			username = request.POST.get('username')
			password = request.POST.get('password')
			
			user = authenticate(request, username=username, password=password)

			if user is not None:
				login(request,user)
				return redirect('index')
			else:
				messages.info(request, 'Haslo bledne')
		context = {"cdprojekt":cdprojekt, "wig20":wig20, "tesla":tesla, "amazon":amazon, "netflix":netflix, "sp500":sp500}
		return render(request, 'base/login.html', context)


def logoutUser(request):
	logout(request)
	return redirect('login')


def index(request):
	form = TaskForm()

	if not (request.user.is_authenticated):
		tasks = None
		context = {}
		request.session["name"] = "Anonimo"
		print(request.session.get("name", "Unknown"))
		anonimo = "Anonimo"

	else:
		anonimo = None

		tasks = Task.objects.filter(user=request.user)

		# Akcje
		stock_database_objects = StockPrice.objects.all()
		stock_database = []
		for stock in stock_database_objects:
			stock_database.append([stock.name, stock.price])
		
		# Indeksy
		indeks_database_objects = IndeksPrice.objects.all()
		indeks_database = []
		for indeks in indeks_database_objects:
			indeks_database.append([indeks.name, indeks.price])

		# New connect
		newconnect_database_objects = NewconnectPrice.objects.all()
		newconnect_database = []
		for new in newconnect_database_objects:
			newconnect_database.append([new.name, new.price])

		for task in tasks:
			for i in range(len(stock_database)):
				if task.title==stock_database[i][0]:
					task.price=str(stock_database[i][1]).replace(".", ",")
			for i in range(len(indeks_database)):
				if task.title==indeks_database[i][0]:
					task.price=str(indeks_database[i][1])
			for i in range(len(newconnect_database)):
				if task.title==newconnect_database[i][0]:
					task.price=str(newconnect_database[i][1]).replace(".", ",")

		
		if request.method == "POST":
			form = TaskForm(request.POST)
			if form.is_valid():
				instance = form.save(commit=False)
				instance.user = request.user
				instance.title = instance.title.upper()
				instance.save()
				return redirect('/')

	get_cdprojekt = StockPrice.objects.get(name="CDPROJEKT")
	cdprojekt = str(get_cdprojekt.price).replace(".", ",")
	get_wig20 = IndeksPrice.objects.get(name="WIG20")
	wig20 = get_wig20.price

	tesla = UsaStock.objects.get(name='tesla')
	amazon = UsaStock.objects.get(name='amazon')
	netflix = UsaStock.objects.get(name='netflix')
	sp500 = UsaStock.objects.get(name='sp500')

	context = {'tasks':tasks, 'form':form, 'anonimo':anonimo, 
		"cdprojekt":cdprojekt, "wig20":wig20, "tesla":tesla, "amazon":amazon, "netflix":netflix, "sp500":sp500}

	return render(request, 'base/index.html', context)


@login_required(login_url='login')
def updateTask(request, slug_text):
	get_cdprojekt = StockPrice.objects.get(name="CDPROJEKT")
	cdprojekt = str(get_cdprojekt.price).replace(".", ",")
	get_wig20 = IndeksPrice.objects.get(name="WIG20")
	wig20 = get_wig20.price

	task = Task.objects.get(slug = slug_text)
	form = TestForm(instance=task)

	if request.method =='POST':
		form = TestForm(request.POST, instance=task)
		if form.is_valid():
			form.save()
			return redirect('/')
	
	context = {'task':task, 'form':form, "cdprojekt":cdprojekt, "wig20":wig20,}
	return render (request, 'base/update_task.html', context)


@login_required(login_url='login')
def deleteTask(request, slug_text):
	get_cdprojekt = StockPrice.objects.get(name="CDPROJEKT")
	cdprojekt = str(get_cdprojekt.price).replace(".", ",")
	get_wig20 = IndeksPrice.objects.get(name="WIG20")
	wig20 = get_wig20.price

	item = Task.objects.get(slug=slug_text)
	if request.method =="POST":
		item.delete()
		return redirect('/')
	
	context = {'item':item, "cdprojekt":cdprojekt, "wig20":wig20,}
	return render(request, 'base/delete.html', context)


async def get_akcje(session, url):
	async with session.get(url) as res:
		data = await res.json()
		return data


async def testAB(request):
	actions = []
	akcje = ['tesla', 'amazon', 'netflix', 'sp500']
	akcje_kod = ['tsla', 'amzn', 'nflx', 'spy']
	akcje_cena = []
	
	async with aiohttp.ClientSession() as session:

		for akcja in akcje_kod:
			url = f'https://cloud.iexapis.com/stable/stock/{akcja}/quote?token='
			actions.append(asyncio.ensure_future(get_akcje(session, url)))

		action_res = await asyncio.gather(*actions)
		for index, action in enumerate(action_res):
			if action["iexRealtimePrice"] is None:
				akcje_cena.append(str(action["iexClose"]).replace(".", ","))
				add_action = await sync_to_async(UsaStock.objects.update_or_create, thread_sensitive=True)(name=akcje[index], price = str(action["iexClose"]).replace(".", ","))
			else:
				akcje_cena.append(str(action["iexRealtimePrice"]).replace(".", ","))
				add_action = await sync_to_async(UsaStock.objects.update_or_create, thread_sensitive=True)(name=akcje[index], price = str(action["iexRealtimePrice"]).replace(".", ","))

	return render(request, 'base/testab.html', {"akcje_cena":akcje_cena} )

