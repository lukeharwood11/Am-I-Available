import React from 'react';
import {
    MdCalendarToday,
    MdPeople,
    MdFlashOn,
    MdSecurity,
    MdSync,
    MdInsights,
} from 'react-icons/md';
import styles from './FeaturesSection.module.css';
import { MdAutoAwesome } from 'react-icons/md';

const FeaturesSection: React.FC = () => {
    const features = [
        {
            icon: MdCalendarToday,
            title: 'Smart Calendar Integration',
            description:
                'Seamlessly connect with Google Calendar to manage your events and availability with intelligent scheduling suggestions.',
        },
        {
            icon: MdPeople,
            title: 'Relationship Management',
            description:
                'Build and maintain meaningful connections with friends, family, and colleagues through our intuitive relationship tracking system.',
        },
        {
            icon: MdFlashOn,
            title: 'Quick Event Requests',
            description:
                'Send and receive event invitations effortlessly with our streamlined request system that keeps everyone in the loop.',
        },
        {
            icon: MdSecurity,
            title: 'Privacy First',
            description:
                'Your data is protected with enterprise-grade security. Control who sees what and when with granular privacy settings.',
        },
        {
            icon: MdSync,
            title: 'Cross-Platform Sync',
            description:
                'Access your calendar and relationships from any device. Changes sync instantly across all your platforms.',
        },
        {
            icon: MdInsights,
            title: 'Intelligent Insights',
            description:
                'Get personalized recommendations and insights about your relationships and scheduling patterns to optimize your time.',
        },
    ];

    return (
        <section id='features' className={styles.features}>
            <div className={styles.featuresContent}>
                <div className={styles.sectionHeader}>
                    <div className={styles.badge}>
                        <span className={styles.badgeIcon}>
                            <MdAutoAwesome />
                        </span>
                        Why Choose Amia
                    </div>
                    <h2 className={styles.title}>
                        Powerful features for{' '}
                        <span className={styles.highlight}>
                            modern relationships
                        </span>
                    </h2>
                    <p className={styles.subtitle}>
                        Everything you need to manage your calendar,
                        relationships, and events in one beautiful, intuitive
                        platform.
                    </p>
                </div>

                <div className={styles.featuresGrid}>
                    {features.map((feature, index) => {
                        const IconComponent = feature.icon;
                        return (
                            <div key={index} className={styles.featureCard}>
                                <IconComponent className={styles.featureIcon} />
                                <h3 className={styles.featureTitle}>
                                    {feature.title}
                                </h3>
                                <p className={styles.featureDescription}>
                                    {feature.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default FeaturesSection;
