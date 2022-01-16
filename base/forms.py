from django import forms
from django.db.models import fields
from django.forms import ModelForm
from .models import *

from django.forms import ModelForm
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User




class TaskForm(forms.ModelForm):
    class Meta:
        model = Task
        fields = '__all__'


class TestForm(forms.ModelForm):
    class Meta:
        model = Task
        fields = ['dataZakupu','iloscZakupu', "cenaZakupu"]


class CreateUserForm(UserCreationForm):
	class Meta:
		model = User
		fields = ['username', 'email', 'password1', 'password2']