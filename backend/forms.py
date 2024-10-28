from django import forms
from .models import Post, Category, Slider, Menu
from django.contrib.auth.models import User


class LoginForm(forms.Form):
    username = forms.CharField(max_length=255, widget=forms.TextInput(attrs={'class': 'form-control form-control-user', 'placeholder': 'Username daxil edin'}))
    password = forms.CharField(widget=forms.PasswordInput(attrs={'class': 'form-control-user form-control', 'placeholder': 'Password daxil edin'}))


class BlogForm(forms.ModelForm):
    class Meta:
        model = Post
        fields = [
            'title_az','title_en', 'title_ru', 'title_tr',
              'description_az','description_en','description_ru','description_tr',
                'subtitle_az','subtitle_en','subtitle_ru','subtitle_tr',
                  'image', 'categories','author', 'date', 'slug']

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
        self.fields['image'].widget.attrs.update({'class': 'form-control'})
        
        new_fields = [field for field in self.fields if field != 'categories']

        for field_name in new_fields:
            self.fields[field_name].widget.attrs.update({'class': 'form-control'})  


class CategoryForm(forms.ModelForm):
    class Meta:
        model = Category
        fields = ['title_az', 'title_en', "title_ru","title_tr"] 
        
        
    def __init__(self, *args, **kwargs):
        super(CategoryForm, self).__init__(*args, **kwargs)
        for field_name in self.fields:
            self.fields[field_name].widget.attrs.update({'class': 'form-control'})



class SliderForm(forms.ModelForm):
    class Meta:
        model = Slider
        fields = ['title_az', 'title_en', "title_ru","title_tr","image","author","category"] 

    def __init__(self, *args, **kwargs):
        super(SliderForm, self).__init__(*args, **kwargs)
        for field_name in self.fields:
            self.fields[field_name].widget.attrs.update({'class': 'form-control'}) 



class MenuForm(forms.ModelForm):
    class Meta:
        model = Menu
        fields = ['title_az','title_en','title_ru','title_tr',"parent"]

    def __init__(self, *args, **kwargs):
        super(MenuForm, self).__init__(*args, **kwargs)
        for field_name in self.fields:
            self.fields[field_name].widget.attrs.update({'class': 'form-control'}) 
