import { Text } from '../../../components';
import { MdLightbulb } from 'react-icons/md';
import Card from '../../../components/card/Card';
import styles from './SuggestionsSection.module.css';

interface Suggestion {
    id: string;
    icon: React.ReactNode;
    title: string;
    description: string;
}

const SuggestionsSection = () => {
    //   const suggestions: Suggestion[] = [
    //     {
    //       id: '1',
    //       icon: <MdAccessTime />,
    //       title: 'Optimize your week',
    //       description: 'You have 3 back-to-back meetings on Tuesday'
    //     },
    //     {
    //       id: '2',
    //       icon: <MdPersonAdd />,
    //       title: 'Follow up with Tom',
    //       description: "Haven't scheduled that coffee in 2 weeks"
    //     },
    //     {
    //       id: '3',
    //       icon: <MdEventBusy />,
    //       title: 'Free up Friday',
    //       description: 'Cancel or reschedule non-essential meetings'
    //     }
    //   ];
    const suggestions: Suggestion[] = [];

    return (
        <Card contentClassName={styles.card}>
            <div className={styles.sectionTitle}>
                <MdLightbulb />
                <Text variant='heading-small'>AM/A Suggestions</Text>
            </div>
            <div className={styles.suggestions}>
                {suggestions.map(suggestion => (
                    <div key={suggestion.id} className={styles.suggestionItem}>
                        {suggestion.icon}
                        <div className={styles.suggestionContent}>
                            <Text variant='body'>{suggestion.title}</Text>
                            <Text variant='caption'>
                                {suggestion.description}
                            </Text>
                        </div>
                    </div>
                ))}
                {suggestions.length === 0 && (
                    <Text variant='caption'>No suggestions, well done!</Text>
                )}
            </div>
        </Card>
    );
};

export default SuggestionsSection;
