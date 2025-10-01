import { Card, Button, Input } from '../../../components';
import { MdSend } from 'react-icons/md';
import styles from './SmartCreateSection.module.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

interface SmartCreateSectionProps {
    onSmartCreate: () => void;
}

const SmartCreateSection = (_: SmartCreateSectionProps) => {
    const navigate = useNavigate();
    const [inputValue, setInputValue] = useState('');

    const handleSmartCreate = (input: string) => {
        const queryParams = new URLSearchParams();
        queryParams.set('message', input);
        navigate(`/chat?${queryParams.toString()}`);
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSmartCreate(inputValue);
        }
    };

    return (
        <Card contentClassName={styles.smartCreate}>
            <div className={styles.smartCreateHeader}>
                <Input
                    value={inputValue}
                    onChange={e => setInputValue(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder='Chat with AMIA'
                    fullWidth
                />
                <Button
                    variant='primary'
                    leftIcon={<MdSend />}
                    onClick={() => handleSmartCreate(inputValue)}
                    disabled={inputValue.trim() === ''}
                />
            </div>
            {/* <Button
                variant='primary'
                leftIcon={<MdAutoAwesome />}
                onClick={onSmartCreate}
                disabled={true}
            >
                Coming Soon
            </Button> */}
        </Card>
    );
};

export default SmartCreateSection;
