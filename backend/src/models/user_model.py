from mongoengine import Document
from mongoengine.fields import (
    UUIDField,
    StringField,
    EmailField,
    BooleanField,
    DateTimeField,
)
from datetime import datetime, timezone
import uuid


class UserModel(Document):

    id = UUIDField(default=uuid.uuid4, primary_key=True)
    username = StringField(required=True, unique=True)
    password = StringField(required=True)
    email = EmailField(required=True, unique=True)
    fullname = StringField(required=True)
    date_of_birth = DateTimeField(required=True)
    sex = StringField(required=True, choices=["male", "female", "other"])
    phone_number = StringField(required=True)
    address = StringField()
    is_verified = BooleanField(default=False)
    is_active = BooleanField(default=False)
    created_at = DateTimeField(default=datetime.now(timezone.utc))

    def user_dict(self):
        return {
            "id": str(self.id),
            "username": self.username,
            "email": self.email,
            "fullname": self.fullname,
            "date_of_birth": self.date_of_birth,
            "sex": self.sex,
            "phone_number": self.phone_number,
            "address": self.address,
            "is_verified": self.is_verified,
            "is_active": self.is_active,
            "create_at": self.created_at,
        }
