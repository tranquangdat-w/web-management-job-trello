import uuid

from mongoengine import Document
from mongoengine.fields import (
    UUIDField,
    StringField,
    DateTimeField,
    ListField
)

from datetime import datetime, timezone

class ColumnModel(Document):
    _id = UUIDField(default=uuid.uuid4, primary_key=True)
    title = StringField(required=True, unique=True)

    boardId = StringField()
    cardOrderIds = ListField(UUIDField(), default=[])

    createdAt = DateTimeField(default=datetime.now(timezone.utc))
    updatedAt = DateTimeField(default=None)

