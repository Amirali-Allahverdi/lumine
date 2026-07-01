from rest_framework import serializers
from apps.authentication.models import User


class UserBasicInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('phone_number', 'first_name', 'last_name', 'national_code', 'nationality', 'gender',
                  'birth_date', 'status', 'work_status', 'step_reg')