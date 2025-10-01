import { createAsyncThunk } from '@reduxjs/toolkit';
import { chatWithAmia, chatWithAmiaSync } from '../hubs/agent.hub';
import { agentActions } from '../slices/agent.slice';
import { ChatWithAmiaRequest, ChatMessage } from '../types/agent.types';
import { ERROR_MESSAGES } from '../constants';

// Chat with Amia using streaming
export const chatWithAmiaThunk = createAsyncThunk(
    'agent/chatWithAmia',
    async (request: ChatWithAmiaRequest, { dispatch, rejectWithValue }) => {
        try {
            dispatch(agentActions.setLoading(true));
            dispatch(agentActions.setIsStreaming(true));
            dispatch(agentActions.clearError());

            // Add user message to the conversation
            const lastMessage = request.messages[request.messages.length - 1];
            if (!lastMessage) {
                throw new Error('No messages provided');
            }

            const userMessage: ChatMessage = {
                role: 'user',
                content: lastMessage.content,
                timestamp: new Date().toISOString(),
            };
            dispatch(agentActions.addMessage(userMessage));

            // Add assistant message placeholder
            const assistantMessage: ChatMessage = {
                role: 'assistant',
                content: '',
                timestamp: new Date().toISOString(),
            };

            let fullResponse = '';

            await chatWithAmia(
                request,
                (chunk: string) => {
                    // Update the last message with the new chunk
                    if (fullResponse.length === 0) {
                        dispatch(agentActions.addMessage(assistantMessage));
                    }
                    dispatch(agentActions.updateLastMessage(chunk));
                    fullResponse += chunk;
                },
                () => {
                    // Streaming completed
                    dispatch(agentActions.setIsStreaming(false));
                    dispatch(agentActions.setLoading(false));
                },
                (error: Error) => {
                    // Handle streaming error
                    dispatch(agentActions.setIsStreaming(false));
                    dispatch(agentActions.setLoading(false));
                    dispatch(agentActions.setError(error.message));
                }
            );

            return { content: fullResponse };
        } catch (error) {
            const message =
                error instanceof Error
                    ? error.message
                    : ERROR_MESSAGES.AGENT?.CHAT_FAILED ||
                      'Failed to chat with Amia';
            dispatch(agentActions.setError(message));
            dispatch(agentActions.setIsStreaming(false));
            dispatch(agentActions.setLoading(false));
            return rejectWithValue(message);
        }
    }
);

// Alternative non-streaming version
export const chatWithAmiaSyncThunk = createAsyncThunk(
    'agent/chatWithAmiaSync',
    async (request: ChatWithAmiaRequest, { dispatch, rejectWithValue }) => {
        try {
            dispatch(agentActions.setLoading(true));
            dispatch(agentActions.clearError());

            // Add user message to the conversation
            const lastMessage = request.messages[request.messages.length - 1];
            if (!lastMessage) {
                throw new Error('No messages provided');
            }

            const userMessage: ChatMessage = {
                role: 'user',
                content: lastMessage.content,
                timestamp: new Date().toISOString(),
            };
            dispatch(agentActions.addMessage(userMessage));

            const response = await chatWithAmiaSync(request);

            // Add assistant response
            const assistantMessage: ChatMessage = {
                role: 'assistant',
                content: response.content,
                timestamp: new Date().toISOString(),
            };
            dispatch(agentActions.addMessage(assistantMessage));

            dispatch(agentActions.setLoading(false));
            return response;
        } catch (error) {
            const message =
                error instanceof Error
                    ? error.message
                    : ERROR_MESSAGES.AGENT?.CHAT_FAILED ||
                      'Failed to chat with Amia';
            dispatch(agentActions.setError(message));
            dispatch(agentActions.setLoading(false));
            return rejectWithValue(message);
        }
    }
);

// Clear conversation
export const clearConversationThunk = createAsyncThunk(
    'agent/clearConversation',
    async (_, { dispatch }) => {
        dispatch(agentActions.clearMessages());
        dispatch(agentActions.clearError());
        return null;
    }
);
