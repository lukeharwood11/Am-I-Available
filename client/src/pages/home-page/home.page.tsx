import styles from './home.page.module.css';
import Card from '../../components/card/Card';
import { Button, Input } from '../../components';
import { MdAdd, MdSend } from 'react-icons/md';
import { CreateRequestModal } from './CreateRequestModal';
import { useState } from 'react';

const HomePage = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className={styles.homePage}>
            <div className={styles.centerContainer}>
                <div className={styles.requests}>
                    <div className={styles.requestsHeader}>
                        <h2 className={styles.requestsTitle}>Requests</h2>
                        <Button variant='primary-subtle' leftIcon={<MdAdd />} onClick={() => setIsOpen(true)}>Create Request</Button>
                    </div>
                    <Card>
                        <p className={styles.caption}>No Requests Found <MdAdd /></p>
                    </Card>
                </div>
                <div className={styles.nlpContainer}>
                    <Input fullWidth placeholder='Ask me anything...' />
                    <Button variant='primary-subtle' leftIcon={<MdSend />} onClick={() => {}}/>
                </div>
            </div>
            <CreateRequestModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
        </div>
    );
};

export default HomePage;