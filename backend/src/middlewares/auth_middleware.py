from starlette.middleware.base import BaseHTTPMiddleware
from fastapi.exceptions import HTTPException
from starlette.requests import Request


class AuthMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        # Bỏ qua kiểm tra token cho các endpoint đặc biệt
        if request.url.path in [
            "/",
            "/docs",
            "/redoc",
            "/openapi.json",
            "/user/register",
        ]:
            return await call_next(request)

        # Kiểm tra token từ header Authorization
        auth_header = request.headers.get("Authorization")
        if not auth_header or not auth_header.startswith("Bearer "):
            raise HTTPException(status_code=401, detail="Không có token")

        token = auth_header.split(" ")[1]

        # Thực hiện xác thực token (tuỳ chỉnh theo yêu cầu của bạn)
        if not self.validate_token(token):
            raise HTTPException(status_code=401, detail="Token không hợp lệ")

        return await call_next(request)

    def validate_token(self, token: str) -> bool:
        # Logic xác thực token (tuỳ chỉnh)
        return token == "your-valid-token"
