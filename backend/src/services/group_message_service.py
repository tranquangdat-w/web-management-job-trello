from uuid import uuid4
from src.config.mongodb import mongodb_connector
from src.models.group_message_model import GroupMessageModel
from src.models.message_model import MessageModel
from src.providers.websocket_provider import WebSocketProvider


class GroupService:
    def __init__(self, websocket_provider: WebSocketProvider):
        self.websocket_provider = websocket_provider
        self.__group_collection = None
        self.__message_collection = None

    async def connect_to_database(self):
        await mongodb_connector.connect_database()
        self.__group_collection = mongodb_connector.get_database_instance()[
            GroupMessageModel.group_message_collection_name
        ]
        self.__message_collection = mongodb_connector.get_database_instance()[
            MessageModel.message_collection_name
        ]

    async def create_group(self, creator, group_name, description=None):
        try:
            await self.connect_to_database()
        except Exception as e:
            return {
                "status": "error",
                "message": str(e),
            }

        group_id = uuid4()

        group = GroupMessageModel(
            id=group_id,
            group_name=group_name,
            group_description=description,
            participants=[creator],
            admin=[creator],
        )

        try:
            await self.__group_collection.insert_one(group.to_mongo().to_dict())
        except Exception as e:
            return {
                "status": "error",
                "message": str(e),
            }

        # Gửi thông báo WebSocket tới tất cả client
        await self.websocket_provider.broadcast_message(
            f"New group '{group_name}' created."
        )

        return {
            "status": "success",
            "message": "Group created successfully.",
        }

    async def add_participant(self, group_id, user_id):
        group = await self.__group_collection.find_one({"id": group_id})
        if not group:
            return {"status": "error", "message": "Group not found."}

        if user_id in [str(user.id) for user in group["participants"]]:
            return {"status": "error", "message": "User already a member of the group."}

        await self.__group_collection.update_one(
            {"id": group_id},
            {"$addToSet": {"participants": user_id}},
        )

        # Gửi thông báo WebSocket tới tất cả client về người tham gia mới
        await self.websocket_provider.broadcast_message(
            f"User {user_id} has joined the group."
        )

        return {"status": "success", "message": "User added to group."}

    async def send_group_message(self, sender, group_id, content, message_type="text"):
        group = await self.__group_collection.find_one({"id": group_id})
        if not group:
            return {"status": "error", "message": "Group not found."}
        if sender not in [str(user.id) for user in group["participants"]]:
            return {
                "status": "error",
                "message": "Sender is not a participant of the group.",
            }

        message = MessageModel(
            sender=sender,
            group=group_id,
            content=content,
            type=message_type,
        )

        await self.__message_collection.insert_one(message.to_mongo().to_dict())

        # Cập nhật tin nhắn vào nhóm
        await self.__group_collection.update_one(
            {"id": group_id},
            {"$push": {"messages": message.id}},
        )

        # Gửi thông báo WebSocket tới tất cả client về tin nhắn mới
        await self.websocket_provider.broadcast_message(
            f"New message from {sender}: {content}"
        )

        return {"status": "success", "message": "Message sent successfully."}
