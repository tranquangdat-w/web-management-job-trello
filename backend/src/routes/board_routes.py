from src.validations.board_validation import BoardValidation
from src.controllers.board_controller import BoardController
from fastapi import APIRouter, HTTPException, status, Path

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
        

@router.get("/{id}")
async def get_details(id: str = Path(...)):
        board_controller = BoardController()
        board = await board_controller.get_details(id)

        if not board: 
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Not Found Board")

        return board        


