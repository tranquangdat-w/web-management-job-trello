from src.config.environment import env
from src.config.mongodb import mongodb_connector
from src.models.board_model import BoardModel
import copy

class BoardService:
    def __init__(self):
        self.mongodb_connector = mongodb_connector
        self.board_collection_name = env['BOARD_COLLECTION_NAME']

    async def create_board(self, board: BoardModel) -> dict:
        try:
            board_collection = self.mongodb_connector.get_database_instance()[self.board_collection_name]
            
            result = await board_collection.insert_one(board.create_board())
            result = await board_collection.find_one({"_id" : result.inserted_id})

            return result
        except Exception as e:
            return {
                'status': 'error',
                'message': f"Error when creating board {str(e)}"
            }

    async def get_details(self, board_id: str) -> dict:
        try:
            board_collection = self.mongodb_connector.get_database_instance()[self.board_collection_name]
            cursor = board_collection.aggregate([
                { '$match': { "_id": board_id } },
                { '$lookup': {
                    "from": "columns",
                    "localField": "_id",
                    "foreignField": "boardId",
                    "as": "columns"
                }},
                { '$lookup': {
                    "from": "cards",
                    "localField": "_id",
                    "foreignField": "boardId",
                    "as": "cards"
                }}
            ])

# The aggregate() method returns a cursor which you can use in a loop. You can't use it in an await statement because it's not an awaitable object.  
            board = [data async for data in cursor]

            if len(board) == 0:
                return {}

            board = board[0]

            resBoard = copy.deepcopy(board)

            for column in resBoard['columns']:
                column['cards'] = [card for card in resBoard['cards'] if card['columnId'] == column['_id']]

            del resBoard['cards']

            return resBoard
        except Exception as e:
            return {
                'status': 'error',
                'message': f'Error when finding board {str(e)}'
            }

