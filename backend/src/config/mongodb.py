from typing import Optional
from motor.motor_asyncio import AsyncIOMotorClient
from src.config.environment import env

MONGO_URI = env['MONGODB_URI']
DATABASE_NAME = env['DATABASE_NAME']

class MongoDbConnector:
    """
    Hàm dựng :
    - Tạo một thể hiện của MONGO CLIENT : __mongo_client_instance
    - Tạo một thể hiện của DATABASE : .database_instance()
    - Tạo một thể hiện của COLLECTION theo tên COLLECTION đó với tham số truyền vào collection_name : .collection_instance()
    """

    def __init__(self):  # Hàm dựng
        self.__mongo_client_instance: Optional[AsyncIOMotorClient] = None
        self.__database = None

    async def connect_database(self):  # Hàm định nghĩa kết nối và truy cập cho DATABASE
            self.__mongo_client_instance = AsyncIOMotorClient(
                MONGO_URI,
                connectTimeOutMS=10000,  # Thời gian timeout khi kết nối (ms)
                socketTimeOutMS=20000,  # Thời gian timeout khi thao tác dữ liệu (ms)
            )

            await self.__mongo_client_instance.admin.command('ping')

            self.__database = self.__mongo_client_instance.get_database(DATABASE_NAME)

    async def close_connect_to_database(self):  # Hàm đóng kết nối DATABASE
        if self.__mongo_client_instance:
            self.__mongo_client_instance.close()  # Đóng kết nối

    def get_database_instance(self):  # Hàm tạo thể hiện cho DATABASE
        if not self.__mongo_client_instance:
            raise Exception("Must connect to database first!")

        return self.__database

