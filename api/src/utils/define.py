VERSION = '0.0.0'
APP_NAME = 'Elsa User Dashboard API'
with open("VERSION") as version_file:
    VERSION = version_file.read()

DATETIME_FORMAT = '%Y%m%d%H%M%S'
DATE_FORMAT = '%Y%m%d'
DOCUMENT_DEFAULT = {
    'session': 'OGHo/O0SG/hLYs0TXTitMDYAb/JXOWWsjQHOiZHnYRs7KjgxHeDznB5yWAsOvoLRlxDuc7t5xNyTWXtIuuDfvVOfma1QigfVHWndE/hatLBUeHgFpy3Syh4528C+niwYbAguRmf+gZOu6GPlB+Is+KY5K8awwi3637S+JHBf0UI+RBKp4CIys09J8RhOLZe8FHTH0maDkSduS2yZaPKc9Q=='
}
CORS_ORIGINS = ["*"]
