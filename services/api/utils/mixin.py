from utils.encryption import decrypt_user_id
from apps.authentication.models import User

class TokenUserMixin:

    @property
    def token_user(self):
        if not hasattr(self, "_token_user"):
            token = self.request.headers.get("token")
            user_id = decrypt_user_id(token)
            self._token_user = User.objects.get(id=user_id)

        return self._token_user
     