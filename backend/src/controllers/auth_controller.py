from fastapi import HTTPException
from src.services.auth_service import AuthService
from src.validations.auth_validation.user_login_validation import (
    UserLoginValidation,
)
from src.validations.auth_validation.user_register_validation import (
    UserRegisterValidation,
)

auth_service = AuthService()


async def user_login_controller(data: UserLoginValidation):
    try:
        # Gọi phương thức đăng nhập của dịch vụ
        token = await auth_service.login_user(data)
        return {"message": "Đăng nhập thành công", "token": token}
    except HTTPException as e:
        # Bắt lỗi HTTPException và trả về thông báo lỗi
        raise e
    except Exception as e:
        # Bắt các lỗi khác và trả về HTTPException với mã lỗi 500
        raise HTTPException(status_code=500, detail=f"Lỗi khi đăng nhập: {str(e)}")


async def user_register_controller(data: UserRegisterValidation):
    try:
        # Gọi phương thức đăng ký của dịch vụ
        await auth_service.register_user(data)
        return {"message": "Đăng ký thành công"}
    except HTTPException as e:
        # Bắt lỗi HTTPException và trả về thông báo lỗi
        raise e
    except Exception as e:
        # Bắt các lỗi khác và trả về HTTPException với mã lỗi 500
        raise HTTPException(status_code=500, detail=f"Lỗi khi đăng ký: {str(e)}")


async def verify_token_controller(token: str):
    try:
        # Xác minh token qua dịch vụ
        payload = await auth_service.verify_token(
            token
        )  # Đảm bảo verify_token là async nếu cần await
        return {"message": "Token hợp lệ", "payload": payload}
    except ValueError as e:
        # Bắt lỗi ValueError khi token không hợp lệ
        raise HTTPException(status_code=401, detail=f"Token không hợp lệ: {str(e)}")
    except HTTPException as e:
        # Nếu có lỗi HTTPException (ví dụ token hết hạn)
        raise e
    except Exception as e:
        # Bắt các lỗi khác và trả về HTTPException với mã lỗi 500
        raise HTTPException(status_code=500, detail="Lỗi xác minh token")
