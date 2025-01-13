import uuid
from src.utils.constants import BOARD_TYPES

from mongoengine import Document
from mongoengine.fields import (
    UUIDField,
    StringField,
    DateTimeField,
    ListField
)

from datetime import datetime, timezone

class BoardModel(Document):
    _id = UUIDField(default=uuid.uuid4, primary_key=True)
    title = StringField(required=True, unique=True)
    description = StringField(required=True, unique=True)
    boardType = StringField(required=True, choices=[BOARD_TYPES['PUBLIC'], BOARD_TYPES['PRIVATE']])
    slug = StringField(required=True)
    columnOrderIds = ListField(UUIDField(), default=[])
    createdAt = DateTimeField(default=datetime.now(timezone.utc))
    updatedAt = DateTimeField(default=None)

    def create_board(self):
        return {
            '_id': str(self._id),
            'title': self.title,
            'description': self.description,
            'type': self.boardType,
            'slug': self.slug,
            'columnOrderIds': self.columnOrderIds,
            'createdAt': self.createdAt,
            'updatedAt': self.updatedAt
        }

