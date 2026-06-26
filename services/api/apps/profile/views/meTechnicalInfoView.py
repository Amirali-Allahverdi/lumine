from rest_framework.generics import RetrieveAPIView
from rest_framework.permissions import IsAuthenticated
from ..serializers import TechnicalInfoSerializer


class MeThecnicalInfoView(RetrieveAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = TechnicalInfoSerializer

    def get_object(self):
        return self.request.user.technical_info