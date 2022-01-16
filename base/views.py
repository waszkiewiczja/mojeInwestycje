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

				send_mail(
					'Witaj w inw',
					'Konto zostało założone.',
					settings.EMAIL_HOST_USER,
					[email],
					fail_silently=False,
				)

				username = request.POST.get('username')
				password = request.POST.get('password')
				user = authenticate(request, username=username, password=password)

				if user is not None:
					login(request,user)
					return redirect('index')

				return redirect ('login')
		context = {'form':form, "cdprojekt":cdprojekt,"wig20":wig20,}
		return render(request, 'base/register.html', context)


def loginPage(request):
	if request.user.is_authenticated:
		return redirect('index')
	else:
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
		context = {"cdprojekt":cdprojekt, "wig20":wig20,}
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

	# Jak łączyć Django z API:
	# try:
	# 	tesla_r = requests.get('https://cloud.iexapis.com/stable/stock/tsla/quote?token=pk_b1da4aa5fd714d3db22ee5db45d173c8')
	# 	tesla = str(tesla_r.json()["close"]).replace(".", ",")
	# except:
	# 	print("fetch error")

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


# def testAB(request):
# 	data = list(IndeksPrice.objects.values())
	
# 	test = [{"id": 1, "name": "WIG30", "price": "2\u00a0696,50"}, {"id": 2, "name": "WIG20", "price": "2\u00a0194,37"}, ]
# 	print(test)
# 	for stock in test:
# 		p, created = TestCopy.objects.update_or_create(
# 			name=stock['name'],
# 			defaults={'price': stock['price']},
# 		)
# 		print("p: ", p)
# 		print("created", created)

# 	return JsonResponse(data, safe=False)


asyncio.set_event_loop_policy(asyncio.WindowsSelectorEventLoopPolicy())

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
			url = f'https://cloud.iexapis.com/stable/stock/{akcja}/quote?token=pk_b1da4aa5fd714d3db22ee5db45d173c8'
			actions.append(asyncio.ensure_future(get_akcje(session, url)))

		action_res = await asyncio.gather(*actions)
		for action in action_res:
			if action["iexRealtimePrice"] is None:
				akcje_cena.append(str(action["iexClose"]).replace(".", ","))
				add_action = await sync_to_async(UsaStock.objects.update_or_create, thread_sensitive=True)(name=action['companyName'], price = str(action["iexClose"]).replace(".", ","))
			else:
				akcje_cena.append(str(action["iexRealtimePrice"]).replace(".", ","))
				add_action = await sync_to_async(UsaStock.objects.update_or_create, thread_sensitive=True)(name=action['companyName'], price = str(action["iexRealtimePrice"]).replace(".", ","))

	return render(request, 'base/testab.html', {"akcje_cena":akcje_cena} )


def notowania(request):

	start_time = time.time()
	print('Start timer')

	# Akcje
	def pobierz_akcje():
		headers = [{'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36'}, 
			{'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_0) AppleWebKit/535.11 (KHTML, like Gecko) Chrome/17.0.963.56 Safari/535.11'}, 
			{'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36 Edg/90.0.818.51'}, ]
		los = randint(0, 2)

		url = 'https://www.bankier.pl/gielda/notowania/akcje_kod/'

		r = requests.get(url, headers=headers[los])
		soup = bs(r.text, 'html.parser')
		all_stocks = []

		money_table = soup.find('table', class_ = 'sortTable floatingHeaderTable')
		for money in money_table.find_all('tbody'):
			rows = money.find_all('tr')
			for row in rows:
				try:
					company = row.find('td', class_ = 'colWalor').text.strip()
					price = row.find('td', class_ = 'colKurs').text.strip()
					stock = {
						'name':company,
						'price':float(price[0:-2].replace(",",".")),
					}
					all_stocks.append(stock)

				except:
					pass

		for stock in all_stocks:
			p, created = StockPrice.objects.update_or_create(
				name=stock['name'],
				defaults={'price': stock['price']},
			)
	pobierz_akcje()


	# Indeksy
	def pobierz_indeksy():
		headers = [{'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36'}, 
			{'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_0) AppleWebKit/535.11 (KHTML, like Gecko) Chrome/17.0.963.56 Safari/535.11'}, 
			{'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36 Edg/90.0.818.51'}, ]
		los = randint(0, 2)	

		url = 'https://www.bankier.pl/gielda/notowania/indeksy-gpw'

		r = requests.get(url, headers=headers[los])
		soup = bs(r.text, 'html.parser')
		all_indeksy = []

		indeksy_table = soup.find('table', class_ = 'sortTable floatingHeaderTable')
		for indeks in indeksy_table.find_all('tbody'):
			rows = indeks.find_all('tr')
			for row in rows:
				try:
					company = row.find('td', class_ = 'colWalor').text.strip()
					price = row.find('td', class_ = 'colKurs').text
					indeks = {
						'name':company,
						'price':price,
					}
					all_indeksy.append(indeks)

				except:
					pass

		for indeks in all_indeksy:
			p, created = IndeksPrice.objects.update_or_create(
				name=indeks['name'],
				defaults={'price': indeks['price']},
			)
	pobierz_indeksy()


	# New Connect 
	def pobierz_new_connect():
		headers = [{'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36'}, 
			{'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_0) AppleWebKit/535.11 (KHTML, like Gecko) Chrome/17.0.963.56 Safari/535.11'}, 
			{'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36 Edg/90.0.818.51'}, ]
		los = randint(0, 2)	

		url = 'https://www.bankier.pl/gielda/notowania/new-connect'

		r = requests.get(url, headers=headers[los])
		soup = bs(r.text, 'html.parser')
		all_newconnects = []

		newconnects_table = soup.find('table', class_ = 'sortTable floatingHeaderTable')
		for indeks in newconnects_table.find_all('tbody'):
			rows = indeks.find_all('tr')
			for row in rows:
				try:
					company = row.find('td', class_ = 'colWalor').text.strip()
					price = row.find('td', class_ = 'colKurs').text.strip()
					indeks = {
						'name':company,
						'price':float(price[0:-2].replace(",",".")),
					}
					all_newconnects.append(indeks)

				except:
					pass

		for indeks in all_newconnects:
			p, created = NewconnectPrice.objects.update_or_create(
				name=indeks['name'],
				defaults={'price': indeks['price']},
			)
	pobierz_new_connect()

	context = {}

	total_time = time.time() - start_time
	print('Total time', total_time)

	return render(request, 'base/notowania.html', context)