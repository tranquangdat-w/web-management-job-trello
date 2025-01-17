from fastapi import HTTPException, Header
from fastapi import Header
from src.config.environment import env
from src.utils.jwt_util import verify_token

def auth_middleware(authorization: str = Header(None)):
    if not authorization:
        raise HTTPException(status_code=401, detail='Not found access token')
    try:
        client_token_decode = verify_token(authorization.split()[1], env['ACCESS_TOKEN_SECRET_KEY'])

        return client_token_decode

    except Exception as e:
        # call refeshToken
        if str(e) == 'Token hết hạn':
            raise HTTPException(status_code=410)
        else:
            raise HTTPException(status_code=401, detail='You need log in again!!!!')

