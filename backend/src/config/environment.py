from dotenv import load_dotenv
import os

load_dotenv()

env = {
    'DATABASE_NAME': os.getenv('DATABASE_NAME', ''),
    'MONGODB_URI': os.getenv('MONGODB_URI', ''),
    'APP_HOST': os.getenv('APP_HOST', ''),
    'APP_PORT': int(os.getenv('APP_PORT', 8000)),
    'BOARD_COLLECTION_NAME': os.getenv('BOARD_COLLECTION_NAME', ''),
    'CARD_COLLECTION_NAME': os.getenv('CARD_COLLECTION_NAME', ''),
    'COLUMN_COLLECTION_NAME': os.getenv('COLUMN_COLLECTION_NAME', ''),
    'USER_COLLECTION_NAME': os.getenv('USER_COLLECTION_NAME', ''),
    'WEBSITE_DOMAIN_DEV': os.getenv('WEBSITE_DOMAIN_DEV', ''),
    'EMAIL_SENDER': os.getenv('EMAIL_SENDER', ''),
    'EMAIL_PASSWORD': os.getenv('EMAIL_PASSWORD', ''),
    'ACCESS_TOKEN_SECRET_KEY': os.getenv('ACCESS_TOKEN_SECRET_KEY', ''),
    'REFESH_TOKEN_SECRET_KEY': os.getenv('REFESH_TOKEN_SECRET_KEY', ''),
    'MESSAGE_COLLECTION_NAME': os.getenv('MESSAGE_COLLECTION_NAME', ''),
    'GROUP_MESSAGE_COLLECTION_NAME': os.getenv(
        'GROUP_MESSAGE_COLLECTION_NAME',
        ''),
    'ACCESS_TOKEN_TIME_LIFE': int(os.getenv('ACCESS_TOKEN_TIME_LIFE', 7)),
    'REFESH_TOKEN_TIME_LIFE': int(os.getenv('REFESH_TOKEN_TIME_LIFE', 14)),
}
