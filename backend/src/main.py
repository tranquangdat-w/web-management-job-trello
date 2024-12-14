from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.src.middlewares.auth_middleware import AuthMiddleware
from backend.src.routes.auth_routes.auth_routes import (
    router as register_or_login_router,
)

app = FastAPI()

# Thêm CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.add_middleware(AuthMiddleware)

# Thêm các route vào server
app.include_router(register_or_login_router, prefix="/user")


@app.get("/")
async def root():
    return {"message": "Welcome to FastAPI server!"}
