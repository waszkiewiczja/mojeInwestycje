from django.urls import path
from . import views

urlpatterns = [
    path("", views.getRoutes),
    path("indeksy/", views.getIndeksy),
    path("indeksy/<str:pk>/", views.getIndeks),
    path("akcje/", views.getAkcje),
    path("newconnect/", views.getNewconnect),
]
