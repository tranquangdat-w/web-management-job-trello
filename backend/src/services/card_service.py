from fastapi import HTTPException
from config.mongodb import mongodb_connector
from models.card_model import CardModel
from models.column_model import ColumnModel

class CardService:
    async def create_card(self, card: CardModel) -> dict:
        try:
            result = await CardModel.create_card(card)

            result = await mongodb_connector.get_database_instance()[CardModel.card_collection_name].find_one({"_id" : result.inserted_id})

            if result:
                await ColumnModel.push_card_order_ids(result)

            return result
        except Exception as e:
            return {
                'status': 'error',
                'message': f"Error when creating card {str(e)}"
            }

    async def update_card(self, card_id, req_body: dict) -> dict:
        try:
            return await CardModel.update_card(card_id, req_body)
        except Exception as e:
            return {
                'status': 'error',
                'message': f"Can't update card with error: {str(e)}"
            }

    async def delete_card(self, card_id, columnId) -> dict:
        await CardModel.delete_card(card_id)

        await ColumnModel.delete_one_card(card_id, columnId)

        return {"status" : "card was delete"}
