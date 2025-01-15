from pydantic import BaseModel, Field, field_validator
from typing import Optional
from uuid import UUID

class CardValidation(BaseModel):
    title: str = Field(..., min_length=3, max_length=50)
    boardId:  str =  Field(...)
    columnId: str = Field(...)

    @field_validator("title", mode = 'before')
    def valid_strip_whitespace(cls, value):
        return value.strip()

    @field_validator("boardId", "columnId", mode='before')
    def validate_uuid(cls, value):
        try:
            UUID(value)
        except ValueError:
            raise ValueError(f"{value} is not a valid UUID")
        return value

class UpdateCardValidation(BaseModel):
    title: Optional[str] = Field(None, min_length=1, max_length=50)
    boardId: Optional[str] = Field(None)
    columnId: Optional[str] = Field(None)

    @field_validator("title", mode = 'before')
    def valid_strip_whitespace(cls, value):
        return value.strip()

    @field_validator("boardId", "columnId", mode="after")
    def validate_uuid(cls, value):
        try:
            UUID(value)
        except ValueError:
            raise ValueError(f"{value} is not a valid UUID")

        return value

    class Config:
        extra = "forbid"

