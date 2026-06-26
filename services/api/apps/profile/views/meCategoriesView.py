from rest_framework.generics import ListAPIView
from apps.authentication.models import User
from ..serializers import UserCategoriesSerializer
from rest_framework.permissions import IsAuthenticated

class MeCategoriesView(ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = UserCategoriesSerializer

    def get_queryset(self):
        return self.request.user.user_categories.all()