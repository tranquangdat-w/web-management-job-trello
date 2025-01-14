from src.config.mongodb import mongodb_connector
from src.models.column_model import ColumnModel
from src.models.board_model import BoardModel

class ColumnService:
    async def create_column(self, column: ColumnModel) -> dict:
        try:
            result = await ColumnModel.create_column(column)

            result = await mongodb_connector.get_database_instance()[ColumnModel.column_collection_name].find_one({"_id" : result.inserted_id})

            if result:
                result['cards'] = []
                await BoardModel.push_column_order_ids(result)

            return result
        except Exception as e:
            return {
                'status': 'error',
                'message': f"Error when creating column {str(e)}"
            }

    async def update_column(self, column_id, req_body: dict) -> dict:
        try:
            return await ColumnModel.update_column(column_id, req_body)
        except Exception as e:
            return {
                'status': 'error',
                'message': f"Can't update column with error: {str(e)}"
            }

