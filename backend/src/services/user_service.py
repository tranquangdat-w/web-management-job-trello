import os
from pymongo.errors import DuplicateKeyError
from datetime import datetime, timezone
from bson import ObjectId
from dotenv import load_dotenv
from src.models.user_model import UserModel
from src.config.mongodb import MongoDbConnector

load_dotenv()

USER_COLLECTION = os.getenv('USER_COLLECTION')

class UserService:
    def __init__(self):
        self.mongo_config = MongoDbConnector()
        self.collection_name = USER_COLLECTION

    async def create_user(self, user: UserModel) -> dict:
        """
        Thêm người dùng mới vào DATABASE.

        :param user: Thể hiện của UserModel.
        :return: Từ điển chứa thông tin kết quả.
        """
        try:
            collection = self.mongo_config.get_database_instance()[self.collection_name]
            existing_user = await collection.find_one({"email": user.email})
            if existing_user:
                return {"status": "fail", "message": "Email đã tồn tại."}

            user_data = user.user_dict()
            user_data["created_at"] = datetime.now(timezone.utc)

            result = await collection.insert_one(user_data)
            return {
                "status": "success",
                "message": "Người dùng đã được tạo thành công.",
                "user_id": str(result.inserted_id),
            }

        except DuplicateKeyError:
            return {"status": "fail", "message": "Người dùng đã tồn tại."}

        except Exception as e:
            return {"status": "error", "message": f"Lỗi khi tạo người dùng: {str(e)}"}

    async def update_user(self, user_id: str, update_data: dict) -> dict:
        """
        Cập nhật thông tin người dùng.

        :param user_id: ID của người dùng cần cập nhật.
        :param update_data: Dữ liệu cập nhật dưới dạng từ điển.
        :return: Từ điển chứa thông tin kết quả.
        """
        try:
            collection = self.mongo_config.get_database_instance()[self.collection_name]

            # Kiểm tra người dùng có tồn tại hay không
            existing_user = await collection.find_one({"_id": ObjectId(user_id)})
            if not existing_user:
                return {"status": "fail", "message": "Người dùng không tồn tại."}

            # Cập nhật thông tin
            result = await collection.update_one(
                {"_id": ObjectId(user_id)},
                {"$set": update_data},
            )
            if result.matched_count:
                return {"status": "success", "message": "Cập nhật thành công."}
            else:
                return {"status": "fail", "message": "Không có gì để cập nhật."}

        except Exception as e:
            return {
                "status": "error",
                "message": f"Lỗi khi cập nhật người dùng: {str(e)}",
            }

    async def delete_user(self, user_id: str) -> dict:
        """
        Xóa người dùng.

        :param user_id: ID của người dùng cần xóa.
        :return: Từ điển chứa thông tin kết quả.
        """
        try:
            collection = self.mongo_config.get_database_instance()[self.collection_name]

            # Xóa người dùng
            result = await collection.delete_one({"_id": ObjectId(user_id)})
            if result.deleted_count:
                return {"status": "success", "message": "Xóa người dùng thành công."}
            else:
                return {"status": "fail", "message": "Người dùng không tồn tại."}

        except Exception as e:
            return {"status": "error", "message": f"Lỗi khi xóa người dùng: {str(e)}"}

    async def get_user_by_username(self, username: str) -> dict:
        """
        Lấy thông tin người dùng theo tên đăng nhập (username).

        :param username: Tên đăng nhập của người dùng.
        :return: Từ điển chứa thông tin người dùng hoặc thông báo lỗi.
        """
        try:
            collection = self.mongo_config.get_database_instance()[self.collection_name]
            user = await collection.find_one({"username": username})
            if user:
                return {"status": "success", "user": user}
            else:
                return {"status": "fail", "message": "Người dùng không tồn tại."}
        except Exception as e:
            return {
                "status": "error",
                "message": f"Lỗi khi lấy thông tin người dùng: {str(e)}",
            }

    async def get_user_by_email(self, email: str) -> dict:
        """
        Lấy thông tin người dùng theo email.

        :param email: Email của người dùng.
        :return: Từ điển chứa thông tin người dùng hoặc thông báo lỗi.
        """
        try:
            collection = self.mongo_config.get_database_instance()[self.collection_name]
            user = await collection.find_one({"email": email})
            if user:
                return {"status": "success", "user": user}
            else:
                return {"status": "fail", "message": "Người dùng không tồn tại."}
        except Exception as e:
            return {
                "status": "error",
                "message": f"Lỗi khi lấy thông tin người dùng: {str(e)}",
            }
