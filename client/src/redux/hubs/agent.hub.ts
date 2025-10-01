import { post } from './auth.hub';
import { API_ENDPOINTS, HTTP_METHODS, CONTENT_TYPES } from '../constants';
import axiosInstance from '../../lib/axios';
import { store } from '../store';
import { selectAccessToken } from '../selectors/auth.selectors';
import { ChatWithAmiaRequest } from '../types/agent.types';

// Chat with Amia using streaming
export async function chatWithAmia(
    request: ChatWithAmiaRequest,
    onChunk?: (chunk: string) => void,
    onComplete?: () => void,
    onError?: (error: Error) => void
): Promise<void> {
    try {
        // Get current access token from Redux store
        const accessToken = selectAccessToken(store.getState());

        // Prepare headers
        const requestHeaders: Record<string, string> = {
            'Content-Type': CONTENT_TYPES.JSON,
            Accept: 'text/event-stream',
            'Cache-Control': 'no-cache',
        };

        // Add authorization header if access token is available
        if (accessToken) {
            requestHeaders.Authorization = `Bearer ${accessToken}`;
        }

        const response = await fetch(
            `${axiosInstance.defaults.baseURL}${API_ENDPOINTS.AGENT_CHAT}`,
            {
                method: HTTP_METHODS.POST,
                headers: requestHeaders,
                body: JSON.stringify(request),
            }
        );

        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }

        if (!response.body) {
            throw new Error('No response body');
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();

        try {
            while (true) {
                const { done, value } = await reader.read();

                if (done) {
                    onComplete?.();
                    break;
                }

                const chunk = decoder.decode(value, { stream: true });
                onChunk?.(chunk);
            }
        } finally {
            reader.releaseLock();
        }
    } catch (error) {
        const errorObj =
            error instanceof Error ? error : new Error('Unknown error');
        onError?.(errorObj);
        throw errorObj;
    }
}

// Alternative non-streaming version for fallback
export async function chatWithAmiaSync(
    request: ChatWithAmiaRequest
): Promise<{ content: string }> {
    try {
        const response = await post<{ content: string }>(
            API_ENDPOINTS.AGENT_CHAT,
            request
        );
        return response;
    } catch (error) {
        console.error('Error chatting with Amia:', error);
        throw new Error('Failed to chat with Amia');
    }
}
