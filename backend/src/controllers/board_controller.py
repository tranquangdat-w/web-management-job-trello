from src.services.board_service import BoardService
from src.models.board_model import BoardModel

class BoardController:
    def __init__(self):
        self.board_service = BoardService()

    async def create_board(self, board_data: dict) -> dict:
        board = BoardModel(title = board_data['title'], description = board_data['description'], slug = 'hehe')

        return await self.board_service.create_board(board)
