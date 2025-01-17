from src.services.message_service import MessageService
from src.providers.websocket_provider import WebSocketProvider


class MessageController:

    def __init__(self):
        websocket_provider = WebSocketProvider()  # Tạo đối tượng WebSocketProvider
        self.message_service = MessageService(websocket_provider)  # Truyền tham số vào

    async def send_message(
        self, sender: str, receiver: str, message_data: dict
    ) -> dict:
        """
        Gửi tin nhắn giữa hai người dùng
        """
        content = message_data["content"]
        message_type = message_data.get("message_type", "text")

        # Gọi service để gửi tin nhắn
        return await self.message_service.send_message(
            sender, receiver, content, message_type
        )

    async def get_conversation(
        self, user1: str, user2: str, limit: int = 20, search_content: str = None
    ) -> dict:
        """
        Lấy cuộc trò chuyện giữa hai người dùng
        """
        # Gọi service để lấy cuộc trò chuyện giữa hai người dùng
        return await self.message_service.get_conversation(
            user1, user2, limit, search_content
        )

    async def block_user(self, user1: str, user2: str) -> dict:
        """
        Chặn người dùng
        """
        # Gọi service để chặn người dùng
        return await self.message_service.block_user(user1, user2)

    async def unblock_user(self, user1: str, user2: str) -> dict:
        """
        Bỏ chặn người dùng
        """
        # Gọi service để bỏ chặn người dùng
        return await self.message_service.unblock_user(user1, user2)
