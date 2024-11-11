from django.shortcuts import render
from django.http import HttpResponse
from backend.models import Post, Slider, FormApply
from .forms import CommentForm
from django.contrib import messages
from .serializers import PostSerializer
from rest_framework.generics import ListCreateAPIView
from .utils import record_audio, convert_audio_to_text

# Create your views here.




def record_and_show(request):
    text = None
    if request.method == 'POST':
        # Ses kaydını al
        audio_data = record_audio(duration=5)  # 5 saniye kaydediyor

        # Ses kaydını metne dönüştür
        text = convert_audio_to_text(audio_data)
        
    return render(request, 'core/record_and_show.html', {'text': text})


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
    comments = FormApply.objects.filter(post=post)
    
    if request.method == 'POST':
        form = CommentForm(request.POST)
        if form.is_valid():
            comment = form.save(commit=False)  # Formu kaydetmeden önce
            comment.post = post  # İlgili postu atıyoruz
            comment.save()  # Şimdi kaydediyoruz
            messages.success(request, 'Successfully Message is sent')
    else:
        form = CommentForm()  

    context = {'post': post, 'form': form, 'comments':comments}
    return render(request, 'core/posts/single.html', context)






class PostListCreateApiViewer(ListCreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
