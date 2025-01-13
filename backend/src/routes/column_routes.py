from src.validations.column_validation import ColumnValidation
from src.controllers.column_controller import ColumnController

from fastapi import APIRouter, HTTPException, status

router = APIRouter()

@router.post("/")
async def create_column(column: ColumnValidation):
    try:
        column_controller = ColumnController()
        result = await column_controller.create_column({
            'title': column.title,
            'boardId': column.boardId,
        })

        return result
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_422_UNPROCESSABLE_ENTITY, detail=f"Can't create column: {e}")
        
