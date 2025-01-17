# from passlib.context import CryptContext
# from fastapi import HTTPException, status
# from src.utils.jwt_util import create_jwt, decode_jwt
# from src.validations.auth_validation.user_login_validation import UserLoginValidation
# from src.validations.auth_validation.user_register_validation import (
#     UserRegisterValidation,
# )
# from src.models.user_model import UserModel
# from src.services.user_service import UserService
#
#
# class AuthService:
#     pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
#
#     def __init__(self):
#         self.user_service = UserService()
#
#     # Mã hóa mật khẩu
#     def hash_password(self, password: str) -> str:
#         return self.pwd_context.hash(password)
#
#     # Kiểm tra mật khẩu
#     def verify_password(self, plain_password: str, hashed_password: str) -> bool:
#         return self.pwd_context.verify(plain_password, hashed_password)
#
#     async def login_user(self, data: UserLoginValidation):
#         """
#         Đăng nhập người dùng và tạo JWT
#         """
#         user = await self.user_service.get_user_by_username(data.username)
#
#         # Kiểm tra xem người dùng có tồn tại và mật khẩu có đúng không
#         if not user or not self.verify_password(data.password, user["hashed_password"]):
#             raise HTTPException(
#                 status_code=status.HTTP_401_UNAUTHORIZED,
#                 detail="Sai tên tài khoản hoặc mật khẩu",
#             )
#
#         # Tạo và trả về token
#         token = create_jwt(
#             {
#                 "sub": user["username"],
#                 "user_id": user["user_id"],
#                 "email": user["email"],
#             }
#         )
#         return {"access_token": token, "token_type": "bearer"}
#
#     async def register_user(self, data: UserRegisterValidation):
#         """
#         Đăng ký người dùng mới
#         """
#         # Kiểm tra người dùng đã tồn tại hay chưa
#         test = await self.user_service.get_user_by_username(data.username)
#         if test:
#             raise HTTPException(
#                 status_code=status.HTTP_400_BAD_REQUEST, detail="Tài khoản đã tồn tại"
#             )
#
#         if await self.user_service.get_user_by_email(data.email):
#             raise HTTPException(
#                 status_code=status.HTTP_400_BAD_REQUEST, detail="Email đã tồn tại"
#             )
#
#         # Mã hóa mật khẩu
#         hashed_password = self.hash_password(data.password)
#
#         # Tạo đối tượng người dùng và lưu vào cơ sở dữ liệu
#         user = UserModel(
#             username=data.username,
#             email=data.email,
#             hashed_password=hashed_password,
#             fullname=data.fullname,
#             date_of_birth=data.date_of_birth,
#             sex=data.sex,
#             phone_number=data.phone_number,
#             address=data.address,
#         )
#
#         result = await self.user_service.create_user(user)
#
#         if result.get("status") == "success":
#             return {"message": "Đăng ký thành công"}
#         else:
#             raise HTTPException(
#                 status_code=status.HTTP_400_BAD_REQUEST,
#                 detail=result.get("message", "Có lỗi xảy ra khi đăng ký"),
#             )
#
#     def verify_token(self, token: str) -> dict:
#         """
#         Xác minh JWT
#         """
#         try:
#             payload = decode_jwt(token)
#             return payload
#         except ValueError as e:
#             raise HTTPException(
#                 status_code=status.HTTP_401_UNAUTHORIZED,
#                 detail=f"Token không hợp lệ: {str(e)}",
#             )
#         except Exception as e:
#             raise HTTPException(
#                 status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,

