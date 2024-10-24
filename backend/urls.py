from django.urls import path
from django.conf.urls.static import static
from django.conf import settings
from . import views

urlpatterns = [
    path('login/', views.login, name="admin.login"),
    path('logout/', views.logout, name="admin.logout"),
    path('dashboard/', views.dahsboard, name="admin.dashboard"),
    path('blogs/', views.blogs, name="admin.blogs"),
    path('blogs/create', views.blogs_create, name="admin.blogs.create"),
    path('blogs/edit/<int:id>/', views.blogs_edit, name="admin.blogs.edit"),
    path('blogs/delete/<int:id>/', views.blogs_delete, name="admin.blogs.delete"),

    # categories
    path('categories/', views.categories, name="admin.categories"),
    path('categories/create', views.categories_create, name="admin.categories.create"),
    path('categories/edit/<int:id>', views.categories_edit, name="admin.categories.edit"),
    path('categories/delete/<int:id>', views.categories_delete, name="admin.categories.delete"),

    #sliders
    path('sliders/', views.sliders, name="admin.sliders"),
    path('sliders/create', views.sliders_create, name="admin.sliders.create"),
    path('sliders/edit/<int:id>', views.sliders_edit, name="admin.sliders.edit"),
    path('sliders/delete/<int:id>', views.sliders_delete, name="admin.sliders.delete"),

]