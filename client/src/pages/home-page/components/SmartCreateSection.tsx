import { Button, Text } from '../../../components';
import { MdAutoAwesome } from 'react-icons/md';
import Card from '../../../components/card/Card';
import styles from './SmartCreateSection.module.css';
import Pill from '../../../components/pill';

interface SmartCreateSectionProps {
  onSmartCreate: () => void;
}

const SmartCreateSection = ({ onSmartCreate }: SmartCreateSectionProps) => {
  return (
    <Card contentClassName={styles.smartCreate}>
      <Text className={styles.title} variant="heading-small">
        <Pill color="primary" variant="outlined" size="medium">Beta</Pill>
        Smart Create with AM/A</Text>
      <Button
        variant="primary"
        leftIcon={<MdAutoAwesome />}
        onClick={onSmartCreate}
        disabled={true}
      >
        Coming Soon
      </Button>
    </Card>
  );
};

export default SmartCreateSection;
