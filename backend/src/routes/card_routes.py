from src.validations.card_validation import CardValidation
from src.controllers.card_controller import CardController

from fastapi import APIRouter, HTTPException, status

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
        
