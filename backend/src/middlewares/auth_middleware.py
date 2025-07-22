from fastapi import HTTPException
from fastapi import HTTPException, Depends
from fastapi.security import OAuth2PasswordBearer
from src.config.environment import env
from src.utils.jwt_util import verify_token

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")  # OAuth2PasswordBearer sẽ giúp nhận token từ header
def auth_middleware(token: str = Depends(oauth2_scheme)):
    print("ok")
    if not token:
        raise HTTPException(status_code=410, detail='Not found access token')
    try:
        client_token_decode = verify_token(token, env['ACCESS_TOKEN_SECRET_KEY'])

        return client_token_decode

    except Exception as e:
        # call refeshToken
        if str(e) == 'Token hết hạn':
            raise HTTPException(status_code=410)
        else:
            print(e)
            raise HTTPException(status_code=401, detail='You need log in again!!!!')

