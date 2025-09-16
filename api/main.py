from fastapi import FastAPI, APIRouter, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2AuthorizationCodeBearer
from fastapi.templating import Jinja2Templates
from fastapi import Request
from .settings.config import config
from .routers.v1 import v1_router
import api.settings.auth as auth
from api.settings.config import config
from mangum import Mangum

import logging

logging.basicConfig(level=logging.INFO)
log = logging.getLogger(__name__)
log.info("Starting AmIA API...")

app = FastAPI(
    title="AmIA API",
    description="A comprehensive recipe and meal planning API",
    version="1.0.0",
    openapi_tags=[],
    swagger_ui_init_oauth={
        "clientId": config.google.client_id,
        "scopes": "email profile openid https://www.googleapis.com/auth/gmail.modify https://www.googleapis.com/auth/calendar",
    },
)

outh2_scheme = OAuth2AuthorizationCodeBearer(
    authorizationUrl=f"{config.supabase.url}/auth/v1/authorize?provider=google",
    tokenUrl=f"{config.supabase.url}/auth/v1/token",
    scopes={
        "openid": "OpenID",
        "email": "Email",
        "profile": "Profile",
        "https://www.googleapis.com/auth/gmail.modify": "Gmail Modify",
        "https://www.googleapis.com/auth/calendar": "Calendar",
    },
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Configure this properly for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(v1_router)


@app.get("/")
async def root():
    return {"message": "Welcome to AmIA API"}


auth_templates = Jinja2Templates(directory="api/api_files")


# static serve api_files/get_token.html
@app.get("/auth")
async def get_token(request: Request):
    return auth_templates.TemplateResponse(
        "get_token.html",
        {
            "request": request,
            "supabase_url": config.supabase.url,
            "supabase_anon_key": config.supabase.anon_key,
        },
    )


@app.get("/health")
async def health():
    return {"status": "healthy"}


handler = Mangum(app, lifespan="off")