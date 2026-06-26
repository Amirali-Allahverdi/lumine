from rest_framework import serializers
from apps.authentication.models import UserCategory, Category


class CategoriesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ["name", "persion_name", "type"]


class UserCategoriesSerializer(serializers.ModelSerializer):
    category = CategoriesSerializer(read_only=True) 
    class Meta:
        model = UserCategory
        fields = ["id", "primary", "category", ]