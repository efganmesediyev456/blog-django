from django.urls import path,include
from django.conf.urls.static import static
from django.conf import settings
from . import views

urlpatterns = [
    path('', views.index, name = 'core.index'),
    path('blogs/<slug:slug>', views.post, name = 'core.post'),
]
