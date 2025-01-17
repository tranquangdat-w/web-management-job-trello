import smtplib
from email.mime.text import MIMEText
from datetime import datetime, timedelta, timezone
import uuid
from passlib.context import CryptContext
from fastapi import HTTPException, status
from src.models.user_model import UserModel
from src.config.environment import env
from src.utils.jwt_util import create_token, verify_token

USER_COLLECTION = "user_test"  # Đổi tên collection thành 'user_test'


class UserService:
    def __init__(self):
        self.pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

    async def create_user(self, user_data) -> dict:
        exist_user = await UserModel.find_one_by_email(user_data['email'])

        if exist_user:
            raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail=f"Email already exists")

        name_from_email = user_data['email'].split('@')[0]
        new_user = UserModel(
            email = user_data['email'],
            password = self.pwd_context.hash(user_data['password']),
            username = user_data['username'],
            displayName = name_from_email,
            verifyToken = str(uuid.uuid4())
        )


        is_send = self.send_verification_email(new_user["email"], new_user)

        if is_send:
            result = await UserModel.create_user(new_user)

            result = await UserModel.find_one_by_id(result.inserted_id)

            del result['password']

            return result
        raise Exception()


    async def verify_user(self, user_data):
        try:
            exist_user = await UserModel.find_one_by_email(user_data['email'])

            if not exist_user:
                raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Email Not found")

            if (exist_user['isActive']):
                raise HTTPException(status_code=status.HTTP_406_NOT_ACCEPTABLE, detail=f"Email was active")

            if (exist_user['verifyToken'] != user_data['token']):
                raise HTTPException(status_code=status.HTTP_406_NOT_ACCEPTABLE, detail=f"Token is in valid")

            update_data = {
                "verifyToken": None,
                "isActive": True
            }

            updated_user = await UserModel.update_user(exist_user['_id'], update_data)

            del updated_user['password']

            return updated_user
        except Exception as e:
            raise e

    async def login_user(self, user_data):
        try:
            exist_user = await UserModel.find_one_by_email(user_data['email'])

            if not exist_user:
                raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Email Not found")

            if (not exist_user['isActive']):
                raise HTTPException(status_code=status.HTTP_406_NOT_ACCEPTABLE, detail=f"Email was not active")

            if (not self.pwd_context.verify(user_data['password'], exist_user['password'])):
                raise HTTPException(status_code=status.HTTP_406_NOT_ACCEPTABLE, detail=f"password not correct")
            
            #Tao token tra ve cho frontend
            #Tao thong tin dinh kem JWT gom _id va email
            user_info = {
                "_id" : exist_user['_id'],
                "email" : exist_user['email']
            }
            user_info['exp'] = datetime.now(timezone.utc) + timedelta(days=env['ACCESS_TOKEN_TIME_LIFE']) 

            access_token = create_token(user_info, env['ACCESS_TOKEN_SECRET_KEY'])

            user_info['exp'] = datetime.now(timezone.utc) + timedelta(days=env['ACCESS_TOKEN_TIME_LIFE']) 
            refesh_token = create_token(user_info, env['REFESH_TOKEN_SECRET_KEY'])

            del exist_user['password']

            exist_user["accessToken"]= access_token
            exist_user["refeshToken"] = refesh_token

            return exist_user
        except Exception as e:
            raise e

    async def refesh_access_token(self, token: str):
        play_load = verify_token(token, env['REFESH_TOKEN_SECRET_KEY'])
        if not play_load:
            raise Exception

        play_load['exp'] = datetime.now(timezone.utc) + timedelta(days=env['ACCESS_TOKEN_TIME_LIFE'])
        new_access_token = create_token(play_load, env['ACCESS_TOKEN_SECRET_KEY'])

        return new_access_token

    def send_verification_email(self, email: str, user_data: dict) -> bool:
        """Gửi email xác thực với mã xác nhận."""
        msg = MIMEText(f"Mã xác thực của bạn là: {env['WEBSITE_DOMAIN_DEV']}/account/verification?email={user_data["email"]}&token={user_data['verifyToken']}")
        msg["Subject"] = "Xác thực tài khoản"
        msg["From"] = env["EMAIL_SENDER"]
        msg["To"] = email

        try:
            with smtplib.SMTP_SSL("smtp.gmail.com",465) as server:
                server.login(env["EMAIL_SENDER"], env["EMAIL_PASSWORD"])
                server.sendmail(env["EMAIL_SENDER"], email, msg.as_string())

            return True
        except Exception as e:
            print(f"Error sending email: {str(e)}")
    # def generate_otp_secret(self, user_id: str) -> str:
    #     """Tạo mã OTP cho người dùng"""
    #     totp = pyotp.TOTP(user_id)
    #     return totp.now()  # Tạo mã OTP
    #
    # def verify_otp(self, user_id: str, otp: str) -> bool:
    #     """Xác minh mã OTP"""
    #     totp = pyotp.TOTP(user_id)
    #     return totp.verify(otp)
    #
    # async def get_user_by_username(self, username: str) -> dict:
    #     """Lấy thông tin người dùng theo tên đăng nhập"""
    #     try:
    #         collection = self.mongo_config.get_database_instance()[self.collection_name]
    #         user = await collection.find_one({"username": username})
    #         if user:
    #             return {"status": "success", "user": user}
    #         else:
    #             return {"status": "fail", "message": "Người dùng không tồn tại."}
    #     except Exception as e:
    #         return {
    #             "status": "error",
    #             "message": f"Lỗi khi lấy thông tin người dùng: {str(e)}",
    #         }
    #
    # async def get_user_by_email(self, email: str) -> dict:
    #     """Lấy thông tin người dùng theo email"""
    #     try:
    #         collection = self.mongo_config.get_database_instance()[self.collection_name]
    #         user = await collection.find_one({"email": email})
    #         if user:
    #             return {"status": "success", "user": user}
    #         else:
    #             return {"status": "fail", "message": "Email không tồn tại."}
    #     except Exception as e:
    #         return {
    #             "status": "error",
    #             "message": f"Lỗi khi lấy thông tin người dùng: {str(e)}",
    #         }
    #
    #
    # async def reset_password(self, email: str) -> dict:
    #     """Khôi phục mật khẩu thông qua email."""
    #     try:
    #         collection = self.mongo_config.database_instance()[self.collection_name]
    #         user = await collection.find_one({"email": email})
    #         if user:
    #             reset_code = randint(100000, 999999)
    #             # Gửi mã khôi phục mật khẩu qua email
    #             email_sent = self.send_verification_email(email, reset_code)
    #             if email_sent:
    #                 await collection.update_one(
    #                     {"email": email},
    #                     {"$set": {"reset_code": reset_code}},
    #                 )
    #                 return {
    #                     "status": "success",
    #                     "message": "Mã khôi phục mật khẩu đã được gửi.",
    #                 }
    #             else:
    #                 return {
    #                     "status": "fail",
    #                     "message": "Không thể gửi email khôi phục.",
    #                 }
    #         else:
    #             return {"status": "fail", "message": "Email không tồn tại."}
    #     except Exception as e:
    #         return {
    #             "status": "error",
    #             "message": f"Lỗi khi khôi phục mật khẩu: {str(e)}",
    #         }
    #
    # async def assign_role(self, user_id: str, role: str) -> dict:
    #     """Gán vai trò cho người dùng"""
    #     try:
    #         collection = self.mongo_config.database_instance()[self.collection_name]
    #         result = await collection.update_one(
    #             {"_id": ObjectId(user_id)},
    #             {"$set": {"role": role}},
    #         )
    #         if result.matched_count:
    #             return {
    #                 "status": "success",
    #                 "message": f"Vai trò {role} đã được gán cho người dùng.",
    #             }
    #         else:
    #             return {"status": "fail", "message": "Người dùng không tồn tại."}
    #     except Exception as e:
    #         return {"status": "error", "message": f"Lỗi khi gán vai trò: {str(e)}"}
    #
    # async def get_user_by_id(self, user_id: str) -> dict:
    #     """Lấy thông tin người dùng theo ID"""
    #     try:
    #         collection = self.mongo_config.database_instance()[self.collection_name]
    #         user = await collection.find_one({"_id": ObjectId(user_id)})
    #         if user:
    #             return {"status": "success", "user": user}
    #         else:
    #             return {"status": "fail", "message": "Người dùng không tồn tại."}
    #     except Exception as e:
    #         return {
    #             "status": "error",
    #             "message": f"Lỗi khi lấy thông tin người dùng: {str(e)}",
    #         }
    #
    # async def update_user(self, user_id: str, updated_data: dict) -> dict:
    #     """Cập nhật thông tin người dùng"""
    #     try:
    #         collection = self.mongo_config.database_instance()[self.collection_name]
    #         result = await collection.update_one(
    #             {"_id": ObjectId(user_id)},
    #             {"$set": updated_data},
    #         )
    #         if result.matched_count:
    #             return {
    #                 "status": "success",
    #                 "message": "Thông tin người dùng đã được cập nhật.",
    #             }
    #         else:
    #             return {"status": "fail", "message": "Người dùng không tồn tại."}
    #     except Exception as e:
    #         return {
    #             "status": "error",
    #             "message": f"Lỗi khi cập nhật thông tin người dùng: {str(e)}",
    #         }
    #
    # async def delete_user(self, user_id: str) -> dict:
    #     """Xóa người dùng"""
    #     try:
    #         collection = self.mongo_config.database_instance()[self.collection_name]
    #         result = await collection.delete_one({"_id": ObjectId(user_id)})
    #         if result.deleted_count:
    #             return {"status": "success", "message": "Người dùng đã được xóa."}
    #         else:
    #             return {"status": "fail", "message": "Người dùng không tồn tại."}
    #     except Exception as e:
    #         return {"status": "error", "message": f"Lỗi khi xóa người dùng: {str(e)}"}
