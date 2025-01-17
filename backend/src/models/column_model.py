import uuid
from src.config.mongodb import mongodb_connector
from src.config.environment import env
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
    boardId = UUIDField(required=True)
    cardOrderIds = ListField(UUIDField(), default=[])
    createdAt = DateTimeField(default=datetime.now(timezone.utc))
    updatedAt = DateTimeField(default=None)
    column_collection_name = env['COLUMN_COLLECTION_NAME']

    def create_column_data(self):
        return {
            '_id': str(self._id),
            'title': self.title,
            'boardId': self.boardId,
            'cardOrderIds': self.cardOrderIds,
            'createdAt': self.createdAt,
            'updatedAt': self.updatedAt
        }

    @staticmethod
    async def create_column(column: 'ColumnModel'):
        return await mongodb_connector.get_database_instance()[ColumnModel.column_collection_name].insert_one(column.create_column_data())


    @staticmethod
    async def find_one_by_id(column_id):
        result = await mongodb_connector.get_database_instance()[ColumnModel.column_collection_name].find_one({"_id" : column_id})

        return result 

    @staticmethod
    async def push_card_order_ids(card):
        column_collection = mongodb_connector.get_database_instance()[ColumnModel.column_collection_name]
        result = await column_collection.find_one_and_update(
            {"_id": card["columnId"]},
            {"$push": {"cardOrderIds": card["_id"]}},
            return_document=True
        )
        return result

    @staticmethod
    async def update_column(column_id, req_body: dict):
        column_collection = mongodb_connector.get_database_instance()[ColumnModel.column_collection_name]

        req_body['updatedAt'] = datetime.now(timezone.utc)

        result = await column_collection.find_one_and_update(
                { "_id": column_id },
                { "$set": req_body },
                return_document=True
            )

        return result

    @staticmethod
    async def delete_column(column_id):
        column_collection = mongodb_connector.get_database_instance()[ColumnModel.column_collection_name]

        result = await column_collection.delete_one({ "_id": column_id })

        return result

    @staticmethod
    async def delete_one_card(card_id, column_id):
        column_collection = mongodb_connector.get_database_instance()[ColumnModel.column_collection_name]

        return await column_collection.update_one(
            {"_id": column_id},  # Tìm cột có chứa card_id
            {"$pull": {"cardOrderIds": card_id}}  # Xóa card_id khỏi mảng
        )

