import re
from pydantic import BaseModel, EmailStr, Field, field_validator


class UserLoginValidation(BaseModel):
    # Tên đăng nhập
    # - Bắt buộc
    # - Độ dài tối thiểu: 6 ký tự
    # - Độ dài tối đa: 20 ký tự
    # - Chỉ chứa chữ cái và số
    username: str = Field(
        ...,
        min_length=6,
        max_length=20,
        pattern=r"^[a-zA-Z0-9]+$",
        description="Tên đăng nhập (chỉ chứa chữ cái và số, từ 6 - 20 ký tự)",
    )

    # Mật khẩu
    # - Bắt buộc
    # - Độ dài từ 8 đến 64 ký tự
    # - Validator sẽ kiểm tra mật khẩu phải chứa ít nhất một chữ cái và một số
    password: str = Field(
        ...,
        min_length=8,
        max_length=64,
        description="Mật khẩu (phải chứa ít nhất một chữ cái và một số)",
    )

    # Validator kiểm tra mật khẩu
    @field_validator("password")
    def validate_password(cls, value):
        """
        Kiểm tra xem mật khẩu có chứa ít nhất một chữ cái và một số hay không.
        Nếu không thỏa mãn thì ném lỗi.
        """
        if not re.search(r"[A-Za-z]", value) or not re.search(r"\d", value):
            raise ValueError("Mật khẩu phải chứa ít nhất một chữ cái và một số")
        return value

    class Config:
        from_attributes = True
