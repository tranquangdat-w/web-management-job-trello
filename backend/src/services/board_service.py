from src.config.mongodb import mongodb_connector
from src.models.board_model import BoardModel
from src.models.column_model import ColumnModel
from src.models.card_model import CardModel
from datetime import datetime, timezone

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

    async def update_board(self, board_id, req_body: dict) -> dict:
        try:
            return await BoardModel.update_board(board_id, req_body)
        except Exception as e:
            return {
                'status': 'error',
                'message': f"Can't update board with error: {str(e)}"
            }

    async def move_card_to_different_column(self, req_data: dict) -> dict:
        try:
            await ColumnModel.update_column(
                req_data["prevColumnId"],
                {
                    'updatedAt': datetime.now(timezone.utc),
                    'cardOrderIds': req_data['prevCardOrderIds']
                }
            )

            await ColumnModel.update_column(
                req_data["nextColumnId"],
                {
                    'updatedAt': datetime.now(timezone.utc),
                    'cardOrderIds': req_data['nextColumnId']
                }
            )

            await CardModel.update_card(
                req_data["currentCardId"],
                {
                    'updatedAt': datetime.now(timezone.utc),
                    'columnId' : req_data['nextColumnId']
                }
            )

        except Exception as e:
            return {
                'status': 'error',
                'message': f"Can't move card to another column with error: {str(e)}"
            }

