from autogen_agentchat.agents import AssistantAgent
from autogen_agentchat.ui import Console
from autogen_ext.models.openai import OpenAIChatCompletionClient
from api.settings.config import config

model_client = OpenAIChatCompletionClient(
    model="gpt-4o",
    api_key=config.openai.api_key,
)

async def get_weather(city: str) -> str:
    """Get the weather for a given city."""
    return f"The weather in {city} is 73 degrees and Sunny."


agent = AssistantAgent(
    name="weather_agent",
    model_client=model_client,
    tools=[get_weather],
    system_message="You are a helpful assistant.",
    reflect_on_tool_use=True,
    model_client_stream=True,  # Enable streaming tokens from the model client.
    max_tool_iterations=5
)

# async def main() -> None:
#     await Console(agent.run_stream(task="What is the weather in New York?"))
#     # Close the connection to the model client.
#     await model_client.close()