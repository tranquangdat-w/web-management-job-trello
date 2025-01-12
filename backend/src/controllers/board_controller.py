from src.services.board_service import BoardService
from src.models.board_model import BoardModel
from src.utils.formatters import slugify

class BoardController:
    def __init__(self):
        self.board_service = BoardService()

    async def create_board(self, board_data: dict) -> dict:
        board = BoardModel(title = board_data['title'], description = board_data['description'], slug = slugify(board_data['title']))

        return await self.board_service.create_board(board)
