from django.urls import path
from .views import *

urlpatterns = [
    path('me/', UserProfileView.as_view()),
    path('me/images', MeImagesPortfolioView.as_view()),
    path('me/categories', MeCategoriesView.as_view()),
    path('me/roles', MeRolesView.as_view()),
    path('me/technical-info', MeThecnicalInfoView.as_view()),
    path('me/employer-profile', MeEmployerProfileView.as_view()),
    path('me/instructor-profile', MeInstructorProfileView.as_view()),
    path('me/basic-info', MeBasicInfoView.as_view()),
]