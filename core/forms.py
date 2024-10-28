from django import forms
from backend.models import FormApply


class CommentForm(forms.ModelForm):
    comment = forms.CharField(
        required=True, 
        widget=forms.Textarea(attrs={'placeholder': "Comment"})
    )
    fullname = forms.CharField(
        required=True, 
        widget=forms.TextInput(attrs={'placeholder': "Fullname"})  # Doğru widget nesnesini kullanıyoruz
    )

    email = forms.EmailField(
        required=True,  # E-posta alanının zorunlu olduğunu belirtir
        widget=forms.EmailInput(attrs={'placeholder': "Email"})  # E-posta girişi için özel widget
    )
  

    class Meta:
        model = FormApply
        fields = ['comment', 'fullname', 'email', 'web']

        

