from fastapi import APIRouter, HTTPException, Depends, status
from fastapi.security import OAuth2PasswordBearer
from src.controllers.user_controller import UserController
from src.utils.jwt_util import decode_jwt  # Import hàm giải mã JWT

router = APIRouter()

# Khởi tạo controller
user_controller = UserController()

oauth2_scheme = OAuth2PasswordBearer(
    tokenUrl="token"
)  # OAuth2PasswordBearer sẽ giúp nhận token từ header


def get_current_user(token: str = Depends(oauth2_scheme)):
    """
    Hàm lấy thông tin người dùng từ JWT.
    """
    try:
        payload = decode_jwt(token)  # Giải mã token để lấy payload
        return payload
    except ValueError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid or expired token"
        )


@router.post("/users")
async def create_user(user_data: dict, current_user: dict = Depends(get_current_user)):
    """
    Tạo người dùng mới (chỉ cho phép người dùng đã đăng nhập).
    """
    try:
        result = await user_controller.create_user(user_data)
        if result["status"] == "success":
            return {"message": result["message"], "user_id": result["user_id"]}
        raise HTTPException(status_code=400, detail=result["message"])
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/users/{user_id}")
async def get_user_by_id(user_id: str, current_user: dict = Depends(get_current_user)):
    """
    Lấy thông tin người dùng theo ID (chỉ cho phép người dùng đã đăng nhập).
    """
    try:
        result = await user_controller.get_user_by_id(user_id)
        if result["status"] == "success":
            return result["user"]
        raise HTTPException(status_code=404, detail=result["message"])
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.put("/users/{user_id}")
async def update_user(
    user_id: str, user_data: dict, current_user: dict = Depends(get_current_user)
):
    """
    Cập nhật thông tin người dùng (chỉ cho phép người dùng đã đăng nhập).
    """
    try:
        result = await user_controller.update_user(user_id, user_data)
        if result["status"] == "success":
            return {"message": result["message"]}
        raise HTTPException(status_code=404, detail=result["message"])
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.delete("/users/{user_id}")
async def delete_user(user_id: str, current_user: dict = Depends(get_current_user)):
    """
    Xóa người dùng theo ID (chỉ cho phép người dùng đã đăng nhập).
    """
    try:
        result = await user_controller.delete_user(user_id)
        if result["status"] == "success":
            return {"message": result["message"]}
        raise HTTPException(status_code=404, detail=result["message"])
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/users/reset-password")
async def reset_password(email: str, current_user: dict = Depends(get_current_user)):
    """
    Khôi phục mật khẩu qua email (chỉ cho phép người dùng đã đăng nhập).
    """
    try:
        result = await user_controller.reset_password(email)
        if result["status"] == "success":
            return {"message": result["message"]}
        raise HTTPException(status_code=404, detail=result["message"])
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/users")
async def get_all_users(
    limit: int = 10, skip: int = 0, current_user: dict = Depends(get_current_user)
):
    """
    Lấy danh sách người dùng (chỉ cho phép người dùng đã đăng nhập).
    """
    try:
        users = await user_controller.get_all_users(limit, skip)
        return users
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.put("/users/deactivate/{user_id}")
async def deactivate_user(user_id: str, current_user: dict = Depends(get_current_user)):
    """
    Vô hiệu hóa tài khoản người dùng (chỉ cho phép người dùng đã đăng nhập).
    """
    try:
        result = await user_controller.deactivate_user(user_id)
        if result["status"] == "success":
            return {"message": result["message"]}
        raise HTTPException(status_code=404, detail=result["message"])
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.put("/users/activate/{user_id}")
async def activate_user(user_id: str, current_user: dict = Depends(get_current_user)):
    """
    Kích hoạt lại tài khoản người dùng (chỉ cho phép người dùng đã đăng nhập).
    """
    try:
        result = await user_controller.activate_user(user_id)
        if result["status"] == "success":
            return {"message": result["message"]}
        raise HTTPException(status_code=404, detail=result["message"])
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/users/verify/{user_id}")
async def verify_user(user_id: str, current_user: dict = Depends(get_current_user)):
    """
    Xác thực người dùng qua mã xác thực (chỉ cho phép người dùng đã đăng nhập).
    """
    try:
        result = await user_controller.verify_user(user_id)
        if result["status"] == "success":
            return {"message": result["message"]}
        raise HTTPException(status_code=404, detail=result["message"])
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
