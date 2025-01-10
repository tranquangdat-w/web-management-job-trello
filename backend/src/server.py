import sys
from src.config.environment import env

import uvicorn
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.middlewares.auth_middleware import AuthMiddleware
from src.routes.auth_routes import (
    router as register_or_login_router,
)
from src.config.mongodb import MongoDbConnector
# from backend.src.routes.user_routes import (
#     router as user_router,
# )  # Import router cho các route bảo vệ

APP_HOST = env['APP_HOST']
APP_PORT = env['APP_PORT']

mongodb_connector = MongoDbConnector()

@asynccontextmanager
async def lifespan(app: FastAPI):
    """
        This function will create database_instance for server
    """
    try:
        print('Connecting to database')
        await mongodb_connector.connect_database()
        print('Connected database')
    except Exception as e:
        print(f"Error: {e}", file=sys.stderr)
        sys.exit(0)
    yield
    print('Exiting app')
    await mongodb_connector.close_connect_to_database()
    print('Disconnected to database MongoDb')
    

app = FastAPI(lifespan=lifespan)

# # Thêm CORS middleware
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],  # Cho phép tất cả các domain
#     allow_credentials=True,
#     allow_methods=["*"],  # Cho phép tất cả phương thức HTTP
#     allow_headers=["*"],  # Cho phép tất cả các header
# )
#
#
#
#
# # Thêm AuthMiddleware để xử lý xác thực
# app.add_middleware(AuthMiddleware)
#
# # Thêm các route vào server
# app.include_router(register_or_login_router, prefix="/user")  # Đăng ký, đăng nhập
# # app.include_router(
# #     user_router, prefix="/dashboard"
# # )  # Route cho các dashboard người dùng (bao gồm phân quyền)
#
@app.get("/")
async def get_root():
    print(await mongodb_connector.get_database_instance().list_collection_names())
    return {"heheeh"}

if __name__ == '__main__':
    uvicorn.run('server:app', host=APP_HOST, port=APP_PORT, reload=True)

