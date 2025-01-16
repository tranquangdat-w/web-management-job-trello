from src.providers.websocket_provider import WebSocketProvider
from src.services.group_message_service import GroupService


class GroupController:
    def __init__(self):
        websocket_provider = WebSocketProvider()
        self.group_service = GroupService(websocket_provider)

    async def create_group(self, creator, group_data: dict) -> dict:
        """
        Tạo một nhóm mới
        """
        group_name = group_data["group_name"]
        description = group_data.get("description", None)

        # Gọi service để tạo nhóm
        return await self.group_service.create_group(creator, group_name, description)

    async def get_group_info(self, group_id: str) -> dict:
        """
        Lấy thông tin của nhóm
        """
        # Gọi service để lấy thông tin nhóm
        return await self.group_service.get_group_info(group_id)

    async def add_participant(self, group_id: str, user_id: str) -> dict:
        """
        Thêm người tham gia vào nhóm
        """
        # Gọi service để thêm người tham gia
        return await self.group_service.add_participant(group_id, user_id)

    async def send_group_message(
        self, sender: str, group_id: str, message_data: dict
    ) -> dict:
        """
        Gửi tin nhắn vào nhóm
        """
        content = message_data["content"]
        message_type = message_data.get("message_type", "text")

        # Gọi service để gửi tin nhắn
        return await self.group_service.send_group_message(
            sender, group_id, content, message_type
        )

    async def add_admin(self, group_id: str, admin_id: str) -> dict:
        """
        Thêm người quản trị vào nhóm
        """
        # Gọi service để thêm người quản trị
        return await self.group_service.add_admin(group_id, admin_id)

    async def remove_participant(self, group_id: str, user_id: str) -> dict:
        """
        Xóa người tham gia khỏi nhóm
        """
        # Gọi service để xóa người tham gia
        return await self.group_service.remove_participant(group_id, user_id)

    async def remove_admin(self, group_id: str, admin_id: str) -> dict:
        """
        Xóa người quản trị khỏi nhóm
        """
        # Gọi service để xóa người quản trị
        return await self.group_service.remove_admin(group_id, admin_id)

    async def delete_group(self, group_id: str) -> dict:
        """
        Xóa nhóm
        """
        # Gọi service để xóa nhóm
        return await self.group_service.delete_group(group_id)
