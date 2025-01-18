from fastapi import APIRouter, HTTPException, status, Depends, Body
from fastapi.security import OAuth2PasswordBearer
from src.controllers.user_controller import UserController
from src.validations.user_validation import UserLoginValidation, UserRegisterValidation, UserVerifyAcountValidation, ChangePasswordValidation
from src.middlewares.auth_middleware import auth_middleware

router = APIRouter()

# Khởi tạo controller
user_controller = UserController()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")  # OAuth2PasswordBearer sẽ giúp nhận token từ header

@router.post("/register")
async def create_user(user_data: UserRegisterValidation) -> dict:
    try:
        result = await user_controller.create_user({
            'email': user_data.email,
            'password': user_data.password,
            'username': user_data.username
        })

        return result
    except Exception as e:
        raise e
  
@router.put("/verify")
async def verify_user(user_data: UserVerifyAcountValidation):
    try:
        result = await user_controller.verify_user({
            'email': user_data.email,
            'token': user_data.token,
        })

        return result
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_422_UNPROCESSABLE_ENTITY, detail=f"Can't verify user: {e}")

@router.post("/login")
async def login_user(user_data: UserLoginValidation):
    try:
        result = await user_controller.login_user({
            'email': user_data.email,
            'password': user_data.password,
        })

        return result
    except Exception as e:
        raise e

@router.get("/refesh_token")
async def refesh_access_token(token: str = Depends(oauth2_scheme)):
    try:
        new_access_token = await user_controller.refesh_access_token(token)

        if not new_access_token:
            raise Exception 

        return new_access_token
    except Exception:
        raise HTTPException(status_code=status.HTTP_422_UNPROCESSABLE_ENTITY, detail=f"Sign in! (Error refesh token)")

@router.put("/change_password")
async def change_password(passwordData: ChangePasswordValidation, token: str = Depends(oauth2_scheme)):
    payload = auth_middleware(token)
    try:
        await user_controller.change_password(payload, {
            'oldPassword': passwordData.oldPassword,
            'newPassword': passwordData.newPassword
        })

    except Exception as e:
        raise e

