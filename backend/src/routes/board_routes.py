from src.validations.board_validation import BoardValidation
from src.controllers.board_controller import BoardController

from fastapi import APIRouter, HTTPException, status

router = APIRouter()

@router.get("/")
def get_boards():
    return { 'GET': 'APIs for list of boards'}

@router.post("/")
async def create_board(board: BoardValidation):
    try:
        board_controller = BoardController()
        result = await board_controller.create_board({
            'title': board.title,
            'description': board.description
        })

        return result
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_422_UNPROCESSABLE_ENTITY, detail=f"Can't create board: {e}")
        




