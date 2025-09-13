import { useNavigate } from 'react-router-dom';
import styles from './home.page.module.css';
import Card from '../../components/card/Card';
import { useAppSelector } from '../../redux/hooks';
import { Button } from '../../components';
import { MdAdd } from 'react-icons/md';

const HomePage = () => {
    const navigate = useNavigate();
    const user = useAppSelector((state) => state.auth.session?.user);
    
    return (
        <div className={styles.homePage}>
            <div className={styles.container}>
                <h1 className={styles.title}>Am I Available?</h1>
                <p className={styles.subtitle}>Welcome {user ? user.user_metadata.name : 'Friend'}!</p>
                <div className={styles.requestsHeader}>
                    <h2 className={styles.requestsTitle}>Requests</h2>
                    <Button leftIcon={<MdAdd />}>Create Request</Button>
                </div>
                <Card>
                    <p className={styles.requestsDescription}></p>
                    <div className={styles.requestsContent}>Create Requests</div>
                </Card>
                
            </div>
        </div>
    );
};

export default HomePage;