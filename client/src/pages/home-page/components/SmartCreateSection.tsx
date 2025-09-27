import { Card, Pill, Button, Input, Text } from '../../../components';
import { MdArrowForward, MdAutoAwesome } from 'react-icons/md';
import styles from './SmartCreateSection.module.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

interface SmartCreateSectionProps {
    onSmartCreate: () => void;
}

const SmartCreateSection = ({ onSmartCreate }: SmartCreateSectionProps) => {
    const navigate = useNavigate();
    const [inputValue, setInputValue] = useState('');

    const handleSmartCreate = (input: string) => {
        const queryParams = new URLSearchParams();
        queryParams.set('message', input);
        navigate(`/chat?${queryParams.toString()}`);
    }
    return (
        <Card contentClassName={styles.smartCreate}>
            <Text className={styles.title} variant='heading-small'>
                <Pill color='primary' variant='outlined' size='medium'>
                    Beta
                </Pill>
                Smart Create with AMIA
                <Button rightIcon={<MdArrowForward />} variant='secondary-subtle' size='x-small' onClick={() => {
                    navigate('/chat');
                }}>
                    Go!
                </Button>
            </Text>
            <div className={styles.smartCreateHeader}>
                <Input value={inputValue} onChange={e => setInputValue(e.target.value)} placeholder='Chat with AMIA' fullWidth />
                <Button
                    variant='primary'
                    leftIcon={<MdAutoAwesome />}
                    onClick={() => handleSmartCreate(inputValue)}
                >
                    Create
                </Button>
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
