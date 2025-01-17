from fastapi import WebSocket
from typing import List


class WebSocketProvider:
    def __init__(self):
        # Danh sách để lưu trữ tất cả các kết nối WebSocket
        self.active_connections: List[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        # Kết nối WebSocket
        await websocket.accept()
        self.active_connections.append(websocket)

    async def disconnect(self, websocket: WebSocket):
        # Ngắt kết nối WebSocket
        self.active_connections.remove(websocket)

    async def send_message(self, message: str):
        # Gửi thông điệp tới tất cả các client WebSocket đang kết nối
        for connection in self.active_connections:
            await connection.send_text(message)

    async def broadcast_message(self, message: str):
        # Gửi thông điệp tới tất cả các client WebSocket
        for connection in self.active_connections:
            await connection.send_text(message)
