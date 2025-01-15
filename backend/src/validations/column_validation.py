from pydantic import BaseModel, Field, field_validator
from typing import Optional
from uuid import UUID

class ColumnValidation(BaseModel):
    title: str = Field(..., min_length=3, max_length=50)
    boardId: str = Field(...)

    @field_validator("title", mode = 'before')
    def valid_strip_whitespace(cls, value):
        return value.strip()

    @field_validator("boardId", mode='after')
    def validate_uuid(cls, value):
        try:
            UUID(value)
        except ValueError:
            raise ValueError(f"{value} is not a valid UUID")
        return value

class UpdateColumnValidation(BaseModel):
    title: Optional[str] = Field(None, min_length=1, max_length=50)
    cardOrderIds: Optional[list[str]] = Field(None)
    boardId: Optional[str] = Field(None)

    @field_validator("title", mode = 'before')
    def valid_strip_whitespace(cls, value):
        return value.strip()

    @field_validator("cardOrderIds")
    def valid_column_order_ids(cls, value):
        try:
            for column_id in value:
                UUID(column_id)
        except:
            raise ValueError(f"{value} has  invalid columnId" )
                
        return value
    
    @field_validator("boardId", mode='after')
    def validate_uuid(cls, value):
        try:
            UUID(value)
        except ValueError:
            raise ValueError(f"{value} is not a valid UUID")
        return value

    class Config:
        extra = "forbid"

