import sys
from src.config.environment import env
from src.utils.constants import WHITElIST_DOMAINS
import uvicorn
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.middlewares.auth_middleware import AuthMiddleware
from src.routes.auth_routes import router as register_or_login_router
from src.routes.message_routes import router as message_router
from src.routes.group_message_routes import router as group_message_router
from src.routes.board_routes import router as board_router
from src.routes.card_routes import router as card_router
from src.routes.column_routes import router as column_router
from src.config.mongodb import mongodb_connector
from src.routes.user_routes import (
    router as user_router,
)  # Import router cho các route bảo vệ

APP_HOST = env["APP_HOST"]
APP_PORT = env["APP_PORT"]


@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    This function will create database_instance for server
    """
    try:
        print("Connecting to database")
        await mongodb_connector.connect_database()
        print("Connected database")
    except Exception as e:
        print(f"Error: {e}", file=sys.stderr)
        sys.exit(0)
    yield
    print("Exiting app")
    await mongodb_connector.close_connect_to_database()
    print("Disconnected to database MongoDb")


app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=WHITElIST_DOMAINS,  # Domain
    allow_credentials=True,
    allow_methods=["*"],  # Cho phép tất cả phương thức HTTP
    allow_headers=["*"],  # Cho phép tất cả các header
)

# Thêm AuthMiddleware để xử lý xác thực token
# app.add_middleware(AuthMiddleware)

# Đăng ký các route vào ứng dụng FastAPI
app.include_router(
    register_or_login_router, prefix="/user"
)  # Route đăng ký, đăng nhập người dùng

# Đưa ra các route dành cho dashboard hoặc các tài nguyên bảo vệ khác (nếu có)
app.include_router(user_router, prefix="/dashboard")

app.include_router(board_router, prefix="/boards")
app.include_router(card_router, prefix="/cards")
app.include_router(column_router, prefix="/columns")
app.include_router(message_router, prefix="/message")
app.include_router(group_message_router, prefix="/group_message")


@app.get("/")
async def get_root():
    return {"Welcome baby": "haha"}


if __name__ == "__main__":
    uvicorn.run("server:app", host=APP_HOST, port=APP_PORT, reload=True)
