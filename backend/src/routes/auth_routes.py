from fastapi import APIRouter, HTTPException, Depends
from fastapi.security import OAuth2PasswordBearer
from backend.src.services.auth_service import AuthService
from backend.src.validations.auth_validation.user_login_validation import (
    UserLoginValidation,
)
from backend.src.validations.auth_validation.user_register_validation import (
    UserRegisterValidation,
)
from backend.src.utils.jwt_util import (
    create_jwt,
    decode_jwt,
)  # Đảm bảo import các hàm JWT đúng

router = APIRouter()

# OAuth2PasswordBearer để lấy token từ header Authorization
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

auth_service = AuthService()


@router.post("/login")
async def user_login(data: UserLoginValidation):
    try:
        # Đăng nhập người dùng và tạo token
        user_data = await auth_service.login_user(data)
        if user_data:
            # Tạo JWT token cho người dùng sau khi đăng nhập thành công
            token = create_jwt(
                {"user_id": user_data["user_id"], "email": user_data["email"]}
            )
            return {"message": "Đăng nhập thành công", "token": token}
        else:
            raise HTTPException(
                status_code=400, detail="Thông tin đăng nhập không chính xác"
            )
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Lỗi khi đăng nhập: {str(e)}")


@router.post("/register")
async def user_register(data: UserRegisterValidation):
    try:
        # Đăng ký người dùng
        await auth_service.register_user(data)
        return {"message": "Đăng ký thành công"}
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Lỗi khi đăng ký: {str(e)}")


@router.get("/verify_token")
async def verify_token(token: str):
    try:
        # Xác minh token
        payload = decode_jwt(token)
        return {"message": "Token hợp lệ", "payload": payload}
    except ValueError as e:
        raise HTTPException(status_code=401, detail=f"Token không hợp lệ: {str(e)}")
    except Exception as e:
        raise HTTPException(status_code=500, detail="Lỗi xác minh token")


@router.get("/protected")
async def protected_route(token: str = Depends(oauth2_scheme)):
    try:
        # Kiểm tra token và truy cập vào thông tin người dùng
        payload = decode_jwt(token)
        user_id = payload.get("user_id")
        email = payload.get("email")
        return {"message": "Access granted", "user_id": user_id, "email": email}
    except ValueError as e:
        raise HTTPException(status_code=401, detail=f"Token không hợp lệ: {str(e)}")
    except Exception as e:
        raise HTTPException(
            status_code=500, detail="Lỗi trong khi truy cập tài nguyên bảo vệ"
        )
