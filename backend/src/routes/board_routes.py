from validations.board_validation import (
    CreateBoardValidation,
    UpdateBoardValidation,
    MoveCardToDifferentValidation,
)

from fastapi.security import OAuth2PasswordBearer
from controllers.board_controller import BoardController
from fastapi import APIRouter, HTTPException, status, Path, Body, Depends
from middlewares.auth_middleware import auth_middleware
from uuid import UUID

router = APIRouter()


@router.get("/")
def get_boards():
    return {"GET": "APIs for list of boards"}


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")  # OAuth2PasswordBearer sẽ giúp nhận token từ header


@router.post("/")
async def create_board(board: CreateBoardValidation,
                       token: str = Depends(oauth2_scheme)):
    auth_middleware(token)
    try:
        board_controller = BoardController()
        result = await board_controller.create_board(
            {
                "title": board.title,
                "description": board.description,
                "boardType": board.boardType,
            }
        )

        return result
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail=f"Can't create board: {e}",
        )


@router.get("/{id}")
async def get_details(id: UUID = Path(...), token: str = Depends(oauth2_scheme)) -> dict:
    auth_middleware(token)
    try:
        board_controller = BoardController()
        board = await board_controller.get_details(str(id))

        if not board:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Not Found Board")
        return board
    except Exception:
        raise Exception


@router.put("/{id}")
async def update_board(id: UUID = Path(...), req_body: UpdateBoardValidation = Body(...), token: str = Depends(oauth2_scheme)) -> dict:
    auth_middleware(token)
    board_controller = BoardController()

    new_req_body = {}
    for field in list(req_body.model_fields.keys()):
        if getattr(req_body, field) is not None:
            new_req_body[field] = getattr(req_body, field)

    board = await board_controller.update_board(str(id), new_req_body)

    if not board:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail="Can't update board",
        )

    return board


@router.put("/supports/moving_card")
async def move_card_to_different_column(req_body: MoveCardToDifferentValidation = Body(...), token: str = Depends(oauth2_scheme)) -> dict:
    auth_middleware(token)
    try:
        board_controller = BoardController()

        new_req_body = {}
        for field in list(req_body.model_fields.keys()):
            if getattr(req_body, field) is not None:
                new_req_body[field] = getattr(req_body, field)

        await board_controller.move_card_to_different_column(new_req_body)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail=f"can't move card to another column with error: {e}",
        )

    return {"status": "Successfully"}
