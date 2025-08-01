from fastapi import APIRouter, HTTPException
from controllers.group_message_controller import GroupController
from validations.message_validation import GroupValidation, MessageValidation

router = APIRouter()

# Khởi tạo controller
group_controller = GroupController()


@router.post("/create_group")
async def create_group(creator: str, group_data: GroupValidation):
    """
    Tạo một nhóm mới.
    """
    response = await group_controller.create_group(creator, group_data.model_dump())
    if response["status"] == "error":
        raise HTTPException(status_code=400, detail=response["message"])
    return response


@router.get("/groups/{group_id}")
async def get_group_info(group_id: str):
    """
    Lấy thông tin của nhóm.
    """
    response = await group_controller.get_group_info(group_id)
    if response["status"] == "error":
        raise HTTPException(status_code=404, detail=response["message"])
    return response


@router.post("/groups/{group_id}/participants/{user_id}")
async def add_participant(group_id: str, user_id: str):
    """
    Thêm người tham gia vào nhóm.
    """
    response = await group_controller.add_participant(group_id, user_id)
    if response["status"] == "error":
        raise HTTPException(status_code=400, detail=response["message"])
    return response


@router.post("/groups/{group_id}/messages")
async def send_group_message(
    group_id: str, sender: str, message_data: MessageValidation
):
    """
    Gửi tin nhắn vào nhóm.
    """
    response = await group_controller.send_group_message(
        sender, group_id, message_data.model_dump()
    )
    if response["status"] == "error":
        raise HTTPException(status_code=400, detail=response["message"])
    return response


@router.post("/groups/{group_id}/admins/{admin_id}")
async def add_admin(group_id: str, admin_id: str):
    """
    Thêm người quản trị vào nhóm.
    """
    response = await group_controller.add_admin(group_id, admin_id)
    if response["status"] == "error":
        raise HTTPException(status_code=400, detail=response["message"])
    return response


@router.delete("/groups/{group_id}/participants/{user_id}")
async def remove_participant(group_id: str, user_id: str):
    """
    Xóa người tham gia khỏi nhóm.
    """
    response = await group_controller.remove_participant(group_id, user_id)
    if response["status"] == "error":
        raise HTTPException(status_code=400, detail=response["message"])
    return response


@router.delete("/groups/{group_id}/admins/{admin_id}")
async def remove_admin(group_id: str, admin_id: str):
    """
    Xóa người quản trị khỏi nhóm.
    """
    response = await group_controller.remove_admin(group_id, admin_id)
    if response["status"] == "error":
        raise HTTPException(status_code=400, detail=response["message"])
    return response


@router.delete("/groups/{group_id}")
async def delete_group(group_id: str):
    """
    Xóa nhóm.
    """
    response = await group_controller.delete_group(group_id)
    if response["status"] == "error":
        raise HTTPException(status_code=400, detail=response["message"])
    return response
