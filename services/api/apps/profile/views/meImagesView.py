from rest_framework.generics import RetrieveAPIView
from apps.authentication.models import User
from ..serializers import ImagePortfolioSerializer
from rest_framework.permissions import IsAuthenticated

class MeImagesPortfolioView(RetrieveAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ImagePortfolioSerializer

    def get_object(self):
        return self.request.user.images_portfolio