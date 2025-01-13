from pydantic import BaseModel, Field, field_validator

class BoardValidation(BaseModel):
    title: str = Field(..., min_length=3, max_length=50)
    description: str = Field(..., min_length = 3, max_length = 255)
    boardType: str = Field(...)

    @field_validator("description", "title", mode = 'before')
    def valid_strip_whitespace(cls, value):
        return value.strip()

