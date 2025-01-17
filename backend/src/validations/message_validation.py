from datetime import datetime
from pydantic import BaseModel, Field, field_validator
from uuid import UUID
from typing import Optional

"""
ĐỊNH NGHĨA DẠNG DỮ LIỆU CHO CÁC NHÓM VÀ TIN NHẮN

Mô hình GroupValidation định nghĩa các thông tin cần thiết và quy tắc xác thực
dữ liệu đầu vào cho việc tạo nhóm và gửi tin nhắn trong nhóm.

Các trường thông tin bao gồm:
    - Tên nhóm: group_name
    - Danh sách người tham gia: participants

Mô hình MessageValidation định nghĩa các thông tin cần thiết và quy tắc xác thực
dữ liệu đầu vào cho việc gửi tin nhắn trong nhóm.

Các trường thông tin bao gồm:
    - Người gửi: sender
    - Người nhận: receiver
    - Nội dung tin nhắn: content
    - Loại tin nhắn: message_type
"""


class GroupValidation(BaseModel):
    # Tên nhóm: group_name
    # - Bắt buộc
    # - Độ dài từ 3 đến 50 ký tự
    group_name: str = Field(
        ..., min_length=3, max_length=50, description="Group name (3 - 50 characters)"
    )

    # Danh sách người tham gia nhóm: participants
    # - Danh sách các ID người dùng tham gia nhóm
    participants: list[str] = Field(
        ..., description="List of participants in the group"
    )

    # Validator kiểm tra danh sách người tham gia
    @field_validator("participants")
    def validate_participants(cls, value):
        if len(value) < 2:
            raise ValueError("A group must have at least 2 participants.")
        return value


class MessageValidation(BaseModel):
    # Người gửi: sender
    # - Bắt buộc
    # - Kiểm tra định dạng UUID
    sender: str = Field(..., description="Sender's user ID")

    # Người nhận: receiver
    # - Bắt buộc
    # - Kiểm tra định dạng UUID
    receiver: str = Field(..., description="Receiver's user ID")

    # Nội dung tin nhắn: content
    # - Bắt buộc
    # - Độ dài từ 1 đến 500 ký tự
    content: str = Field(
        ...,
        min_length=1,
        max_length=500,
        description="Message content (1 - 500 characters)",
    )

    # Loại tin nhắn: message_type
    # - Tùy chọn, mặc định là 'text'
    message_type: Optional[str] = Field("text", description="Message type")

    # Validator kiểm tra định dạng UUID cho người gửi và người nhận
    @field_validator("sender", "receiver")
    def validate_uuid(cls, value):
        try:
            UUID(value)
        except ValueError:
            raise ValueError(f"{value} is not a valid UUID.")
        return value

    # Validator kiểm tra nội dung tin nhắn (không được rỗng)
    @field_validator("content")
    def validate_content(cls, value):
        if len(value.strip()) == 0:
            raise ValueError("Message content cannot be empty.")
        return value
