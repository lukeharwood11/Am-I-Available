import { useNavigate } from 'react-router-dom';
import styles from './home.page.module.css';
import Card from '../../components/card/Card';
import { MdOutlineCalendarMonth, MdOutlineNewspaper } from 'react-icons/md';
import { useAppSelector } from '../../redux/hooks';
import { selectAuthState } from '../../redux';

const HomePage = () => {
    const navigate = useNavigate();
    const user = useAppSelector((state) => state.auth.session?.user);
    
    const menuOptions = [
        {
            title: 'Request Availability',
            description: 'Request availability for a specific date and time',
            icon: <MdOutlineCalendarMonth size={48} />,
            color: 'green',
            onClick: () => {}
        },
        {
            title: 'Manage Requests',
            description: 'Create and edit your favorite requests',
            icon: <MdOutlineNewspaper size={48} />,
            color: 'pink',
            onClick: () => {}
        },
    ];

    return (
        <div className={styles.homePage}>
            <div className={styles.container}>
                <h1 className={styles.title}>Am I Available?</h1>
                <p className={styles.subtitle}>Welcome {user ? user.user_metadata.name : 'Friend'}!</p>
                
                <div className={styles.menuGrid}>
                    {menuOptions.map((option, index) => (
                        <Card
                            key={index}
                            variant="elevated"
                            padding="large"
                            onClick={option.onClick}
                            hoverable
                            className={`${styles.menuCard} ${styles[option.color]}`}
                        >
                            <div className={styles.cardContent}>
                                <div className={styles.iconContainer}>
                                    {option.icon}
                                </div>
                                <h3 className={styles.cardTitle}>{option.title}</h3>
                                <p className={styles.cardDescription}>{option.description}</p>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HomePage;