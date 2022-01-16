from django.urls import path
from django.urls.resolvers import URLPattern
from .import views
from django.contrib.auth import views as auth_views

urlpatterns = [
    path("", views.index, name = 'index'),
    path('update_task/<slug:slug_text>', views.updateTask, name='update_task'),
    path('delete/<slug:slug_text>', views.deleteTask, name='delete'),
    path('register/', views.registerPage, name="register"),
	path('login/', views.loginPage, name="login"),  
	path('logout/', views.logoutUser, name="logout"),
    path('testab/', views.testAB, name = "testab"),
    path('notowania/', views.notowania, name = "notowania"),

    path ('reset_password/', auth_views.PasswordResetView.as_view(template_name="base/reset_password.html"), name="reset_password"),
    path("reset_password_sent/", auth_views.PasswordResetDoneView.as_view(), name='password_reset_done'),
    path("reset/<uidb64>/<token>/", auth_views.PasswordResetConfirmView.as_view(), name="password_reset_confirm"),
    path("reset_password_complete/", auth_views.PasswordResetCompleteView.as_view(), name="password_reset_complete"),
]