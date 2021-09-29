import redis
from src.utils.enviroment import REDIS_URL

cache = redis.StrictRedis.from_url(REDIS_URL, decode_responses=True)
