from pymongo.errors import DuplicateKeyError
from datetime import datetime, timezone
from bson import ObjectId
from backend.src.config.mongo_config.config import USER_COLLECTION
from backend.src.models.user_model import UserModel
from backend.src.config.mongo_config.mongo_config import MongoConfig


class UserService:
    def __init__(self):
        self.mongo_config = MongoConfig()
        self.collection_name = USER_COLLECTION

    async def create_user(self, user: UserModel) -> dict:
        """
        Thêm người dùng mới vào DATABASE.

        :param user: Thể hiện của UserModel.
        :return: Từ điển chứa thông tin kết quả.
        """
        try:
            collection = self.mongo_config.database_instance()[self.collection_name]
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
            collection = self.mongo_config.database_instance()[self.collection_name]

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
            collection = self.mongo_config.database_instance()[self.collection_name]

            # Xóa người dùng
            result = await collection.delete_one({"_id": ObjectId(user_id)})
            if result.deleted_count:
                return {"status": "success", "message": "Xóa người dùng thành công."}
            else:
                return {"status": "fail", "message": "Người dùng không tồn tại."}

        except Exception as e:
            return {"status": "error", "message": f"Lỗi khi xóa người dùng: {str(e)}"}
