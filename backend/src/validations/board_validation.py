from src.utils.constants import BOARD_TYPES
from typing import Optional
from pydantic import BaseModel, Extra, Field, field_validator, model_validator
from uuid import UUID

class CreateBoardValidation(BaseModel):
    title: str = Field(..., min_length=1, max_length=50)
    description: str = Field(..., min_length = 1, max_length = 255)
    boardType: str = Field(...)

    @field_validator("description", "title", mode = 'before')
    def valid_strip_whitespace(cls, value):
        return value.strip()

    @field_validator("boardType")
    def valid_board_type(cls, value):
        if value not in [BOARD_TYPES['PUBLIC'], BOARD_TYPES['PRIVATE']]:
            raise ValueError(f"Invalid board type: {value}. Must be 'public' or 'private'.")

        return value

class UpdateBoardValidation(BaseModel):
    title: Optional[str] = Field(None, min_length=3, max_length=50)
    description: Optional[str] = Field(None, min_length=3, max_length=255)
    boardType: Optional[str] = Field(None)
    columnOrderIds: Optional[list[str]] = Field(None)

    @field_validator("description", "title", mode = 'before')
    def valid_strip_whitespace(cls, value):
        return value.strip()

    @field_validator("boardType")
    def valid_board_type(cls, value):
        if value not in [BOARD_TYPES['PUBLIC'], BOARD_TYPES['PRIVATE']]:
            raise ValueError(f"Invalid board type: {value}. Must be 'public' or 'private'.")

        return value
    
    @field_validator("columnOrderIds")
    def valid_column_order_ids(cls, value):
        try:
            for column_id in value:
                UUID(column_id)
        except:
            raise ValueError(f"{value} has  invalid columnId" )
                
        return value
    
    class Config:
        extra = "forbid"

class MoveCardToDifferentValidation(BaseModel):
    currentCardId: str = Field(...)
    prevColumnId: str = Field(...)
    prevCardOrderIds: list[str] = Field(...)
    nextColumnId: str = Field(...)
    nextCardOrderIds: list[str] = Field(...)

    @field_validator("prevCardOrderIds", "nextCardOrderIds")
    def valid_column_order_ids(cls, value):
        try:
            for column_id in value:
                UUID(column_id)
        except:
            raise ValueError(f"{value} has  invalid columnId" )
                
        return value

    @field_validator("currentCardId", "prevColumnId", "nextColumnId", mode='after')
    def validate_uuid(cls, value):
        try:
            UUID(value)
        except ValueError:
            raise ValueError(f"{value} is not a valid UUID")
        return value

    class Config:
        extra = "forbid"

