from .models import Category, Post, Slider, Menu
from modeltranslation.translator import TranslationOptions, register

@register(Category)
class CategoryTranslationOptions(TranslationOptions):
    fields = ('title',)


@register(Post)
class PostTranslationOptions(TranslationOptions):
    fields = ('title','subtitle', 'description',)


@register(Slider)
class SliderTranslationOptions(TranslationOptions):
    fields = ('title',)


@register(Menu)
class MenuTranslationOptions(TranslationOptions):
    fields = ('title',)