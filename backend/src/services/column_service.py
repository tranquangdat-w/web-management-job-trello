from config.mongodb import mongodb_connector
from models.column_model import ColumnModel
from models.board_model import BoardModel
from models.card_model import CardModel

class ColumnService:
    async def create_column(self, column: ColumnModel) -> dict:
        try:
            result = await ColumnModel.create_column(column)
            
            result = await ColumnModel.find_one_by_id(result.inserted_id)
            
            if result:
                result['cards'] = []
                await BoardModel.push_column_order_ids(result)

                return result
            else: 
                raise Exception()
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

    async def delete_column(self, column_id) -> dict:
        try:
            target_column = await ColumnModel.find_one_by_id(column_id)

            # Remove column
            await ColumnModel.delete_column(column_id)

            # Remove all its cards
            await CardModel.delete_many_by_column_id(column_id)

            # Remove column order in board
            await BoardModel.delete_column_order_id(target_column)

            return { "deleteResult": "Column and its cards was delete" }

        except Exception as e:
            return {
                'status': 'error',
                'message': f"Can't delete column with error: {str(e)}"
            }
