from django.shortcuts import render
from django.views import View

# Create your views here.

def home(requst):
    return render(requst,"home.html")
