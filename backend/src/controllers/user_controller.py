from src.services.user_service import UserService

class UserController:
    """
    Controller để trung gian giữa service và routes
    """

    def __init__(self):
        self.user_service = UserService()

    async def create_user(self, user_data) -> dict:
        try:
            return await self.user_service.create_user(user_data)
        except Exception as e:
            raise e

    async def verify_user(self, user_data):
        try:
            return await self.user_service.verify_user(user_data)
        except Exception as e:
            raise e

    async def login_user(self, user_data):
        try:
            result = await self.user_service.login_user(user_data)

            return result
        except Exception as e:
            raise e

    async def refesh_access_token(self, token: str):
        try:
            return await self.user_service.refesh_access_token(token)
        except Exception as e:
            raise e 

    async def change_password(self, payload, passwordData):
        try:
            result = await self.user_service.change_password(payload, passwordData)

            return result
        except Exception as e:
            raise e


