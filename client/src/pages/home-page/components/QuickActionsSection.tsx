import { Text, Button } from '../../../components';
import {
    MdFlashOn,
    MdCalendarToday,
    MdCheckBox,
    MdPeople,
    MdCalendarMonth,
} from 'react-icons/md';
import Card from '../../../components/card/Card';
import styles from './QuickActionsSection.module.css';

interface QuickActionsSectionProps {
    onCreateEvent?: () => void;
    onAddTask?: () => void;
    onManageRelationships?: () => void;
    onViewCalendar?: () => void;
}

const QuickActionsSection = ({
    onCreateEvent,
    onAddTask,
    onManageRelationships,
    onViewCalendar,
}: QuickActionsSectionProps) => {
    return (
        <Card contentClassName={styles.card}>
            <div className={styles.sectionTitle}>
                <MdFlashOn />
                <Text variant='heading-small'>Quick Actions</Text>
            </div>
            <div className={styles.quickActions}>
                <Button
                    variant='secondary-subtle'
                    leftIcon={<MdCalendarToday />}
                    onClick={
                        onCreateEvent ||
                        (() => console.log('Create Event clicked'))
                    }
                >
                    Create Event
                </Button>
                <Button
                    variant='secondary-subtle'
                    leftIcon={<MdCheckBox />}
                    disabled
                    onClick={
                        onAddTask || (() => console.log('Add Task clicked'))
                    }
                >
                    Add Task
                </Button>
                <Button
                    variant='secondary-subtle'
                    leftIcon={<MdPeople />}
                    onClick={
                        onManageRelationships ||
                        (() => console.log('Manage Relationships clicked'))
                    }
                >
                    Relationships
                </Button>
                <Button
                    variant='secondary-subtle'
                    leftIcon={<MdCalendarMonth />}
                    disabled
                    onClick={
                        onViewCalendar ||
                        (() => console.log('View Calendar clicked'))
                    }
                >
                    Full Calendar
                </Button>
            </div>
        </Card>
    );
};

export default QuickActionsSection;
