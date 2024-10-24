from django.shortcuts import render, redirect
from .forms import LoginForm, BlogForm, CategoryForm, SliderForm
from django.contrib.auth import authenticate, login as auth_login, logout as auth_logout
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from .models import Post, Category, Slider
from django.core.paginator import Paginator
from django.http import HttpResponse


# LOGIN
def login(request):
    if request.method == 'POST':
        form = LoginForm(request.POST)
        if form.is_valid():
            username = form.cleaned_data['username']
            password = form.cleaned_data['password']
            user = authenticate(request, username= username, password = password)
            if user is not None:
                auth_login(request, user)
                return redirect('admin.dashboard')
            else:
                form.add_error(None, 'Sifre ve ya username sehvdir')
    else:
        form = LoginForm()
    context = {'form':form}
    return render(request, 'backend/login.html', context)

# DASHBOARD
@login_required
def dahsboard(request):
    return render(request, 'backend/dashboard.html')


# LOGOUT
def logout(request):
    auth_logout(request)
    return redirect('admin.login')


from django.core.paginator import Paginator
from django.http import JsonResponse
from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from .models import Post

#BLOGS
from django.core.paginator import Paginator
from django.http import JsonResponse
from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from .models import Post

@login_required
def blogs(request):
    if request.method == 'POST':
        search = request.POST.get('search[value]', '')  # POST metodu ile arama al
        posts = Post.objects.filter(title__icontains=search)  # Arama koşuluna göre filtrele
        paginator = Paginator(posts, 10)  # Sayfa başına 10 kayıt
        page_number = request.POST.get('start', 0)  # DataTables'den 'start' parametresini al
        posts_page = paginator.get_page(page_number)  # İlgili sayfayı al
        data = {
            'draw': int(request.POST.get('draw', 0)),  # 'draw' parametresi
            'recordsTotal': posts.count(),  # Toplam kayıt sayısı
            'recordsFiltered': posts.count(),  # Filtrelenmiş kayıt sayısı
            'data': list(posts_page.object_list.values('title', 'description', 'image', 'id'))  # Sayfalanmış verileri al
        }
        return JsonResponse(data)

    return render(request, 'backend/pages/blogs/index.html')



@login_required
def blogs_create(request):
    if request.method == 'POST':
        form = BlogForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            return redirect('admin.blogs')
    else:
        form = BlogForm()
    context = {'form':form}
    return render(request, 'backend/pages/blogs/save.html', context)


@login_required
def sliders_create(request):
    if request.method == 'POST':
        form = SliderForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            return redirect('admin.sliders')
    else:
        form = SliderForm()
    context = {'form':form}
    return render(request, 'backend/pages/sliders/save.html', context)


@login_required
def blogs_edit(request, id):
    post = Post.objects.get(id=id)
    if request.method == 'POST':
        form = BlogForm(request.POST, request.FILES, instance = post)
        if form.is_valid():
            form.save()
            return redirect('admin.blogs.edit', form.instance.id)
    else:
        form = BlogForm(instance=post)
    context = {'form':form}
    return render(request, 'backend/pages/blogs/edit.html',context)


@login_required
def sliders_edit(request, id):
    slider = Slider.objects.get(id=id)
    if request.method == 'POST':
        form = SliderForm(request.POST, request.FILES, instance = slider)
        if form.is_valid():
            form.save()
            return redirect('admin.sliders.edit', form.instance.id)
    else:
        form = SliderForm(instance=slider)
    context = {'form':form}
    return render(request, 'backend/pages/sliders/edit.html',context)


@login_required
def blogs_delete(request, id):
    post = Post.objects.get(id=id)
    post.delete()    
    return redirect('admin.blogs')  

@login_required
def sliders_delete(request, id):
    slider = Slider.objects.get(id=id)
    slider.delete()    
    return redirect('admin.sliders')  

@login_required
def categories(request):
    if request.method == 'POST':
        search = request.POST.get('search[value]', '')  # POST metodu ile arama al
        posts = Category.objects.filter(title__icontains=search)  # Arama koşuluna göre filtrele
        paginator = Paginator(posts, 10)  # Sayfa başına 10 kayıt
        page_number = request.POST.get('start', 0)  # DataTables'den 'start' parametresini al
        posts_page = paginator.get_page(page_number)  # İlgili sayfayı al
        data = {
            'draw': int(request.POST.get('draw', 0)),  # 'draw' parametresi
            'recordsTotal': posts.count(),  # Toplam kayıt sayısı
            'recordsFiltered': posts.count(),  # Filtrelenmiş kayıt sayısı
            'data': list(posts_page.object_list.values('title', 'id'))  # Sayfalanmış verileri al
        }
        return JsonResponse(data)
    return render(request, 'backend/pages/categories/index.html')



@login_required
def categories_create(request):
    if request.method == 'POST':
        form = CategoryForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            return redirect('admin.categories')
    else:
        form = CategoryForm()
    context = {'form':form}
    return render(request, 'backend/pages/categories/save.html', context)


@login_required
def categories_edit(request, id):
    category = Category.objects.get(id=id)
    if request.method == 'POST':
        form = CategoryForm(request.POST, instance = category)
        if form.is_valid():
            form.save()
            return redirect('admin.categories.edit', form.instance.id)
    else:
        form = CategoryForm(instance=category)
    context = {'form':form}
    return render(request, 'backend/pages/categories/edit.html',context)


@login_required
def categories_delete(request, id):
    category = Category.objects.get(id=id)
    category.delete()    
    return redirect('admin.categories')  



@login_required
def sliders(request):
    if request.method == 'POST':
        search = request.POST.get('search[value]', '')  # POST metodu ile arama al
        sliders = Slider.objects.filter(title__icontains=search)  # Arama koşuluna göre filtrele
        paginator = Paginator(sliders, 10)  # Sayfa başına 10 kayıt
        page_number = request.POST.get('start', 0)  # DataTables'den 'start' parametresini al
        posts_page = paginator.get_page(page_number)  # İlgili sayfayı al
        data = {
            'draw': int(request.POST.get('draw', 0)),  # 'draw' parametresi
            'recordsTotal': sliders.count(),  # Toplam kayıt sayısı
            'recordsFiltered': sliders.count(),  # Filtrelenmiş kayıt sayısı
            'data': list(posts_page.object_list.values('title', 'id'))  # Sayfalanmış verileri al
        }
        return JsonResponse(data)
    return render(request, 'backend/pages/sliders/index.html')