from rest_framework.generics import RetrieveAPIView
from ..serializers import *
from rest_framework.permissions import IsAuthenticated
from apps.authentication.models import User
from django.db import connection


class UserProfileView(RetrieveAPIView):
    serializer_class = UserProfileSerializer
    permission_classes = [IsAuthenticated]

    # def get_object(self):
    #     return User.objects.select_related(
    #         'technical_info',          # ← مهم برای OneToOne
    #         'images_portfolio',        # ← مهم برای OneToOne
    #         'employer_profile',
    #         'instructor_profile'
    #     ).prefetch_related(
    #         'user_categories__category'   # این یکی همچنان prefetch_related
    #     ).get(pk=self.request.user.pk)
    

    def get_object(self):
        obj = User.objects.select_related(
                'technical_info',        
                'images_portfolio',
                'employer_profile',
                'instructor_profile'
            ).get(pk=self.request.user.pk)

        # بعد از گرفتن آبجکت
        print("Total queries before serialization:", len(connection.queries))
        
        # سریالایزر رو صدا بزن
        serializer = self.get_serializer(obj)
        data = serializer.data
        
        print("Total queries after serialization:", len(connection.queries))
        return obj