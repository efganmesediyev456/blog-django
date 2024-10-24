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

    