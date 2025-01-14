import os
import smtplib
from email.mime.text import MIMEText
from random import randint
from datetime import datetime, timezone
from cryptography.hazmat.primitives import hashes
from passlib.context import CryptContext
from bson import ObjectId
import pyotp
from src.models.user_model import UserModel
from src.config.mongodb import mongodb_connector

USER_COLLECTION = "user_test"  # Đổi tên collection thành 'user_test'


class UserService:
    def __init__(self):
        self.mongo_config = mongodb_connector
        self.collection_name = USER_COLLECTION
        self.pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

    def send_verification_email(self, email: str, verification_code: int) -> bool:
        """Gửi email xác thực với mã xác nhận."""
        msg = MIMEText(f"Mã xác thực của bạn là: {verification_code}")
        msg["Subject"] = "Xác thực tài khoản"
        msg["From"] = os.getenv("EMAIL_SENDER")
        msg["To"] = email

        try:
            with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
                server.login(os.getenv("EMAIL_SENDER"), os.getenv("EMAIL_PASSWORD"))
                server.sendmail(os.getenv("EMAIL_SENDER"), email, msg.as_string())
            return True
        except Exception as e:
            print(f"Error sending email: {str(e)}")
            return False

    def generate_otp_secret(self, user_id: str) -> str:
        """Tạo mã OTP cho người dùng"""
        totp = pyotp.TOTP(user_id)
        return totp.now()  # Tạo mã OTP

    def verify_otp(self, user_id: str, otp: str) -> bool:
        """Xác minh mã OTP"""
        totp = pyotp.TOTP(user_id)
        return totp.verify(otp)

    async def get_user_by_username(self, username: str) -> dict:
        """Lấy thông tin người dùng theo tên đăng nhập"""
        try:
            collection = self.mongo_config.get_database_instance()[self.collection_name]
            user = await collection.find_one({"username": username})
            if user:
                return {"status": "success", "user": user}
            else:
                return {"status": "fail", "message": "Người dùng không tồn tại."}
        except Exception as e:
            return {
                "status": "error",
                "message": f"Lỗi khi lấy thông tin người dùng: {str(e)}",
            }

    async def get_user_by_email(self, email: str) -> dict:
        """Lấy thông tin người dùng theo email"""
        try:
            collection = self.mongo_config.get_database_instance()[self.collection_name]
            user = await collection.find_one({"email": email})
            if user:
                return {"status": "success", "user": user}
            else:
                return {"status": "fail", "message": "Email không tồn tại."}
        except Exception as e:
            return {
                "status": "error",
                "message": f"Lỗi khi lấy thông tin người dùng: {str(e)}",
            }

    async def create_user(self, user: UserModel) -> dict:
        """Tạo người dùng và gửi mã xác thực qua email."""
        try:
            # Kiểm tra tài khoản và email đã tồn tại chưa
            existing_user = await self.get_user_by_username(user.username)
            if existing_user["status"] == "success":
                return {"status": "fail", "message": "Tài khoản đã tồn tại"}

            existing_email = await self.get_user_by_email(user.email)
            if existing_email["status"] == "success":
                return {"status": "fail", "message": "Email đã được sử dụng"}

            # Mã xác thực gửi qua email
            verification_code = randint(100000, 999999)
            email_sent = self.send_verification_email(user.email, verification_code)
            if email_sent:
                # Tiến hành lưu người dùng vào CSDL
                hashed_password = self.pwd_context.hash(user.password)
                user_data = user.user_dict()
                user_data["password"] = hashed_password
                user_data["verification_code"] = verification_code  # Lưu mã xác thực
                user_data["created_at"] = datetime.now(timezone.utc)

                collection = self.mongo_config.database_instance()[self.collection_name]
                result = await collection.insert_one(user_data)

                return {
                    "status": "success",
                    "message": "Người dùng đã được tạo. Vui lòng kiểm tra email để xác thực.",
                    "user_id": str(result.inserted_id),
                }
            else:
                return {"status": "fail", "message": "Không thể gửi email xác thực."}
        except Exception as e:
            return {"status": "error", "message": f"Lỗi khi tạo người dùng: {str(e)}"}

    async def reset_password(self, email: str) -> dict:
        """Khôi phục mật khẩu thông qua email."""
        try:
            collection = self.mongo_config.database_instance()[self.collection_name]
            user = await collection.find_one({"email": email})
            if user:
                reset_code = randint(100000, 999999)
                # Gửi mã khôi phục mật khẩu qua email
                email_sent = self.send_verification_email(email, reset_code)
                if email_sent:
                    await collection.update_one(
                        {"email": email},
                        {"$set": {"reset_code": reset_code}},
                    )
                    return {
                        "status": "success",
                        "message": "Mã khôi phục mật khẩu đã được gửi.",
                    }
                else:
                    return {
                        "status": "fail",
                        "message": "Không thể gửi email khôi phục.",
                    }
            else:
                return {"status": "fail", "message": "Email không tồn tại."}
        except Exception as e:
            return {
                "status": "error",
                "message": f"Lỗi khi khôi phục mật khẩu: {str(e)}",
            }

    async def assign_role(self, user_id: str, role: str) -> dict:
        """Gán vai trò cho người dùng"""
        try:
            collection = self.mongo_config.database_instance()[self.collection_name]
            result = await collection.update_one(
                {"_id": ObjectId(user_id)},
                {"$set": {"role": role}},
            )
            if result.matched_count:
                return {
                    "status": "success",
                    "message": f"Vai trò {role} đã được gán cho người dùng.",
                }
            else:
                return {"status": "fail", "message": "Người dùng không tồn tại."}
        except Exception as e:
            return {"status": "error", "message": f"Lỗi khi gán vai trò: {str(e)}"}

    async def get_user_by_id(self, user_id: str) -> dict:
        """Lấy thông tin người dùng theo ID"""
        try:
            collection = self.mongo_config.database_instance()[self.collection_name]
            user = await collection.find_one({"_id": ObjectId(user_id)})
            if user:
                return {"status": "success", "user": user}
            else:
                return {"status": "fail", "message": "Người dùng không tồn tại."}
        except Exception as e:
            return {
                "status": "error",
                "message": f"Lỗi khi lấy thông tin người dùng: {str(e)}",
            }

    async def update_user(self, user_id: str, updated_data: dict) -> dict:
        """Cập nhật thông tin người dùng"""
        try:
            collection = self.mongo_config.database_instance()[self.collection_name]
            result = await collection.update_one(
                {"_id": ObjectId(user_id)},
                {"$set": updated_data},
            )
            if result.matched_count:
                return {
                    "status": "success",
                    "message": "Thông tin người dùng đã được cập nhật.",
                }
            else:
                return {"status": "fail", "message": "Người dùng không tồn tại."}
        except Exception as e:
            return {
                "status": "error",
                "message": f"Lỗi khi cập nhật thông tin người dùng: {str(e)}",
            }

    async def delete_user(self, user_id: str) -> dict:
        """Xóa người dùng"""
        try:
            collection = self.mongo_config.database_instance()[self.collection_name]
            result = await collection.delete_one({"_id": ObjectId(user_id)})
            if result.deleted_count:
                return {"status": "success", "message": "Người dùng đã được xóa."}
            else:
                return {"status": "fail", "message": "Người dùng không tồn tại."}
        except Exception as e:
            return {"status": "error", "message": f"Lỗi khi xóa người dùng: {str(e)}"}
