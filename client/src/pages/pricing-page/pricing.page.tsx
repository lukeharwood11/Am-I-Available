import React, { useEffect } from 'react';
import { Button, Card, Text } from '../../components';
import styles from './pricing.page.module.css';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { MdAutoAwesome } from 'react-icons/md';

const PricingPage: React.FC = () => {
    const navigate = useNavigate();
    const handleContactUs = () => {
        toast(
            _ => (
                <div className={styles.toast}>
                    <Text variant='body' color='grey-600'>
                        We're currently trialing AMIA... please check back in
                        soon or sign up for the free tier to get started.
                    </Text>
                </div>
            ),
            { duration: 10000 }
        );
    };

    const handleGetStarted = () => {
        navigate('/login');
    };

    useEffect(() => {
        // scroll to the top of the page
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className={styles.pricingPage}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <Text
                        variant='heading-large'
                        align='center'
                        className={styles.title}
                    >
                        Choose Your Plan
                    </Text>
                    <Text
                        variant='body'
                        align='center'
                        color='grey-600'
                        className={styles.subtitle}
                    >
                        Select the perfect plan for your AI scheduling needs
                    </Text>
                </div>

                <div className={styles.pricingGrid}>
                    {/* Free Tier */}
                    <Card
                        variant='outlined'
                        contentClassName={styles.pricingCard}
                    >
                        <div className={styles.cardHeader}>
                            <Text variant='heading' className={styles.tierName}>
                                Free
                            </Text>
                            <div className={styles.price}>
                                <Text
                                    variant='heading-large'
                                    className={styles.priceAmount}
                                >
                                    $0
                                </Text>
                                <Text variant='body-small' color='grey-600'>
                                    /month
                                </Text>
                            </div>
                            <Text
                                variant='body-small'
                                color='grey-600'
                                className={styles.description}
                            >
                                Perfect for dipping your toes into AI scheduling
                            </Text>
                        </div>

                        <div className={styles.features}>
                            <div className={styles.feature}>
                                <Text variant='body-small'>
                                    ✓ Basic smart features
                                </Text>
                            </div>
                            <div className={styles.feature}>
                                <Text variant='body-small'>
                                    ✓ 10 AI credits / month
                                </Text>
                            </div>
                            <div className={styles.feature}>
                                <Text variant='body-small'>
                                    ✓ 2 smart reoccurring events
                                </Text>
                            </div>
                            <div className={styles.feature}>
                                <Text variant='body-small'>
                                    ✓ Community support
                                </Text>
                            </div>
                        </div>

                        <div className={styles.cardFooter}>
                            <Button
                                variant='primary-subtle'
                                size='large'
                                fullWidth
                                onClick={handleGetStarted}
                            >
                                Get Started
                            </Button>
                        </div>
                    </Card>

                    {/* Pro Tier */}
                    <Card
                        variant='elevated'
                        contentClassName={styles.pricingCard}
                        className={styles.featured}
                    >
                        <div className={styles.badge}>
                            <MdAutoAwesome />
                            <Text variant='caption' weight='bold'>
                                BEST VALUE
                            </Text>
                        </div>
                        <div className={styles.cardHeader}>
                            <Text variant='heading' className={styles.tierName}>
                                Pro
                            </Text>
                            <div className={styles.price}>
                                <Text
                                    variant='heading-large'
                                    className={styles.priceAmount}
                                >
                                    $9
                                </Text>
                                <Text variant='body-small' color='grey-600'>
                                    /month
                                </Text>
                            </div>
                            <Text
                                variant='body-small'
                                color='grey-600'
                                className={styles.description}
                            >
                                Advanced features productive individuals
                            </Text>
                        </div>

                        <div className={styles.features}>
                            <div className={styles.feature}>
                                <Text variant='body-small'>
                                    ✓ 100 AI credits / month
                                </Text>
                            </div>
                            <div className={styles.feature}>
                                <Text variant='body-small'>
                                    ✓ Access to all smart features
                                </Text>
                            </div>
                            <div className={styles.feature}>
                                <Text variant='body-small'>
                                    ✓ Unlimited smart reoccurring events
                                </Text>
                            </div>
                            <div className={styles.feature}>
                                <Text variant='body-small'>
                                    ✓ Priority support
                                </Text>
                            </div>
                        </div>

                        <div className={styles.cardFooter}>
                            <Button
                                variant='primary'
                                size='large'
                                fullWidth
                                onClick={handleContactUs}
                            >
                                Contact Us
                            </Button>
                        </div>
                    </Card>

                    {/* Legend Tier */}
                    <Card
                        variant='outlined'
                        contentClassName={styles.pricingCard}
                    >
                        <div className={styles.cardHeader}>
                            <Text variant='heading' className={styles.tierName}>
                                Legend
                            </Text>
                            <div className={styles.price}>
                                <Text
                                    variant='heading-large'
                                    className={styles.priceAmount}
                                >
                                    Contact Us
                                </Text>
                            </div>
                            <Text
                                variant='body-small'
                                color='grey-600'
                                className={styles.description}
                            >
                                Enterprise-grade solution for large
                                organizations
                            </Text>
                        </div>

                        <div className={styles.features}>
                            <div className={styles.feature}>
                                <Text variant='body-small'>
                                    ✓ Everything in Pro
                                </Text>
                            </div>
                            <div className={styles.feature}>
                                <Text variant='body-small'>
                                    ✓ Custom integrations
                                </Text>
                            </div>
                            <div className={styles.feature}>
                                <Text variant='body-small'>
                                    ✓ Dedicated account manager
                                </Text>
                            </div>
                            <div className={styles.feature}>
                                <Text variant='body-small'>
                                    ✓ White-label options
                                </Text>
                            </div>
                            <div className={styles.feature}>
                                <Text variant='body-small'>✓ API access</Text>
                            </div>
                        </div>

                        <div className={styles.cardFooter}>
                            <Button
                                variant='alternate'
                                size='large'
                                fullWidth
                                onClick={handleContactUs}
                            >
                                Contact Us
                            </Button>
                        </div>
                    </Card>
                </div>

                <div className={styles.footer}>
                    <Text variant='body-small' align='center' color='grey-600'>
                        All plans include our core event coordination features.
                        Need a custom solution? We're here to help.
                    </Text>
                </div>
            </div>
        </div>
    );
};

export default PricingPage;
