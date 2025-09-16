# create a new stage for our lambda runtime image
FROM public.ecr.aws/lambda/python:3.12

# install uv
curl -LsSf https://astral.sh/uv/install.sh | sh

# copy the api directory to /var/task
COPY ./api ${LAMBDA_TASK_ROOT}/api

# install our dependencies
uv sync --group production

# Use the full module path
CMD ["api.main.handler"]
