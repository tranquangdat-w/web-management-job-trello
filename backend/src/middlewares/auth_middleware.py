from fastapi import HTTPException
from fastapi import Depends
from fastapi.security import OAuth2PasswordBearer
from config.environment import env
from utils.jwt_util import verify_token

# OAuth2PasswordBearer sẽ giúp nhận token từ header
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


def auth_middleware(token: str = Depends(oauth2_scheme)):
    if not token:
        raise HTTPException(status_code=410, detail='Not found access token')
    try:
        client_token_decode = verify_token(
            token, env['ACCESS_TOKEN_SECRET_KEY'])

        return client_token_decode

    except Exception as e:
        # call refeshToken
        if str(e) == 'Token hết hạn':
            raise HTTPException(status_code=410)
        else:
            print(e)
            raise HTTPException(
                status_code=401, detail='You need log in again!!!!')
