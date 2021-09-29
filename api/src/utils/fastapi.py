from sentry_asgi import SentryMiddleware
import time
import sentry_sdk
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.trustedhost import TrustedHostMiddleware
from fastapi.openapi.utils import get_openapi
from fastapi.staticfiles import StaticFiles
from sentry_sdk.integrations.aiohttp import AioHttpIntegration
from sentry_sdk.integrations.celery import CeleryIntegration
from starlette.responses import JSONResponse
from starlette_context import plugins
from starlette_context.middleware import ContextMiddleware

from src.utils.define import CORS_ORIGINS, VERSION, APP_NAME
from src.utils.enviroment import SENTRY_URL, ENVIRONMENT, Environment

# Sentry
sentry_sdk.init(
    SENTRY_URL,
    integrations=[CeleryIntegration(), AioHttpIntegration()], debug=True, release=VERSION,
    environment=ENVIRONMENT, default_integrations=False, traces_sample_rate=0.1
)

# Init api & static file
apiConfig = {}
if ENVIRONMENT == Environment.stable:
    apiConfig = {
        'redoc_url': None,
        'docs_url': None
    }
fast_api = FastAPI(openapi_tags=[], title=APP_NAME, **apiConfig)
fast_api.mount("/static", StaticFiles(directory="static"), name="static")

# Middleware
fast_api.add_middleware(SentryMiddleware)
fast_api.add_middleware(ContextMiddleware, plugins=(
    plugins.RequestIdPlugin(), plugins.CorrelationIdPlugin()))
fast_api.add_middleware(TrustedHostMiddleware, allowed_hosts=["*"])
fast_api.add_middleware(
    CORSMiddleware, allow_origins=CORS_ORIGINS, allow_credentials=True, allow_methods=["*"], allow_headers=["*"],
)


# Timing
@fast_api.middleware("http")
async def add_process_time_header(request: Request, call_next):
    start_time = time.time()
    response = await call_next(request)
    process_time = time.time() - start_time
    response.headers["X-Process-Time"] = str(process_time)
    return response


# Event start, end
@fast_api.on_event("startup")
async def startup_event():
    pass


@fast_api.on_event("shutdown")
def shutdown_event():
    pass


# Document
def custom_openapi():
    if fast_api.openapi_schema:
        return fast_api.openapi_schema

    openapi_schema = get_openapi(
        title=APP_NAME,
        description="Elsa User Dashboard API",
        version=VERSION,
        routes=fast_api.routes,
    )

    openapi_schema["info"]["logo"] = {
        "url": "https://elsaspeak.com/assets/v2/assets/images/logo.svg"}
    fast_api.openapi_schema = openapi_schema
    return fast_api.openapi_schema


fast_api.openapi = custom_openapi


@fast_api.get("/health", tags=['Metrics'])
async def health_check():
    open_api = custom_openapi()
    return JSONResponse(open_api.get('info', {}))
