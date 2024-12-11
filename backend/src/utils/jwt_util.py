import jwt
import datetime
import os
from dotenv import load_dotenv

load_dotenv()
SECRET_KEY = os.getenv("SECRET_KEY")


def create_jwt(payload: dict) -> str:
    """
    Tạo JWT từ payload (Là dữ liệu REQUEST dạng DICT)
    """
    payload["exp"] = datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(
        minutes=15
    )  # TOKEN chỉ có giới hạn là 15p , sau 15p sẽ hết hạn
    token = jwt.encode(payload, SECRET_KEY, algorithm="HS256")
    return token


def decode_jwt(token: str) -> dict:
    """
    Giải mã token và trả về payload
    """
    try:
        decode_payload = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        return decode_payload

    except jwt.ExpiredSignatureError:
        raise ValueError("Token hết hạn")

    except jwt.InvalidTokenError:
        raise ValueError("Token không hợp lệ")
