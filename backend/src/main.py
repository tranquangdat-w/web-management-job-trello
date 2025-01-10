from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.middlewares.auth_middleware import AuthMiddleware
from src.routes.auth_routes import (
    router as register_or_login_router,
)

# from backend.src.routes.user_routes import (
#     router as user_router,
# )  # Import router cho các route bảo vệ

app = FastAPI()

# Thêm CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Cho phép tất cả các domain
    allow_credentials=True,
    allow_methods=["*"],  # Cho phép tất cả phương thức HTTP
    allow_headers=["*"],  # Cho phép tất cả các header
)

# Thêm AuthMiddleware để xử lý xác thực
app.add_middleware(AuthMiddleware)

# Thêm các route vào server
app.include_router(register_or_login_router, prefix="/user")  # Đăng ký, đăng nhập
# app.include_router(
#     user_router, prefix="/dashboard"
# )  # Route cho các dashboard người dùng (bao gồm phân quyền)


@app.get("/")
async def root():
    return {"message": "Welcome to FastAPI server!"}

