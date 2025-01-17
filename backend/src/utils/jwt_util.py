import jwt

def create_token(payload, secret_key):
    try:
        return  jwt.encode(payload, secret_key, algorithm="HS256")
    except Exception as e:
        raise e

def verify_token(token, secret_key) -> dict:
    try:
        payload = jwt.decode(token, secret_key, algorithms=["HS256"])
        return payload

    except jwt.ExpiredSignatureError:
        raise ValueError("Token hết hạn")

    except jwt.InvalidTokenError:
        raise ValueError("Token không hợp lệ")

