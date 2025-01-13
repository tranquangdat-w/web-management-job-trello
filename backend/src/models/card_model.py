import uuid
from mongoengine import Document
from mongoengine.fields import (
    UUIDField,
    StringField,
    DateTimeField,
)

from datetime import datetime, timezone

class CardModel(Document):
    _id = UUIDField(default=uuid.uuid4, primary_key=True)
    title = StringField(required=True, unique=True)
    boardId = UUIDField(required=True)
    columnId = UUIDField(required=True)
    createdAt = DateTimeField(default=datetime.now(timezone.utc))
    updatedAt = DateTimeField(default=None)

    def create_card(self):
        return {
            '_id': str(self._id),
            'title': self.title,
            'boardId': self.boardId,
            'columnId': self.columnId,
            'createdAt': self.createdAt,
            'updatedAt': self.updatedAt
        }

