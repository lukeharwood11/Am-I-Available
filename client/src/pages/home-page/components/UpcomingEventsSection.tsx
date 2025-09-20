import { Text } from '../../../components';
import { MdCalendarToday } from 'react-icons/md';
import Card from '../../../components/card/Card';
import styles from './UpcomingEventsSection.module.css';

interface EventItem {
  id: string;
  time: string;
  title: string;
  attendees: string;
}

interface UpcomingEventsSectionProps {
  events: EventItem[];
}

const UpcomingEventsSection = ({ events }: UpcomingEventsSectionProps) => {
//   const mockEvents: EventItem[] = [
//     {
//       id: '1',
//       time: 'Today, 2:00 PM',
//       title: 'Team Standup',
//       attendees: 'With Sarah, Mike, Alex'
//     },
//     {
//       id: '2',
//       time: 'Tomorrow, 6:30 PM',
//       title: 'Dinner with Emma',
//       attendees: 'Pending approval'
//     },
//     {
//       id: '3',
//       time: 'Friday, 11:00 AM',
//       title: 'Project Review',
//       attendees: 'With Lisa, Tom'
//     },
//     {
//       id: '4',
//       time: 'Saturday, 10:00 AM',
//       title: 'Weekend Hike',
//       attendees: 'With Adventure Club'
//     }
//   ];


  return (
    <Card contentClassName={styles.card}>
      <div className={styles.sectionTitle}>
        <MdCalendarToday />
        <Text variant="heading-small">Upcoming Events</Text>
      </div>
      <div className={styles.eventsList}>
        {events.map((event) => (
          <div key={event.id} className={styles.eventItem}>
            <Text variant="caption">{event.time}</Text>
            <Text variant="body">{event.title}</Text>
            <Text variant="caption">{event.attendees}</Text>
          </div>
        ))}
        {
            events.length === 0 && (
                <Text variant="caption">No upcoming events</Text>
            )
        }
      </div>
    </Card>
  );
};

export default UpcomingEventsSection;
