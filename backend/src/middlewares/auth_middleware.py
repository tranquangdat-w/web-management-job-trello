from fastapi import Request, HTTPException
from starlette.middleware.base import BaseHTTPMiddleware
from dotenv import load_dotenv
import os

from src.utils.jwt_util import decode_jwt

load_dotenv()
SECRET_KEY = os.getenv("SECRET_KEY")


class AuthMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        token = request.headers.get("Authorization")
        if not token:
            raise HTTPException(status_code=401, detail="Không có token")

        if token.startswith("Bearer "):
            token = token[7:]

        try:
            payload = decode_jwt(token)
            request.state.user = payload
        except Exception as e:
            raise HTTPException(status_code=401, detail=f"Token không hợp lệ: {str(e)}")

        response = await call_next(request)
        return response
