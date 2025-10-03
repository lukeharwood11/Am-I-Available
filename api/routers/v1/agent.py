from autogen_agentchat.messages import BaseAgentEvent, ChatMessage
from fastapi import APIRouter
from fastapi.responses import StreamingResponse
from pydantic import BaseModel, Field
from api.core.amia import get_amia_agent
from api.services.google_events_service import GoogleEventsService
from api.dependencies import get_google_events_service
from fastapi import Depends

router = APIRouter(prefix="/agent", tags=["Agent"])

class ChatMessage(BaseModel):
    role: str
    content: str

class ChatWithAmiaRequest(BaseModel):
    messages: list[ChatMessage]
    metdata: dict | None = Field(default_factory=dict)
    context: str | None = Field(default_factory=dict)


@router.post("/commands/chat")
async def chat_with_amia(
    request: ChatWithAmiaRequest,
    google_events_service: GoogleEventsService = Depends(get_google_events_service)
) -> StreamingResponse:
    agent = await get_amia_agent(context=request.context, metdata=request.metdata, google_events_service=google_events_service)
    _iter = agent.run_stream(task=request.messages[-1].content)
    async def streamer():
        async for event in _iter:
            if isinstance(event, BaseAgentEvent):
                if event.type == "ModelClientStreamingChunkEvent":
                    yield event.content
    return StreamingResponse(streamer(), media_type="text/event-stream", headers={"Cache-Control": "no-cache"})
