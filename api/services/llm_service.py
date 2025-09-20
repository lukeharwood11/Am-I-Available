import openai
from api.settings.config import config
from api.models.v1.event_requests import CreateEventRequestRequest

openai_client = openai.AsyncOpenAI(api_key=config.openai.api_key)


class LLMService:

    def __init__(self):
        self.openai_client: openai.AsyncOpenAI = openai_client

    async def smart_parse_event_request(
        self, request: CreateEventRequestRequest, context: str
    ) -> CreateEventRequestRequest:
        prompt = f"""<context>{context}</context>
        <request>{request.model_dump_json()}</request>
        <additional_instructions>
Use the context to help you parse the request into the required format, filling out the other fields based on the contents of the request. (fields might be in the wrong place)</additional_instructions>
If the user asks you to "ask someone" / "run it by someone", add that user to the approvers list (with required set to true)
If the user asks you to notify someone, add that user to the approvers list (with required set to false)
Use your discretion to determine whether the user is asking you to notify someone or ask them for permission / run it by someone.
"""
        response = await self.openai_client.beta.chat.completions.parse(
            model="gpt-5-mini",
            messages=[
                {
                    "role": "system",
                    "content": "You are a helpful assistant that can parse event requests.",
                },
                {"role": "user", "content": prompt},
            ],
            response_format=CreateEventRequestRequest,
        )
        return response.choices[0].message.parsed
