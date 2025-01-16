from mongoengine import (
    Document,
    UUIDField,
    StringField,
    DateTimeField,
    BooleanField,
    ListField,
    ReferenceField,
)
from datetime import datetime, timezone
import uuid
from backend.src.models import group_message_model
from models import UserModel
from src.config.environment import env


class MessageModel(Document):
    id = UUIDField(default=uuid.uuid4, primary_key=True)
    sender = ReferenceField(UserModel, required=True)  # Người gửi
    receiver = ReferenceField(
        UserModel, required=False
    )  # Người nhận (dành cho tin nhắn giữa 2 người)
    group = ReferenceField(
        group_message_model, required=False
    )  # Nhóm trò chuyện (dành cho tin nhắn nhóm)
    content = StringField(required=True)  # Nội dung tin nhắn
    timestamp = DateTimeField(default=datetime.now(timezone.utc))  # Thời gian gửi
    is_read = BooleanField(default=False)  # Trạng thái đã đọc hay chưa
    status = StringField(
        choices=["sending", "sent", "received", "read"], default="sending"
    )  # Trạng thái tin nhắn
    type = StringField(
        choices=["text", "image", "video", "file"], default="text"
    )  # Loại tin nhắn
    read_by = ListField(ReferenceField(UserModel))  # Danh sách người đã đọc tin nhắn
    message_collection_name = env["MESSAGE_COLLECTION_NAME"]

    def message_dict(self):
        return {
            "id": str(self.id),
            "sender": str(self.sender.id),
            "receiver": str(self.receiver.id) if self.receiver else None,
            "group": str(self.group.id) if self.group else None,
            "content": self.content,
            "timestamp": self.timestamp,
            "status": self.status,
            "type": self.type,
            "read_by": [str(user.id) for user in self.read_by],
        }
