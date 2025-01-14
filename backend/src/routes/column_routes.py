from src.validations.column_validation import ColumnValidation, UpdateColumnValidation
from src.controllers.column_controller import ColumnController

from fastapi import APIRouter, HTTPException, status, Path, Body

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
        
@router.put("/{id}")
async def update_column(id: str = Path(...), req_body: UpdateColumnValidation = Body(...)) -> dict: 
    column_controller = ColumnController()

    new_req_body = {}
    for field in list(req_body.__fields__.keys()):
        if getattr(req_body, field) is not None:
            new_req_body[field] = getattr(req_body, field)

    column = await column_controller.update_column(id, new_req_body)

    if not column:
        raise HTTPException(status_code=status.HTTP_422_UNPROCESSABLE_ENTITY, detail = "Can't update column") 

    return column

