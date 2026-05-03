# utils/encryption.py

from cryptography.fernet import Fernet
from django.conf import settings

fernet = Fernet(settings.FERNET_KEY)

def encrypt_user_id(user_id: int) -> str:
    return fernet.encrypt(str(user_id).encode()).decode()


def decrypt_user_id(token: str) -> int:
    return int(fernet.decrypt(token.encode()).decode())
