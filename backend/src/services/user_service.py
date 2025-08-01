import smtplib
from email.mime.text import MIMEText
from datetime import datetime, timedelta, timezone
import uuid
from passlib.context import CryptContext
from fastapi import HTTPException, status
from models.user_model import UserModel
from config.environment import env
from utils.jwt_util import create_token, verify_token


class UserService:
    def __init__(self):
        self.pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

    async def create_user(self, user_data) -> dict:
        exist_user = await UserModel.find_one_by_email(user_data["email"])

        if exist_user:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT, detail=f"Email already exists"
            )

        name_from_email = user_data["email"].split("@")[0]
        new_user = UserModel(
            email=user_data["email"],
            password=self.pwd_context.hash(user_data["password"]),
            username=user_data["username"],
            displayName=name_from_email,
            verifyToken=str(uuid.uuid4()),
        )

        is_send = self.send_verification_email(
            new_user["email"], new_user.create_user_data())

        if is_send:
            result = await UserModel.create_user(new_user)

            result = await UserModel.find_one_by_id(result.inserted_id)

            del result["password"]

            return result
        raise Exception()

    async def verify_user(self, user_data):
        try:
            exist_user = await UserModel.find_one_by_email(user_data["email"])

            if not exist_user:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND, detail=f"Email Not found"
                )

            if exist_user["isActive"]:
                raise HTTPException(
                    status_code=status.HTTP_406_NOT_ACCEPTABLE,
                    detail=f"Email was active",
                )

            if exist_user["verifyToken"] != user_data["token"]:
                raise HTTPException(
                    status_code=status.HTTP_406_NOT_ACCEPTABLE,
                    detail=f"Token is in valid",
                )

            update_data = {"verifyToken": None, "isActive": True}

            updated_user = await UserModel.update_user(exist_user["_id"], update_data)

            del updated_user["password"]

            return updated_user
        except Exception as e:
            raise e

    async def login_user(self, user_data):
        try:
            exist_user = await UserModel.find_one_by_email(user_data["email"])

            if not exist_user:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND, detail=f"Email Not found"
                )

            if not exist_user["isActive"]:
                raise HTTPException(
                    status_code=status.HTTP_406_NOT_ACCEPTABLE,
                    detail=f"Email was not active",
                )

            if not self.pwd_context.verify(
                user_data["password"], exist_user["password"]
            ):
                raise HTTPException(
                    status_code=status.HTTP_406_NOT_ACCEPTABLE,
                    detail=f"password not correct",
                )

            # Tao token tra ve cho frontend
            # Tao thong tin dinh kem JWT gom _id va email
            user_info = {"_id": exist_user["_id"],
                         "email": exist_user["email"]}
            user_info["exp"] = datetime.now(timezone.utc) + timedelta(
                days=env["ACCESS_TOKEN_TIME_LIFE"]
            )

            access_token = create_token(
                user_info, env["ACCESS_TOKEN_SECRET_KEY"])

            user_info["exp"] = datetime.now(timezone.utc) + timedelta(
                days=env["ACCESS_TOKEN_TIME_LIFE"]
            )
            refesh_token = create_token(
                user_info, env["REFESH_TOKEN_SECRET_KEY"])

            del exist_user["password"]

            exist_user["accessToken"] = access_token
            exist_user["refeshToken"] = refesh_token

            return exist_user
        except Exception as e:
            raise e

    async def change_password(self, play_load, passwordData):
        user = await UserModel.find_one_by_email(play_load['email'])

        if (self.pwd_context.verify(passwordData['oldPassword'], user['password'])):
            await UserModel.update_user(user['_id'], {"password": self.pwd_context.hash(passwordData['newPassword'])})
        else:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST, detail="Password not correct")

    async def refesh_access_token(self, token: str):
        play_load = verify_token(token, env["REFESH_TOKEN_SECRET_KEY"])
        if not play_load:
            raise Exception

        play_load["exp"] = datetime.now(timezone.utc) + timedelta(
            days=env["ACCESS_TOKEN_TIME_LIFE"]
        )
        new_access_token = create_token(
            play_load, env["ACCESS_TOKEN_SECRET_KEY"])

        return new_access_token

    def send_verification_email(self, email: str, user_data: dict):
        """Gửi email xác thực với mã xác nhận."""
        msg = MIMEText(
            f"Mã xác thực của bạn là: {env['WEBSITE_DOMAIN_DEV']}/account/verification?email={user_data['email']}&token={user_data['verifyToken']}"
        )
        msg["Subject"] = "Xác thực tài khoản"
        msg["From"] = env["EMAIL_SENDER"]
        msg["To"] = email

        try:
            with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
                server.login(env["EMAIL_SENDER"], env["EMAIL_PASSWORD"])
                server.sendmail(env["EMAIL_SENDER"], email, msg.as_string())

            return True
        except Exception as e:
            print(f"Error sending email: {str(e)}")
            return False

    async def change_password(self, payload, password_data):
        user = await UserModel.find_one_by_id(payload['_id'])

        if not user:
            raise HTTPException(
                status_code=422, detail='Some errror occer when change password')

        if not self.pwd_context.verify(password_data['oldPassword'], user['password']):
            raise HTTPException(
                status_code=422, detail='Old password is not correct')

        await UserModel.change_password(user['_id'], self.pwd_context.hash(password_data['newPassword']))

        return {"status": "change password successfully"}
