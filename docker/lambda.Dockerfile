FROM python:3.12-slim-trixie AS builder
WORKDIR /app 

COPY --from=ghcr.io/astral-sh/uv:latest /uv /uvx /bin/

COPY uv.lock .
COPY pyproject.toml .

RUN uv sync --locked

# create a new stage for our lambda runtime image
FROM public.ecr.aws/lambda/python:3.12

# copy the api directory to /var/task
COPY ./api ${LAMBDA_TASK_ROOT}/api

COPY --from=builder /app/.venv .venv

# set the .venv as the python path
ENV PATH=/app/.venv/bin:$PATH

# Use the full module path
CMD ["api.main.handler"]
