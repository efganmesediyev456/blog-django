from django.db import models
from django.contrib.auth.models import User

class Category(models.Model):
    title = models.CharField(max_length=255)
    class Meta:
        ordering = ['-id']
    def __str__(self):
        return self.title


class Post(models.Model):
    title = models.CharField(max_length=255)
    subtitle = models.CharField(max_length = 255)
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    image = models.ImageField(upload_to='posts/', blank=True, null=True)
    date  = models.DateField()
    categories = models.ManyToManyField(Category, related_name='categories', blank=True) 
    author     = models.ForeignKey(User, on_delete=models.CASCADE, related_name="posts")
    class Meta:
        ordering = ['-id']

    def __str__(self):
        return self.title
