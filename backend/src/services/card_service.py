from src.config.environment import env
from src.config.mongodb import mongodb_connector
from src.models.card_model import CardModel

class CardService:
    def __init__(self):
        self.mongodb_connector = mongodb_connector
        self.card_collection_name = env['CARD_COLLECTION_NAME']

    async def create_card(self, card: CardModel) -> dict:
        try:
            card_collection = self.mongodb_connector.get_database_instance()[self.card_collection_name]
            
            result = await card_collection.insert_one(card.create_card())
            result = await card_collection.find_one({"_id" : result.inserted_id})

            return result
        except Exception as e:
            return {
                'status': 'error',
                'message': f"Error when creating card {str(e)}"
            }

