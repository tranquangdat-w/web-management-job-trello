import uuid
from src.config.mongodb import mongodb_connector
from src.config.environment import env
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
    card_collection_name = env['CARD_COLLECTION_NAME']

    def create_card_data(self):
        return {
            '_id': str(self._id),
            'title': self.title,
            'boardId': self.boardId,
            'columnId': self.columnId,
            'createdAt': self.createdAt,
            'updatedAt': self.updatedAt
        }
    @staticmethod
    async def create_card(card: 'CardModel'):
        return await mongodb_connector.get_database_instance()[CardModel.card_collection_name].insert_one(card.create_card_data())


    

