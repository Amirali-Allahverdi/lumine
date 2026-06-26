from rest_framework.generics import RetrieveAPIView
from rest_framework.permissions import IsAuthenticated
from ..serializers import EmployerProfileSerializer


class MeEmployerProfileView(RetrieveAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = EmployerProfileSerializer

    def get_object(self):
        return self.request.user.employer_profile