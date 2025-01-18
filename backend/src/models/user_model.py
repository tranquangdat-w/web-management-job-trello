from mongoengine import Document
from src.config.mongodb import mongodb_connector
from src.config.environment import env
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
    _id = UUIDField(default=uuid.uuid4, primary_key=True)
    email = EmailField(required=True, unique=True)
    password = StringField(required=True)

    displayName = StringField(required=True, unique=True)
    username = StringField(required=True, unique=True)
    avatar = StringField(default="")
    role = StringField(required=True, default="client", choices=["client", "admin"])

    verifyToken = StringField()
    isActive = BooleanField(default=False)

    createdAt = DateTimeField(default=datetime.now(timezone.utc))
    updatedAt = DateTimeField(default=None)
    user_collection_name = env['USER_COLLECTION_NAME']

    def create_user_data(self):
        return {
            "_id": str(self._id),
            "email": self.email,
            "password": self.password,
            "displayName": self.displayName,
            "username": self.username,
            "avatar": self.avatar,
            "role": self.role,
            "isActive": self.isActive,
            "verifyToken": self.verifyToken,
            "createAt": self.createdAt,
            "updatedAt": self.updatedAt,
        }

    @staticmethod
    async def create_user(user: 'UserModel'):
        return await mongodb_connector.get_database_instance()[UserModel.user_collection_name].insert_one(user.create_user_data())

    @staticmethod
    async def find_one_by_id(user_id):
        result = await mongodb_connector.get_database_instance()[UserModel.user_collection_name].find_one({"_id" : user_id})

        return result 

    @staticmethod
    async def find_one_by_email(email):
        result = await mongodb_connector.get_database_instance()[UserModel.user_collection_name].find_one({"email" : email})

        return result 

    @staticmethod
    async def update_user(user_id, req_body: dict):
        user_collection = mongodb_connector.get_database_instance()[UserModel.user_collection_name]

        req_body['updatedAt'] = datetime.now(timezone.utc)

        result = await user_collection.find_one_and_update(
                { "_id": user_id },
                { "$set": req_body },
                return_document=True
            )

        return result

    @staticmethod
    async def change_password(user_id, hashed_password):
        user_collection = mongodb_connector.get_database_instance()[UserModel.user_collection_name]

        result = await user_collection.find_one_and_update(
                { "_id": user_id },
                { "$set": { "password": hashed_password, 'updatedAt': datetime.now(timezone.utc)} },
                return_document=True
            )

        return result


