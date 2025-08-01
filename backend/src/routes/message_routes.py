from fastapi import APIRouter, HTTPException
from controllers.message_controller import MessageController
from validations.message_validation import MessageValidation

router = APIRouter()

# Khởi tạo controller
message_controller = MessageController()


@router.post("/send_messages")
async def send_message(sender: str, receiver: str, message_data: MessageValidation):
    """
    Gửi tin nhắn giữa hai người dùng.
    """
    response = await message_controller.send_message(
        sender, receiver, message_data.dict()
    )
    if response["status"] == "error":
        raise HTTPException(status_code=400, detail=response["message"])
    return response


@router.get("/conversations")
async def get_conversation(
    user1: str, user2: str, limit: int = 20, search_content: str = None
):
    """
    Lấy cuộc trò chuyện giữa hai người dùng.
    """
    response = await message_controller.get_conversation(
        user1, user2, limit, search_content
    )
    if response["status"] == "error":
        raise HTTPException(status_code=400, detail=response["message"])
    return response


@router.post("/block")
async def block_user(user1: str, user2: str):
    """
    Chặn người dùng.
    """
    response = await message_controller.block_user(user1, user2)
    if response["status"] == "error":
        raise HTTPException(status_code=400, detail=response["message"])
    return response


@router.post("/unblock")
async def unblock_user(user1: str, user2: str):
    """
    Bỏ chặn người dùng.
    """
    response = await message_controller.unblock_user(user1, user2)
    if response["status"] == "error":
        raise HTTPException(status_code=400, detail=response["message"])
    return response
