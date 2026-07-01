from rest_framework import serializers
from apps.authentication.models import (User, TechnicalInfo, 
                                        InstructorProfile, ImagePortfolio, EmployerProfile,
                                        )
from django.contrib.auth.models import Group


class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ["id", "name"]


class TechnicalInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = TechnicalInfo
        exclude = ["user", "created", "updated"]


class InstructorProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = InstructorProfile
        fields = "__all__"


class EmployerProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = EmployerProfile
        fields = "__all__"


class ImagePortfolioSerializer(serializers.ModelSerializer):
    class Meta:
        model = ImagePortfolio
        fields = "__all__"


class UserProfileSerializer(serializers.ModelSerializer):
    categories = serializers.SerializerMethodField()
    technical_info = serializers.SerializerMethodField()
    images_portfolio = serializers.SerializerMethodField()
    employer_profile = serializers.SerializerMethodField()
    instructor_profile = serializers.SerializerMethodField()

    groups = GroupSerializer(many=True, read_only=True)

    class Meta:
        model = User
        fields = ["id", "groups", "categories", "images_portfolio","technical_info", "employer_profile",
                  "instructor_profile", "phone_number", "first_name", "last_name", "national_code", 
                  "nationality", "birth_date", "gender", "status", "work_status", "step_reg", "date_joined"
                  ]

    def get_categories(self, obj):
        return [
            {
                "id": uc.category.id,
                "name": uc.category.name,
                "persion_name": uc.category.persion_name,
                "type": uc.category.type,
                "primary": uc.primary
            }
            for uc in obj.user_categories.all()
            ]


    def get_technical_info(self, obj):
        # بعد از select_related، این دسترسی بدون query اضافی است
        technical = getattr(obj, 'technical_info', None)
        if technical:
            return TechnicalInfoSerializer(technical).data
        return None

    def get_images_portfolio(self, obj):
        portfolio = getattr(obj, 'images_portfolio', None)
        return ImagePortfolioSerializer(portfolio).data if portfolio else None
        
    def get_employer_profile(self, obj):
        employer_profile = getattr(obj, 'employer_profile', None)
        return EmployerProfileSerializer(employer_profile).data if employer_profile else None

    def get_instructor_profile(self, obj):
        instructor_profile = getattr(obj, 'instructor_profile', None)
        return InstructorProfileSerializer(instructor_profile).data if instructor_profile else None
