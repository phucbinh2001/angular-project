FROM python:3.9.0-buster
RUN mkdir -p /srv/elsa
WORKDIR /srv/elsa
COPY . .
RUN ls -la
RUN apt-get update
RUN apt-get install -y  --no-install-recommends --no-install-suggests gcc autoconf libc6-dev curl libssl-dev libffi-dev
RUN pip install --upgrade pip
RUN pip install .

CMD ["uvicorn", "main:app","--host=0.0.0.0","--reload"]