import { Text } from '../../../components';
import { MdDescription } from 'react-icons/md';
import Card from '../../../components/card/Card';
import styles from './PendingDraftsSection.module.css';

interface Draft {
  id: string;
  title: string;
  status: string;
}

const PendingDraftsSection = () => {
  // const drafts: Draft[] = [
  //   {
  //     id: '1',
  //     title: 'Weekend Trip Planning',
  //     status: 'AM/A is coordinating with 4 people'
  //   },
  //   {
  //     id: '2',
  //     title: 'Monthly Book Club',
  //     status: 'Finding optimal time for 6 members'
  //   }
  // ];

  const drafts: Draft[] = [];

  return (
    <Card contentClassName={styles.card}>
      <div className={styles.sectionTitle}>
        <MdDescription />
        <Text variant="heading-small">Pending Drafts</Text>
      </div>
      <div className={styles.drafts}>
        {drafts.map((draft) => (
          <div key={draft.id} className={styles.draftItem}>
            <Text variant="body">{draft.title}</Text>
            <Text variant="caption">{draft.status}</Text>
          </div>
        ))}
        {
            drafts.length === 0 && (
                <Text variant="caption">No pending drafts</Text>
            )
        }
      </div>
    </Card>
  );
};

export default PendingDraftsSection;
