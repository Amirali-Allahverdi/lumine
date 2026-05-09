# utils/encryption.py

from cryptography.fernet import Fernet, InvalidToken
from django.conf import settings

fernet = Fernet(settings.FERNET_KEY)

def encrypt_user_id(user_id: int) -> str:
    return fernet.encrypt(str(user_id).encode()).decode()


def decrypt_user_id(token: str, ttl_seconds: int = 3000) -> int:
    """
    token را decrypt می‌کند و اگر تاریخ انقضا گذشته باشد InvalidToken raise می‌شود.
    ttl_seconds = 900 یعنی 15 دقیقه
    """
    try:
        decrypted = fernet.decrypt(token.encode(), ttl=ttl_seconds)
        return int(decrypted.decode())
    except InvalidToken:
        # می‌توانی همینجا None برگردانی یا Exception جدید raise کنی
        raise InvalidToken("Token is expired or invalid")
