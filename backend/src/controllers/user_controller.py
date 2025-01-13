from src.services.user_service import UserService
from src.models.user_model import UserModel


class UserController:
    """
    Controller để trung gian giữa service và routes
    """

    def __init__(self):
        self.user_service = UserService()

    async def create_user(self, user_data: dict):
        """
        Xử lý logic tạo người dùng từ dữ liệu nhận được.
        """
        user = UserModel(**user_data)
        return await self.user_service.create_user(user)

    async def get_user_by_id(self, user_id: str):
        """
        Xử lý logic lấy thông tin người dùng theo ID.
        """
        return await self.user_service.get_user_by_id(user_id)

    async def get_user_by_username(self, username: str):
        """
        Xử lý logic lấy thông tin người dùng theo tên đăng nhập.
        """
        return await self.user_service.get_user_by_username(username)

    async def get_user_by_email(self, email: str):
        """
        Xử lý logic lấy thông tin người dùng theo email.
        """
        return await self.user_service.get_user_by_email(email)

    async def update_user(self, user_id: str, user_data: dict):
        """
        Xử lý logic cập nhật thông tin người dùng theo ID.
        """
        return await self.user_service.update_user(user_id, user_data)

    async def delete_user(self, user_id: str):
        """
        Xử lý logic xóa người dùng theo ID.
        """
        return await self.user_service.delete_user(user_id)

    async def deactivate_user(self, user_id: str):
        """
        Xử lý logic vô hiệu hóa tài khoản người dùng theo ID.
        """
        return await self.user_service.deactivate_user(user_id)

    async def activate_user(self, user_id: str):
        """
        Xử lý logic kích hoạt lại tài khoản người dùng theo ID.
        """
        return await self.user_service.activate_user(user_id)

    async def verify_user(self, user_id: str):
        """
        Xử lý logic xác thực người dùng theo ID.
        """
        return await self.user_service.verify_user(user_id)

    async def get_all_users(self, limit: int = 10, skip: int = 0):
        """
        Xử lý logic lấy danh sách tất cả người dùng.
        """
        return await self.user_service.get_all_users(limit, skip)

    async def reset_password(self, email: str):
        """
        Xử lý logic gửi mã khôi phục mật khẩu qua email.
        """
        return await self.user_service.reset_password(email)
