from autogen_agentchat.agents import AssistantAgent
from autogen_ext.models.openai import OpenAIChatCompletionClient
from api.settings.config import config
import api.core.calendar as calendar
from api.services.google_events_service import GoogleEventsService
from api.dependencies import get_google_events_service
from fastapi import Depends

model_client = OpenAIChatCompletionClient(
    model="gpt-4o",
    api_key=config.openai.api_key,
)

async def get_amia_agent(context: dict, metdata: dict, google_events_service: GoogleEventsService = Depends(get_google_events_service)) -> AssistantAgent:
    # TODO: inject other context (like the current user)
    tools = [
        calendar.get_current_week_events_wrapper(
            user_id="test", # TODO: inject the current user
            google_events_service=google_events_service,
        )
    ]
    agent = AssistantAgent(
        name="amia_agent",
        model_client=model_client,
        tools=tools,
        system_message="You are a calendar assistant that can help with scheduling events.",
        reflect_on_tool_use=True,
        model_client_stream=True,  # Enable streaming tokens from the model client.
        max_tool_iterations=5
    )
    return agent
    