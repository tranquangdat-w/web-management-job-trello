from src.config.mongodb import mongodb_connector
from src.models.board_model import BoardModel

class BoardService:
    async def create_board(self, board: BoardModel) -> dict:
        try:
            result = await BoardModel.create_board(board)
            result = await mongodb_connector.get_database_instance()[BoardModel.board_collection_name].find_one({"_id" : result.inserted_id})

            return result
        except Exception as e:
            return {
                'status': 'error',
                'message': f"Error when creating board {str(e)}"
            }

    async def get_details(self, board_id: str) -> dict:
        try:
            return await BoardModel.get_details(board_id)
        except Exception as e:
            return {
                'status': 'error',
                'message': f'Error when finding board {str(e)}'
            }

