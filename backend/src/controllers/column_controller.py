from src.services.column_service import ColumnService
from src.models.column_model import ColumnModel

class ColumnController:
    def __init__(self):
        self.column_service = ColumnService()

    async def create_column(self, column_data: dict) -> dict:
        column = ColumnModel(title = column_data['title'], boardId = column_data['boardId'])

        return await self.column_service.create_column(column)

