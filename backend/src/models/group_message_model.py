from mongoengine import (
    Document,
    ListField,
    ReferenceField,
    StringField,
    DateTimeField,
    UUIDField,
)
import uuid
from datetime import datetime, timezone
from config.environment import env
from models.user_model import UserModel


class GroupMessageModel(Document):
    id = UUIDField(default=uuid.uuid4, primary_key=True)
    group_name = StringField(required=True)  # Tên nhóm
    participants = ListField(
        ReferenceField(UserModel), required=True
    )  # Danh sách người tham gia nhóm
    admin = ListField(ReferenceField(UserModel))  # Danh sách người quản trị nhóm
    group_description = StringField()  # Mô tả nhóm
    messages = ListField(ReferenceField("MessageModel"))  # Các tin nhắn trong nhóm
    created_at = DateTimeField(default=datetime.now(timezone.utc))  # Thời gian tạo nhóm
    last_updated = DateTimeField(
        default=datetime.now(timezone.utc)
    )  # Thời gian cập nhật nhóm gần nhất
    group_message_collection_name = env["GROUP_MESSAGE_COLLECTION_NAME"]

    def group_conversation_dict(self):
        from models.message_model import MessageModel  # Import ở bên trong

        return {
            "id": str(self.id),
            "group_name": self.group_name,
            "participants": [str(user.id) for user in self.participants],
            "admin": [str(user.id) for user in self.admin],
            "group_description": self.group_description,
            "messages": [message.message_dict() for message in self.messages],
            "created_at": self.created_at,
            "last_updated": self.last_updated,
        }
