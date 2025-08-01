from services.board_service import BoardService
from models.board_model import BoardModel
from utils.formatters import slugify


class BoardController:
    def __init__(self):
        self.board_service = BoardService()

    async def create_board(self, board_data: dict) -> dict:
        board = BoardModel(title=board_data['title'],
                           description=board_data['description'],
                           boardType=board_data['boardType'],
                           slug=slugify(board_data['title'])
                           )

        return await self.board_service.create_board(board)

    async def get_details(self, board_id) -> dict:
        return await self.board_service.get_details(board_id)

    async def update_board(self, board_id, req_body: dict) -> dict:
        return await self.board_service.update_board(board_id, req_body)

    async def move_card_to_different_column(self, req_body: dict) -> dict:
        return await self.board_service.move_card_to_different_column(req_body)
