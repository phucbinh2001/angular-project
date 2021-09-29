from src.routes.api import apiRoute
from src.utils.fastapi import fast_api

# Add router to application
fast_api.include_router(apiRoute)
