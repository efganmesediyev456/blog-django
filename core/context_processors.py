from backend.models import Category, Menu
from django.db.models import Count

def global_variables(request):
    categories = Category.objects.annotate(posts_count = Count("posts"))
    menus = Menu.objects.filter(parent = None)
    return {
        'categories':categories,
        'menus':menus
    }