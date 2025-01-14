from src.validations.card_validation import CardValidation, UpdateCardValidation
from src.controllers.card_controller import CardController

from fastapi import APIRouter, HTTPException, status, Path, Body

router = APIRouter()

@router.post("/")
async def create_card(card: CardValidation):
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
async def update_card(id: str = Path(...), req_body: UpdateCardValidation = Body(...)) -> dict: 
    card_controller = CardController()

    new_req_body = {}
    for field in list(req_body.__fields__.keys()):
        if getattr(req_body, field) is not None:
            new_req_body[field] = getattr(req_body, field)

    card = await card_controller.update_card(id, new_req_body)

    if not card:
        raise HTTPException(status_code=status.HTTP_422_UNPROCESSABLE_ENTITY, detail = "Can't update card") 

    return card

