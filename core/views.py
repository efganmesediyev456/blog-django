from django.shortcuts import render
from django.http import HttpResponse
from backend.models import Post, Slider

# Create your views here.


def chunked_posts(posts, chunk_size):
    for i in range(0, len(posts), chunk_size):
        yield posts[i:i+chunk_size]

def index(request):
    posts = Post.objects.all()
    posts = list(chunked_posts(posts, 3))
    sliders = Slider.objects.all()
    context = {'posts':posts, 'sliders':sliders}
    return render(request, 'core/index.html', context)

def post(request, slug):
    post = Post.objects.get(slug=slug)
    context = {'post':post}
    return render(request, 'core/posts/single.html', context)


