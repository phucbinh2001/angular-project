from src.utils.helper import env, Environment

ENVIRONMENT = Environment(
    env('ENVIRONMENT', default=Environment.development.name))

# Secret
G_CAPTCHA_KEY = env('G_CAPTCHA_KEY')

# Public
G_CAPTCHA_URL = env('G_CAPTCHA_URL')
SENTRY_URL = env('SENTRY_URL')
USER_SERVER = env('USER_SERVER')
