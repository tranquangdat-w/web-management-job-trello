import uuid
from config.environment import env
from config.mongodb import mongodb_connector
from utils.constants import BOARD_TYPES
from mongoengine import Document
from mongoengine.fields import (
    UUIDField,
    StringField,
    DateTimeField,
    ListField
)
from datetime import datetime, timezone
import copy


class BoardModel(Document):
    _id = UUIDField(default=uuid.uuid4, primary_key=True)
    title = StringField(required=True, unique=True)
    description = StringField(required=True, unique=True)
    boardType = StringField(required=True, choices=[
                            BOARD_TYPES['PUBLIC'], BOARD_TYPES['PRIVATE']])
    slug = StringField(required=True)
    columnOrderIds = ListField(UUIDField(), default=[])
    createdAt = DateTimeField(default=datetime.now(timezone.utc))
    updatedAt = DateTimeField(default=None)
    board_collection_name = env['BOARD_COLLECTION_NAME']

    def create_board_data(self):
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

    @staticmethod
    async def create_board(board: 'BoardModel'):
        return await mongodb_connector.get_database_instance()
        [BoardModel.board_collection_name] \
            .insert_one(board.create_board_data())

    @staticmethod
    async def get_details(board_id: str) -> dict:
        board_collection = mongodb_connector.get_database_instance()
        [BoardModel.board_collection_name]

        cursor = board_collection.aggregate([
            {'$match': {"_id": board_id}},
            {'$lookup': {
                "from": "columns",
                "localField": "_id",
                "foreignField": "boardId",
                "as": "columns"
            }},
            {'$lookup': {
                "from": "cards",
                "localField": "_id",
                "foreignField": "boardId",
                "as": "cards"
            }}
        ])

        # The aggregate() method returns a cursor which you can use in a loop.
        # You can't use it in an await statement because it's not an awaitable object.
        board = [data async for data in cursor]

        if len(board) == 0:
            return {}

        board = board[0]

        resBoard = copy.deepcopy(board)

        for column in resBoard['columns']:
            column['cards'] = [card for card in resBoard['cards']
                               if card['columnId'] == column['_id']]

        del resBoard['cards']

        return resBoard

    @staticmethod
    async def push_column_order_ids(column):
        board_collection = mongodb_connector \
            .get_database_instance()[BoardModel.board_collection_name]

        result = await board_collection.find_one_and_update(
            {"_id": column["boardId"]},
            {"$push": {"columnOrderIds": column["_id"]}},
            return_document=True
        )

        return result

    @staticmethod
    async def update_board(board_id, req_body: dict):
        board_collection = mongodb_connector \
            .get_database_instance()[BoardModel.board_collection_name]

        req_body['updatedAt'] = datetime.now(timezone.utc)

        result = await board_collection.find_one_and_update(
            {"_id": board_id},
            {"$set": req_body},
            return_document=True
        )

        return result

    @staticmethod
    async def delete_column_order_id(column):
        board_collection = mongodb_connector.get_database_instance()[
            BoardModel.board_collection_name]

        result = await board_collection.find_one_and_update(
            {"_id": column['boardId']},
            {"$pull": {"columnOrderIds": column['_id']}},
            return_document=True
        )

        return result
