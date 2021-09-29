pipenv --python 3.9
pipenv run pip install --upgrade pip
pipenv run pip install .
pipenv run uvicorn main:app --reload --host=0.0.0.0 --port=8000