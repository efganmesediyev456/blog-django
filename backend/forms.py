from django import forms
from .models import Post, Category
from django.contrib.auth.models import User


class LoginForm(forms.Form):
    username = forms.CharField(max_length=255, widget=forms.TextInput(attrs={'class': 'form-control form-control-user', 'placeholder': 'Username daxil edin'}))
    password = forms.CharField(widget=forms.PasswordInput(attrs={'class': 'form-control-user form-control', 'placeholder': 'Password daxil edin'}))


class BlogForm(forms.ModelForm):
    class Meta:
        model = Post
        fields = ['title', 'description', 'subtitle', 'image', 'categories','author', 'date']

    categories = forms.ModelMultipleChoiceField(
        queryset=Category.objects.all(),
        widget=forms.CheckboxSelectMultiple,
        required=True,
        label="Categories"
    )

    

    author = forms.ModelChoiceField(
        queryset = User.objects.all(),
        widget = forms.Select(attrs={'class':'form-control'}),
        required = True,
        label ='Author'
    )

    date = forms.DateField(
        widget=forms.DateInput(attrs={'class': 'form-control', 'type': 'date'}),
        required=True,  # İsterseniz bunu 'False' olarak ayarlayabilirsiniz
        label='Date'
    )

    def __init__(self, *args, **kwargs):
        super(BlogForm, self).__init__(*args, **kwargs)
        self.fields['title'].widget.attrs.update({'class': 'form-control'})
        self.fields['subtitle'].widget.attrs.update({'class': 'form-control'})
        self.fields['description'].widget.attrs.update({'class': 'form-control'})
        self.fields['image'].widget.attrs.update({'class': 'form-control'})


class CategoryForm(forms.ModelForm):
    class Meta:
        model = Category
        fields = ['title']

   

    def __init__(self, *args, **kwargs):
        super(CategoryForm, self).__init__(*args, **kwargs)
        self.fields['title'].widget.attrs.update({'class': 'form-control'})
