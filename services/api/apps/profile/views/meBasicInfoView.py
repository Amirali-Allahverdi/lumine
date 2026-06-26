from rest_framework.generics import RetrieveAPIView
from rest_framework.permissions import IsAuthenticated
from ..serializers import UserBasicInfoSerializer


class MeBasicInfoView(RetrieveAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = UserBasicInfoSerializer

    def get_object(self):
        return self.request.user