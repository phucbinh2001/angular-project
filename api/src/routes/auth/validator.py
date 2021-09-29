import logging
from src.utils.errors import INVALID_TOKEN
from src.utils.enviroment import G_CAPTCHA_KEY, G_CAPTCHA_URL
from typing import Optional
from fastapi.param_functions import Header
from fastapi import HTTPException, status
import requests


def require_captcha(g_captcha: Optional[str] = Header(None)):
    try:
        response = requests.post(G_CAPTCHA_URL, data={
            'secret': G_CAPTCHA_KEY,
            'response': g_captcha
        })

        data = response.json()

        if not data.get('success'):
            raise HTTPException(status.HTTP_403_FORBIDDEN,
                                detail=INVALID_TOKEN)

        return True

    except Exception as e:
        logging.error(f"Cannot decrypt token: {e}")
        raise HTTPException(status.HTTP_403_FORBIDDEN,
                            detail=INVALID_TOKEN)


def require_token_lite(access_token: Optional[str] = Header(None)):
    if (not access_token):
        raise HTTPException(status.HTTP_403_FORBIDDEN,
                            detail=INVALID_TOKEN)

    return access_token
