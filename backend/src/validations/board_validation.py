from src.utils.constants import BOARD_TYPES
from pydantic import BaseModel, Field, field_validator

class BoardValidation(BaseModel):
    title: str = Field(..., min_length=3, max_length=50)
    description: str = Field(..., min_length = 3, max_length = 255)
    boardType: str = Field(...)

    @field_validator("description", "title", mode = 'before')
    def valid_strip_whitespace(cls, value):
        return value.strip()

    @field_validator("boardType")
    def valid_board_type(cls, value):
        if value not in [BOARD_TYPES['PUBLIC'], BOARD_TYPES['PRIVATE']]:
            raise ValueError(f"Invalid board type: {value}. Must be 'public' or 'private'.")

        return value

