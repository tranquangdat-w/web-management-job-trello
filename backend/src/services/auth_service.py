from passlib.context import CryptContext
from fastapi import HTTPException
from backend.src.utils.jwt_util import create_jwt, decode_jwt
from backend.src.validations.auth_validation.user_login_validation import (
    UserLoginValidation,
)
from backend.src.validations.auth_validation.user_register_validation import (
    UserRegisterValidation,
)
from backend.src.models.user_model import UserModel
from backend.src.services.user_service import UserService


class AuthService:
    pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

    def __init__(self):
        self.user_service = UserService()

    # Mã hóa mật khẩu
    def hash_password(self, password: str) -> str:
        return self.pwd_context.hash(password)

    # Kiểm tra mật khẩu
    def verify_password(self, plain_password: str, hashed_password: str) -> bool:
        return self.pwd_context.verify(plain_password, hashed_password)

    async def login_user(self, data: UserLoginValidation):
        """
        Đăng nhập người dùng và tạo JWT
        """
        # Truy vấn người dùng từ MongoDB
        user = await self.user_service.get_user_by_username(data.username)

        if not user:
            raise HTTPException(
                status_code=401, detail="Sai tên tài khoản hoặc mật khẩu"
            )

        if not self.verify_password(data.password, user["hashed_password"]):
            raise HTTPException(
                status_code=401, detail="Sai tên tài khoản hoặc mật khẩu"
            )

        # Tạo token
        token = create_jwt({"sub": data.username})
        return {"access_token": token, "token_type": "bearer"}

    async def register_user(self, data: UserRegisterValidation):
        """
        Đăng ký người dùng
        """
        # Kiểm tra người dùng đã tồn tại trong MongoDB
        existing_user = await self.user_service.get_user_by_username(data.username)
        if existing_user:
            raise HTTPException(status_code=400, detail="Tài khoản đã tồn tại")

        existing_email = await self.user_service.get_user_by_email(data.email)
        if existing_email:
            raise HTTPException(status_code=400, detail="Email đã tồn tại")

        # Mã hóa mật khẩu
        hashed_password = self.hash_password(data.password)

        # Lưu người dùng vào MongoDB
        user = UserModel(
            username=data.username, email=data.email, password=hashed_password
        )
        result = await self.user_service.create_user(user)

        if result["status"] == "success":
            return {"message": "Đăng ký thành công"}
        else:
            raise HTTPException(status_code=400, detail=result["message"])

    def verify_token(self, token: str) -> dict:
        """
        Xác minh JWT
        """
        try:
            payload = decode_jwt(token)
            return payload
        except ValueError as e:
            raise HTTPException(status_code=401, detail=f"Token không hợp lệ: {str(e)}")
        except Exception as e:
            raise HTTPException(
                status_code=500, detail=f"Lỗi khi xác minh token: {str(e)}"
            )
