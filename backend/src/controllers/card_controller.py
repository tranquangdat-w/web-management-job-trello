from src.services.card_service import CardService
from src.models.card_model import CardModel

class CardController:
    def __init__(self):
        self.card_service = CardService()

    async def create_card(self, card_data: dict) -> dict:
        card = CardModel(title = card_data['title'], boardId = card_data['boardId'], columnId = card_data['columnId'])

        return await self.card_service.create_card(card)

