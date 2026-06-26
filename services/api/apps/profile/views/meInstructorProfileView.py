from rest_framework.generics import RetrieveAPIView
from rest_framework.permissions import IsAuthenticated
from ..serializers import InstructorProfileSerializer


class MeInstructorProfileView(RetrieveAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = InstructorProfileSerializer

    def get_object(self):
        return self.request.user.instructor_profile