import { Card, Pill, Button, Input, Text } from '../../../components';
import { MdAutoAwesome } from 'react-icons/md';
import styles from './SmartCreateSection.module.css';

interface SmartCreateSectionProps {
    onSmartCreate: () => void;
}

const SmartCreateSection = ({ onSmartCreate }: SmartCreateSectionProps) => {
    return (
        <Card contentClassName={styles.smartCreate}>
            <Text className={styles.title} variant='heading-small'>
                <Pill color='primary' variant='outlined' size='medium'>
                    Beta
                </Pill>
                Smart Create with AM/A
            </Text>
            <div className={styles.smartCreateHeader}>
                <Input disabled placeholder='Chat with AM/A' fullWidth />
                <Button
                    variant='primary'
                    leftIcon={<MdAutoAwesome />}
                    onClick={onSmartCreate}
                    disabled={true}
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
