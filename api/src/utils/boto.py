import boto3
from src.utils.enviroment import AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_DB_REGION

session = boto3.Session(
    aws_access_key_id=AWS_ACCESS_KEY_ID,
    aws_secret_access_key=AWS_SECRET_ACCESS_KEY,
    region_name=AWS_DB_REGION
)

s3 = session.resource('s3')
