from django.db import models
from django.contrib.auth.models import User
from django.utils.text import slugify


class Category(models.Model):
    title = models.CharField(max_length=255)

    class Meta:
        ordering = ['-id']

    def __str__(self):
        return self.title

class Post(models.Model):
    title=models.CharField(max_length=255)
    subtitle=models.CharField(max_length=255)
    description=models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    image = models.ImageField(upload_to='posts/', blank=True, null=True)
    date = models.DateField()
    categories = models.ManyToManyField(Category, related_name='posts', blank=True) 
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="posts")
    slug = models.SlugField(unique=True, blank=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title_az)
        super().save(*args, **kwargs)

    class Meta:
        ordering = ['-id']

    def __str__(self):
        return self.title



class Slider(models.Model):
    title=models.CharField(max_length=255)
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    date   = models.DateTimeField(auto_now_add=True)
    image  = models.ImageField(upload_to='sliders/')
    category = models.ForeignKey(Category, on_delete=models.CASCADE, null=True)

    

class Menu(models.Model):
    parent = models.ForeignKey('self', related_name='children', on_delete=models.CASCADE, blank=True, null=True)
    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)  # title_az yerine title kullandık.
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title  # Daha okunabilir gösterim için
    


class FormApply(models.Model):
    comment = models.TextField(blank=True, null=True)
    fullname = models.CharField(max_length=255)
    email = models.EmailField()
    web = models.CharField(max_length=200)
    post = models.ForeignKey(Post, related_name='comment', on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at= models.DateTimeField(auto_now=True)
