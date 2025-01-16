from src.models.message_model import MessageModel
from src.config.mongodb import mongodb_connector
from src.providers.websocket_provider import WebSocketProvider


class MessageService:
    def __init__(self, websocket_provider: WebSocketProvider):
        self.__message_collection = mongodb_connector.get_database_instance()[
            MessageModel.message_collection_name
        ]
        self.__blocked_users_collection = mongodb_connector.get_database_instance()[
            "blocked_users"
        ]
        self.websocket_provider = websocket_provider

    async def send_message(self, sender, receiver, content, mess_type="text"):
        # Kiểm tra xem sender có bị chặn bởi receiver không
        if await self.is_blocked(sender, receiver):
            return {"status": "error", "message": "You are blocked by this user."}

        # Tạo tin nhắn
        message = MessageModel(
            sender=sender,
            receiver=receiver,
            content=content,
            type=mess_type,
        )

        # Gửi tin nhắn tới người nhận qua WebSocket nếu đang kết nối
        await self.websocket_provider.broadcast_message(
            f"Message from {sender} to {receiver}: {content}"
        )

        # Lưu tin nhắn vào cơ sở dữ liệu MongoDB
        await self.__message_collection.insert_one(message.message_dict())

        return message

    async def get_conversation(self, user1, user2, limit=20, search_content=None):
        # Kiểm tra xem hai người có bị chặn không
        if await self.is_blocked(user1, user2):
            return {"status": "error", "message": "You are blocked by this user."}

        query = {
            "$or": [
                {"sender": user1, "receiver": user2},
                {"sender": user2, "receiver": user1},
            ]
        }

        # Tìm kiếm tin nhắn theo nội dung nếu có
        if search_content:
            query["content"] = {"$regex": search_content, "$options": "i"}

        # Lấy cuộc trò chuyện từ cơ sở dữ liệu MongoDB
        conversation = (
            await self.__message_collection.find(query).limit(limit).to_list(None)
        )
        return conversation

    async def is_blocked(self, user1, user2):
        # Kiểm tra xem user2 có bị user1 chặn không
        blocked_users = await self.__blocked_users_collection.find_one(
            {"user_id": user1}
        )
        if blocked_users:
            return user2 in blocked_users.get("blocked_users", [])
        return False

    async def block_user(self, user1, user2):
        # Thêm user2 vào danh sách bị chặn của user1
        blocked_users = await self.__blocked_users_collection.find_one(
            {"user_id": user1}
        )
        if blocked_users:
            await self.__blocked_users_collection.update_one(
                {"user_id": user1}, {"$addToSet": {"blocked_users": user2}}
            )
        else:
            await self.__blocked_users_collection.insert_one(
                {"user_id": user1, "blocked_users": [user2]}
            )

        return {
            "status": "success",
            "message": f"User {user2} has been blocked by {user1}.",
        }

    async def unblock_user(self, user1, user2):
        # Loại bỏ user2 khỏi danh sách bị chặn của user1
        await self.__blocked_users_collection.update_one(
            {"user_id": user1}, {"$pull": {"blocked_users": user2}}
        )

        return {
            "status": "success",
            "message": f"User {user2} has been unblocked by {user1}.",
        }
