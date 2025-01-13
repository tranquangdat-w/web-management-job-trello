from pydantic import BaseModel, Field, field_validator
from uuid import UUID

class ColumnValidation(BaseModel):
    title: str = Field(..., min_length=3, max_length=50)
    boardId: str = Field(...)

    @field_validator("description", "title", mode = 'before')
    def valid_strip_whitespace(cls, value):
        return value.strip()

    @field_validator("boardId", mode='after')
    def validate_uuid(cls, value):
        try:
            UUID(value)
        except ValueError:
            raise ValueError(f"{value} is not a valid UUID")
        return value

