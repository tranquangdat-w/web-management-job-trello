from src.config.environment import env
from src.config.mongodb import mongodb_connector
from src.models.column_model import ColumnModel

class ColumnService:
    def __init__(self):
        self.mongodb_connector = mongodb_connector
        self.column_collection_name = env['COLUMN_COLLECTION_NAME']

    async def create_column(self, column: ColumnModel) -> dict:
        try:
            column_collection = self.mongodb_connector.get_database_instance()[self.column_collection_name]
            
            result = await column_collection.insert_one(column.create_column())
            result = await column_collection.find_one({"_id" : result.inserted_id})

            return result
        except Exception as e:
            return {
                'status': 'error',
                'message': f"Error when creating column {str(e)}"
            }

