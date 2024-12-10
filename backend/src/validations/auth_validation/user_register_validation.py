from datetime import date
from typing import Literal, Optional
from pydantic import BaseModel, EmailStr, Field, field_validator, model_validator
import re

"""
ĐỊNH NGHĨA DẠNG DỮ LIỆU CHO CÁC TRƯỜNG TRONG PHẦN ĐĂNG KÝ TÀI KHOẢN NGƯỜI DÙNG

Mô hình UserRegisterValidation định nghĩa các thông tin cần thiết và quy tắc xác thực
dữ liệu đầu vào cho chức năng đăng ký tài khoản người dùng.

Trường thông tin bao gồm:
    - Tên tài khoản: username
        
    - Mật khẩu: password
       
    - Xác nhận mật khẩu: confirm_password
       
    - Email: email

    - Họ và tên đầy đủ: fullname

    - Ngày tháng năm sinh: date_of_birth

    - Giới tính: sex

    - Số điện thoại: phone_number

    - Địa chỉ: address
"""


class UserRegisterValidation(BaseModel):

    # Tên tài khoản: username
    # - Bắt buộc
    # - Độ dài từ 6 đến 20 ký tự
    # - Chỉ cho phép chữ cái và số
    username: str = Field(
        ...,
        min_length=6,
        max_length=20,
        pattern=r"^[a-zA-Z0-9]+$",
        description="Tên đăng nhập (chứa từ 6 - 20 ký tự, chỉ chữ cái và số)",
    )

    # Mật khẩu: password
    # - Bắt buộc
    # - Độ dài từ 8 đến 64 ký tự
    password: str = Field(
        ...,
        min_length=8,
        max_length=64,
        description="Mật khẩu (từ 8 - 64 ký tự, phải chứa ít nhất một chữ cái và một số)",
    )

    # Xác nhận mật khẩu: confirm_password
    # - Bắt buộc và sẽ được so sánh với password
    confirm_password: str = Field(
        ..., description="Xác nhận mật khẩu để đảm bảo không nhập sai"
    )

    # Email của người dùng
    # - Kiểm tra xem input có phải email hợp lệ hay không
    email: EmailStr

    # Họ và tên đầy đủ của người dùng
    # - Độ dài tối thiểu là 3 và tối đa là 50 ký tự
    fullname: str = Field(
        ..., min_length=3, max_length=50, description="Họ và tên đầy đủ (3 - 50 ký tự)"
    )

    # Ngày tháng năm sinh của người dùng
    # - Dạng yyyy-mm-dd và không được nằm ở tương lai
    date_of_birth: str = Field(
        ..., description="Ngày tháng năm sinh (định dạng yyyy-mm-dd)"
    )

    # Giới tính: male, female hoặc other
    # - Giới tính hợp lệ được giới hạn bởi 3 giá trị cụ thể
    sex: Literal["male", "female", "other"]

    # Số điện thoại
    # - Phải là số hợp lệ, có từ 10 đến 15 chữ số
    phone_number: str = Field(
        ...,
        pattern=r"^0\d{9,10}$",
        description="Số điện thoại hợp lệ (10 - 15 chữ số, bắt đầu với số 0)",
    )

    # Địa chỉ của người dùng (không bắt buộc)
    # - Nếu nhập thì phải hợp lệ và từ 10 đến 100 ký tự
    address: Optional[str] = Field(
        None,
        description="Địa chỉ (không bắt buộc, nếu có phải hợp lệ và từ 10 - 100 ký tự)",
    )

    # Validator kiểm tra mật khẩu an toàn
    # - Mật khẩu phải chứa ít nhất một chữ cái và một số
    @field_validator("password")
    def validate_password(cls, value):
        """
        Kiểm tra xem mật khẩu có chứa ít nhất một chữ cái và một số hay không.
        Nếu không thỏa mãn, ném lỗi.
        """
        if not re.search(r"[A-Za-z]", value) or not re.search(r"\d", value):
            raise ValueError("Mật khẩu phải chứa ít nhất một chữ cái và một số")
        return value

    # Validator so sánh confirm_password với password
    @model_validator(mode="before")
    def validate_confirm_password(cls, values):
        """
        Kiểm tra xem mật khẩu xác nhận có trùng với mật khẩu không.
        Nếu không trùng, ném lỗi.
        """
        if "password" not in values or "confirm_password" not in values:
            raise ValueError(
                "Cần cung cấp đầy đủ thông tin password và confirm_password"
            )

        if values["password"] != values["confirm_password"]:
            raise ValueError("Mật khẩu xác nhận không khớp với mật khẩu")

        return values

    # Validator kiểm tra ngày sinh hợp lệ
    # - Ngày sinh không được ở tương lai và định dạng là yyyy-mm-dd
    @field_validator("date_of_birth")
    def validate_date_of_birth(cls, value):
        """
        Kiểm tra ngày sinh hợp lệ:
            - Ngày sinh không được nằm ở tương lai.
            - Ngày sinh phải ở định dạng yyyy-mm-dd.
        """
        try:
            dob = date.fromisoformat(value)
            if dob > date.today():
                raise ValueError("Ngày sinh không thể ở tương lai")
        except ValueError:
            raise ValueError("Ngày sinh phải đúng định dạng yyyy-mm-dd")
        return value

    # Validator kiểm tra tính hợp lệ của địa chỉ (nếu có)
    @field_validator("address")
    def validate_address(cls, value):
        """
        Kiểm tra địa chỉ:
            - Nếu có nhập địa chỉ, thì địa chỉ phải hợp lệ.
            - Chỉ cho phép các ký tự hợp lệ và khoảng trắng.
        """
        if not value:
            return value  # Không cần validate nếu địa chỉ trống
        value = value.strip()
        if not re.match(r"^[\w\s]+$", value):
            raise ValueError("Địa chỉ không hợp lệ.")
        return value
