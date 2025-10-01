from autogen_agentchat.messages import BaseAgentEvent, ChatMessage
from fastapi import APIRouter
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from api.core.amia import get_amia_agent

router = APIRouter(prefix="/agent", tags=["Agent"])

class ChatMessage(BaseModel):
    role: str
    content: str

class ChatWithAmiaRequest(BaseModel):
    messages: list[ChatMessage]


@router.post("/commands/chat")
async def chat_with_amia(request: ChatWithAmiaRequest) -> StreamingResponse:
    agent = await get_amia_agent()
    _iter = agent.run_stream(task=request.messages[-1].content)
    async def streamer():
        async for event in _iter:
            if isinstance(event, BaseAgentEvent):
                if event.type == "ModelClientStreamingChunkEvent":
                    yield event.content
    return StreamingResponse(streamer(), media_type="text/event-stream", headers={"Cache-Control": "no-cache"})
