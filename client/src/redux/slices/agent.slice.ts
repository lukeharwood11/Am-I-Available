import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AgentState, ChatMessage } from '../types/agent.types';

const initialState: AgentState = {
    messages: [],
    isStreaming: false,
    loading: false,
    error: null,
};

const agentSlice = createSlice({
    name: 'agent',
    initialState,
    reducers: {
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
        setIsStreaming: (state, action: PayloadAction<boolean>) => {
            state.isStreaming = action.payload;
        },
        addMessage: (state, action: PayloadAction<ChatMessage>) => {
            state.messages.push(action.payload);
        },
        updateLastMessage: (state, action: PayloadAction<string>) => {
            if (state.messages.length > 0) {
                const lastMessage = state.messages[state.messages.length - 1];
                if (!lastMessage) return;
                if (lastMessage.role === 'assistant') {
                    lastMessage.content += action.payload;
                }
            }
        },
        clearMessages: state => {
            state.messages = [];
        },
        clearError: state => {
            state.error = null;
        },
        resetAgent: state => {
            state.messages = [];
            state.isStreaming = false;
            state.loading = false;
            state.error = null;
        },
    },
});

export const agentActions = { ...agentSlice.actions };

export default agentSlice.reducer;
