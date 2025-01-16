from dotenv import load_dotenv
import os

load_dotenv()

env = {
    "DATABASE_NAME": os.getenv("DATABASE_NAME", ""),
    "MONGODB_URI": os.getenv("MONGODB_URI", ""),
    "APP_HOST": os.getenv("APP_HOST", ""),
    "APP_PORT": int(os.getenv("APP_PORT", 8000)),
    "BOARD_COLLECTION_NAME": os.getenv("BOARD_COLLECTION_NAME", ""),
    "CARD_COLLECTION_NAME": os.getenv("CARD_COLLECTION_NAME", ""),
    "COLUMN_COLLECTION_NAME": os.getenv("COLUMN_COLLECTION_NAME", ""),
    "MESSAGE_COLLECTION_NAME": os.getenv("MESSAGE_COLLECTION_NAME", ""),
    "GROUP_MESSAGE_COLLECTION_NAME": os.getenv("GROUP_MESSAGE_COLLECTION_NAME", ""),
}
