from fastapi import APIRouter
from .auth.api import authRoute

apiRoute = APIRouter(
    prefix="/api"
)

apiRoute.include_router(authRoute)
