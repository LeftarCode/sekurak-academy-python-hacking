FROM python:3.10-alpine

WORKDIR /app
COPY . .
RUN \
    apk add postgresql-libs && \
    apk add --virtual .build-deps gcc musl-dev postgresql-dev && \
    pip3 install -r requirements.txt


CMD flask db upgrade && flask --app app run --host=0.0.0.0