from validations.card_validation import CardValidation, UpdateCardValidation, DeleteCardValidation
from controllers.card_controller import CardController
from middlewares.auth_middleware import auth_middleware
from fastapi import APIRouter, HTTPException, status, Path, Body, Depends
from uuid import UUID
from fastapi.security import OAuth2PasswordBearer


router = APIRouter()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")  # OAuth2PasswordBearer sẽ giúp nhận token từ header


@router.post("/")
async def create_card(card: CardValidation, token: str = Depends(oauth2_scheme)):
    auth_middleware(token)
    try:
        card_controller = CardController()
        result = await card_controller.create_card({
            'title': card.title,
            'boardId': card.boardId,
            'columnId': card.columnId
        })

        return result
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_422_UNPROCESSABLE_ENTITY, detail=f"Can't create card: {e}")


@router.put("/{id}")
async def update_card(id: UUID = Path(...), req_body: UpdateCardValidation = Body(...), token: str = Depends(oauth2_scheme)) -> dict:
    auth_middleware(token)
    card_controller = CardController()

    new_req_body = {}
    for field in list(req_body.__fields__.keys()):
        if getattr(req_body, field) is not None:
            new_req_body[field] = getattr(req_body, field)

    card = await card_controller.update_card(id, new_req_body)

    if not card:
        raise HTTPException(status_code=status.HTTP_422_UNPROCESSABLE_ENTITY, detail="Can't update card")

    return card


@router.delete("/{id}")
async def delete_card(id: UUID = Path(...), req_body: DeleteCardValidation = Body(...), token: str = Depends(oauth2_scheme)) -> dict:
    auth_middleware(token)

    card_controller = CardController()

    new_req_body = {}
    for field in list(req_body.__fields__.keys()):
        if getattr(req_body, field) is not None:
            new_req_body[field] = getattr(req_body, field)

    card = await card_controller.delete_card(str(id), new_req_body['columnId'])

    if not card:
        raise HTTPException(status_code=status.HTTP_422_UNPROCESSABLE_ENTITY, detail="Can't delete card")

    return card
