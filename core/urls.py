from django.urls import path,include
from django.conf.urls.static import static
from django.conf import settings
from . import views


urlpatterns = [
    path('', views.index, name = 'core.index'),
    path('blogs/<slug:slug>', views.post, name = 'core.post'),
    path('api/posts', views.PostListCreateApiViewer.as_view(), name='api.blog-list'),
    path('record/', views.record_and_show, name='record_and_show'),
]
