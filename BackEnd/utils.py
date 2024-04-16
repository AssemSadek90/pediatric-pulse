import re
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated = "auto")

def is_complex_password(password):
    """
    Check if the password meets complexity requirements.
    """
    # Minimum length of 8 characters
    if len(password) < 8:
        return False

    # At least one uppercase letter
    if not any(char.isupper() for char in password):
        return False

    # At least one lowercase letter
    if not any(char.islower() for char in password):
        return False

    # At least one digit
    if not any(char.isdigit() for char in password):
        return False

    # At least one special character
    if not re.search(r"[!@#$%^&*(),.?\":{}|<>]", password):
        return False

    # All checks passed
    return True


def hash(password):
    return pwd_context.hash(password)

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)