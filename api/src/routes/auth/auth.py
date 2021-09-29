import json
from src.utils.enviroment import USER_SERVER
import requests


async def basic_login(email: str, password: str):
    url = f"{USER_SERVER}/api/v1/account/login"
    response = requests.post(url, data=json.dumps({
        'email': email,
        'password': password
    }))

    return response


async def register_email_account(email: str, password: str):
    url = f"{USER_SERVER}/api/v1/account"
    response = requests.post(url, data=json.dumps({
        'email': email,
        'password': password
    }))

    return response


async def logout(access_token: str):
    url = f"{USER_SERVER}/api/v1/account/logout"
    response = requests.get(url, headers={
        'x-session-token': access_token
    })

    return response
