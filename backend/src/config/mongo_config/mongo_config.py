from typing import Optional
from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv

from backend.src.config.mongo_config.config import DATABASE_NAME

load_dotenv()
MONGO_URI = os.getenv("MONGO_CLOUD_TEST_URI")


class MongoConfig:
    """
    Hàm dựng :
    - Tạo một thể hiện của MONGO CLIENT : __mongo_client_instance
    - Tạo một thể hiện của DATABASE : .database_instance()
    - Tạo một thể hiện của COLLECTION theo tên COLLECTION đó với tham số truyền vào collection_name : .collection_instance()
    """

    def __init__(self):  # Hàm dựng
        self.__database_name = DATABASE_NAME
        self.__mongo_client_instance: Optional[AsyncIOMotorClient] = None
        self.__database = None

    async def on_module_init(self):  # Hàm định nghĩa kết nối và truy cập cho DATABASE
        try:
            # Kết nối DATABASE
            self.__mongo_client_instance = AsyncIOMotorClient(
                MONGO_URI,
                connectTimeOutMS=10000,  # Thời gian timeout khi kết nối (ms)
                socketTimeOutMS=20000,  # Thời gian timeout khi thao tác dữ liệu (ms)
            )

            print("Connected to MongoDB")

            # Truy cập DATABASE
            self.__database = self.__mongo_client_instance.get_database(
                self.__database_name
            )

        except Exception as error:
            print("Failed to connected MongoDB", error)

    async def on_module_destroy(self):  # Hàm đóng kết nối DATABASE
        if self.__mongo_client_instance:
            self.__mongo_client_instance.close()  # Đóng kết nối
            print("Disconnected from MongoDB")

    def database_instance(self):  # Hàm tạo thể hiện cho DATABASE
        return self.__database
