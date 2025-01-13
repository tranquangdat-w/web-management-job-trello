from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.middlewares.auth_middleware import AuthMiddleware
from src.routes.auth_routes import router as register_or_login_router
from src.routes.user_routes import (
    router as user_router,
)  # Nếu bạn có route dành cho dashboard người dùng

app = FastAPI()

# Thêm CORS middleware để cho phép tất cả các domain
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Cho phép tất cả các domain
    allow_credentials=True,
    allow_methods=["*"],  # Cho phép tất cả các phương thức HTTP
    allow_headers=["*"],  # Cho phép tất cả các header
)

# Thêm AuthMiddleware để xử lý xác thực token
app.add_middleware(AuthMiddleware)

# Đăng ký các route vào ứng dụng FastAPI
app.include_router(
    register_or_login_router, prefix="/user"
)  # Route đăng ký, đăng nhập người dùng

# Đưa ra các route dành cho dashboard hoặc các tài nguyên bảo vệ khác (nếu có)
app.include_router(
    user_router, prefix="/dashboard"
)  # Ví dụ: dashboard yêu cầu xác thực


@app.get("/")
async def root():
    return {"message": "Welcome to FastAPI server!"}
