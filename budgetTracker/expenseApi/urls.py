from django.urls import path
from . import views
urlpatterns = [
    path("", views.cats, name="cats"),
    path('user_login', views.user_login, name='user_login'),
    path('user_register', views.user_register, name='user_register')
]