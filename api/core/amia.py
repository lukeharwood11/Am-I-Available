from autogen_agentchat.agents import AssistantAgent
from autogen_ext.models.openai import OpenAIChatCompletionClient
from api.settings.config import config

model_client = OpenAIChatCompletionClient(
    model="gpt-4o",
    api_key=config.openai.api_key,
)

async def get_calendar_events() -> list[dict]:
    """Get the calendar events for the current week."""
    return [
        {
            "summary": "Meeting with John Doe",
            "start": "2025-01-01 10:00:00",
            "end": "2025-01-01 11:00:00",
            "location": "123 Main St, Anytown, USA"
        },
        {
            "summary": "Meeting with Jane Doe",
            "start": "2025-01-01 12:00:00",
            "end": "2025-01-01 13:00:00",
            "location": "123 Main St, Anytown, USA"
        }
    ]


async def get_amia_agent() -> AssistantAgent:
    agent = AssistantAgent(
        name="amia_agent",
        model_client=model_client,
        tools=[get_calendar_events],
        system_message="You are a calendar assistant that can help with scheduling events.",
        reflect_on_tool_use=True,
        model_client_stream=True,  # Enable streaming tokens from the model client.
        max_tool_iterations=5
    )
    return agent
    