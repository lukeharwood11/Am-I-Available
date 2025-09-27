import React, { useState, useRef, useEffect } from 'react';
import { Text } from '../../components';
import styles from './chat.page.module.css';
import ChatMessage from './components/ChatMessage';
import { MessageInput } from './components';
import { useSearchParams } from 'react-router';

interface Message {
    id: string;
    text: string;
    sender: 'user' | 'other';
    timestamp: Date;
}

const ChatPage: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            text: 'Hello! How can I help you today?',
            sender: 'other',
            timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
        },
    ]);

    const [searchParams, setSearchParams] = useSearchParams();
    const [inputValue, setInputValue] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const hasProcessedInitialMessage = useRef(false);

    useEffect(() => {
        const message = searchParams.get('message');
        if (message && !hasProcessedInitialMessage.current) {
            hasProcessedInitialMessage.current = true;
            handleSendMessage(message);
            setSearchParams({});
        }
    }, [searchParams, setSearchParams]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = (input: string) => {
        if (input.trim()) {
            const newMessage: Message = {
                id: Date.now().toString(),
                text: input.trim(),
                sender: 'user',
                timestamp: new Date(),
            };
            setMessages(prev => [...prev, newMessage]);
            setInputValue('');
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage(inputValue);
        }
    };

    return (
        <div className={styles.chatPage}>
            <div className={styles.chatPageMainContent}>
                <div className={styles.chatHeader}>
                    <Text variant='heading'>Chat</Text>
                </div>

                <div className={styles.messagesContainer}>
                    <div className={styles.messagesList}>
                        {messages.map(message => (
                            <ChatMessage key={message.id} message={message} />
                        ))}
                        <div ref={messagesEndRef} />
                    </div>
                </div>

                <div className={styles.inputContainer}>
                    <MessageInput
                        placeholder='Ask me anything!'
                        value={inputValue}
                        onChange={setInputValue}
                        onSend={() => handleSendMessage(inputValue)}
                        onKeyPress={handleKeyPress}
                    />
                </div>
            </div>
        </div>
    );
};

export default ChatPage;
