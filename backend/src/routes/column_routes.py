from src.validations.column_validation import ColumnValidation, UpdateColumnValidation
from src.controllers.column_controller import ColumnController
from src.middlewares.auth_middleware import auth_middleware
from fastapi import APIRouter, HTTPException, status, Path, Body, Depends
from uuid import UUID
from fastapi.security import OAuth2PasswordBearer
router = APIRouter()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")  # OAuth2PasswordBearer sẽ giúp nhận token từ header

@router.post("/")
async def create_column(column: ColumnValidation, token: str = Depends(oauth2_scheme)):
    auth_middleware(token)
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
async def update_column(id: UUID = Path(...), req_body: UpdateColumnValidation = Body(...), token: str = Depends(oauth2_scheme)) -> dict: 
    auth_middleware(token)
    column_controller = ColumnController()

    new_req_body = {}
    for field in list(req_body.__fields__.keys()):
        if getattr(req_body, field) is not None:
            new_req_body[field] = getattr(req_body, field)

    column = await column_controller.update_column(id, new_req_body)

    if not column:
        raise HTTPException(status_code=status.HTTP_422_UNPROCESSABLE_ENTITY, detail = "Can't update column") 

    return column

@router.delete("/{id}")
async def delete_column(id: UUID = Path(...), token: str = Depends(oauth2_scheme)) -> dict: 
    auth_middleware(token)

    column_controller = ColumnController()

    result = await column_controller.delete_column(str(id))

    return result


