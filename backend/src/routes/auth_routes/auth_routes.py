from fastapi import APIRouter, HTTPException

from backend.src.validations.auth_validation.user_login_validation import (
    UserLoginValidation,
)
from backend.src.validations.auth_validation.user_register_validation import (
    UserRegisterValidation,
)


router = APIRouter()


@router.post("/login/")
async def user_login(data: UserLoginValidation):
    """
    Route xử lí đăng nhập
    """
    print(data.model_dump())
    try:
        return {"message": "Đăng nhập thành công", "data": data.model_dump()}

    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.post("/register/")
async def user_register(data: UserRegisterValidation):
    """
    Route xử lí đăng ký
    """
    print(data.model_dump())
    try:
        return {"message": "Đăng ký thành công"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
