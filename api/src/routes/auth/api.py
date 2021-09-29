from src.routes.auth.auth import basic_login, logout, register_email_account
from src.utils.errors import DUPLICATED_ACCOUNT, INVALID_CREDENTIAL, INVALID_EMAIL_OR_PASSWORD
from fastapi.exceptions import HTTPException
from src.utils.enviroment import USER_SERVER
from src.routes.auth.validator import require_captcha, require_token_lite
from fastapi.param_functions import Depends
from .io import LoginInput, RegisterInput
from fastapi import APIRouter, status
import logging

authRoute = APIRouter(
    prefix="/auth", tags=['Auth']
)


@authRoute.post("/login")
async def login(params: LoginInput, captcha: str = Depends(require_captcha)):
    response = await basic_login(params.email, params.password)

    if response.status_code == 404:
        raise HTTPException(status.HTTP_400_BAD_REQUEST,
                            detail=INVALID_CREDENTIAL)

    data = response.json()
    return data


@authRoute.post("/register")
async def register(params: RegisterInput, captcha: str = Depends(require_captcha)):
    response = await register_email_account(params.email, params.password)

    if response.status_code == 409:
        raise HTTPException(status.HTTP_400_BAD_REQUEST,
                            detail=DUPLICATED_ACCOUNT)

    if response.status_code >= 400:
        raise HTTPException(status.HTTP_400_BAD_REQUEST,
                            detail=INVALID_EMAIL_OR_PASSWORD)

    data = response.json()
    return {
        "user_id": data.get('user_id')
    }


@authRoute.post("/logout")
async def register(access_token: str = Depends(require_token_lite)):
    await logout(access_token)
    return {
        "success": True
    }
