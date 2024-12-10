from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.src.routes.auth_routes.auth_routes import router as register_login_router

app = FastAPI()

# Thêm CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Thêm các route vào server
app.include_router(register_login_router)


@app.get("/")
async def root():
    return {"message": "Welcome to FastAPI server!"}
