from django.shortcuts import render
from django.http import HttpResponse
from backend.models import Post

# Create your views here.


def chunked_posts(posts, chunk_size):
    for i in range(0, len(posts), chunk_size):
        yield posts[i:i+chunk_size]

def index(request):
    posts = Post.objects.all()
    posts = list(chunked_posts(posts, 3))
    context = {'posts':posts}
    return render(request, 'core/index.html', context)
