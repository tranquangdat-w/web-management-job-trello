from src.config.environment import env
from src.config.mongodb import mongodb_connector
from src.models.board_model import BoardModel

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

