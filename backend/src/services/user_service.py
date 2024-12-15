from typing import Optional
from backend.src.config.mongo_config.config import USER_COLLECTION
from backend.src.config.mongo_config.mongo_config import MongoConfig
from backend.src.models.user_model import UserModel


class UserService:
    def __init__(self, mongo_config: MongoConfig):
        self.collection_name = USER_COLLECTION
        self.mongo_config = mongo_config

    async def create_user():
        """
        Thêm người dùng mới vào DATABASE
        """
