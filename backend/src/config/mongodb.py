from typing import Optional
from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv

load_dotenv()
MONGO_URI = os.getenv("MONGODB_URI")
DATABASE_NAME = os.getenv("DATABASE_NAME")


class MongoConfig:
    """
    Lớp Singleton quản lý kết nối MongoDB và đảm bảo chỉ có một thể hiện duy nhất.
    - Tạo một thể hiện duy nhất của Mongo client.
    - Cung cấp quyền truy cập vào cơ sở dữ liệu và collection.
    """

    __mongo_client_instance: Optional[AsyncIOMotorClient] = None
    __database_instance = None
    __database_name: str

    def __new__(cls, *args, **kwargs):
        """Ghi đè __new__ để đảm bảo chỉ có một thể hiện của MongoConfig."""
        if not cls.__mongo_client_instance:
            cls.__mongo_client_instance = super().__new__(cls, *args, **kwargs)
        return cls.__mongo_client_instance

    def __init__(self):
        if not hasattr(self, "__initialized"):
            self.__database_name = DATABASE_NAME
            self.__database = None
            self.__initialized = True

    async def on_module_init(self):
        """Khởi tạo kết nối MongoDB và cơ sở dữ liệu."""
        if not self.__database:
            try:
                # Tạo kết nối MongoDB (chỉ thực hiện một lần)
                self.__mongo_client_instance = AsyncIOMotorClient(
                    MONGO_URI,
                    connectTimeOutMS=10000,  # Thời gian timeout khi kết nối (ms)
                    socketTimeOutMS=20000,  # Thời gian timeout khi thao tác dữ liệu (ms)
                )

                print("Kết nối đến MongoDB thành công")

                # Truy cập cơ sở dữ liệu
                self.__database = self.__mongo_client_instance.get_database(
                    self.__database_name
                )

            except Exception as error:
                print("Kết nối MongoDB thất bại:", error)

    async def on_module_destroy(self):
        """Đóng kết nối MongoDB."""
        if self.__mongo_client_instance:
            self.__mongo_client_instance.close()
            print("Đã ngắt kết nối MongoDB")

    def database_instance(self):
        """Trả về thể hiện của cơ sở dữ liệu MongoDB."""
        return self.__database
