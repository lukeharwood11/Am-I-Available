import React from 'react';
import { Card } from '../../components';
import styles from './legal-pages.module.css';

const CookiePolicyPage: React.FC = () => {
    return (
        <div className={styles.legalPage}>
            <div className={styles.container}>
                <Card
                    variant='elevated'
                    padding='large'
                    className={styles.contentCard}
                >
                    <div className={styles.header}>
                        <h1 className={styles.title}>Cookie Policy</h1>
                        <p className={styles.lastUpdated}>
                            Last updated: <u>September 30, 2025</u>
                        </p>
                    </div>

                    <div className={styles.content}>
                        <section className={styles.section}>
                            <h2 className={styles.sectionTitle}>
                                1. What Are Cookies
                            </h2>
                            <p>
                                Cookies are small text files that are stored on
                                your device when you visit our website. They
                                help us provide you with a better experience by
                                remembering your preferences and enabling
                                certain functionality.
                            </p>
                        </section>

                        <section className={styles.section}>
                            <h2 className={styles.sectionTitle}>
                                2. How We Use Cookies
                            </h2>
                            <p>We use cookies for several purposes:</p>

                            <h3 className={styles.subsectionTitle}>
                                Essential Cookies
                            </h3>
                            <p>
                                These cookies are necessary for the website to
                                function properly. They enable basic functions
                                like page navigation, access to secure areas,
                                and authentication.
                            </p>
                            <ul className={styles.list}>
                                <li>Session management</li>
                                <li>User authentication</li>
                                <li>Security features</li>
                                <li>Load balancing</li>
                            </ul>

                            <h3 className={styles.subsectionTitle}>
                                Analytics Cookies
                            </h3>
                            <p>
                                These cookies help us understand how visitors
                                interact with our website by collecting and
                                reporting information anonymously.
                            </p>
                            <ul className={styles.list}>
                                <li>Page views and user interactions</li>
                                <li>Traffic sources and referral data</li>
                                <li>Performance metrics</li>
                                <li>User journey analysis</li>
                            </ul>

                            <h3 className={styles.subsectionTitle}>
                                Functional Cookies
                            </h3>
                            <p>
                                These cookies enable enhanced functionality and
                                personalization, such as remembering your
                                preferences and settings.
                            </p>
                            <ul className={styles.list}>
                                <li>Language preferences</li>
                                <li>Theme settings</li>
                                <li>User interface customizations</li>
                                <li>Form data retention</li>
                            </ul>

                            <h3 className={styles.subsectionTitle}>
                                Marketing Cookies
                            </h3>
                            <p>
                                These cookies are used to track visitors across
                                websites to display relevant and engaging
                                advertisements.
                            </p>
                            <ul className={styles.list}>
                                <li>Ad targeting and personalization</li>
                                <li>Campaign effectiveness measurement</li>
                                <li>Cross-site tracking</li>
                                <li>Remarketing activities</li>
                            </ul>
                        </section>

                        <section className={styles.section}>
                            <h2 className={styles.sectionTitle}>
                                3. Third-Party Cookies
                            </h2>
                            <p>
                                We may use third-party services that set their
                                own cookies. These include:
                            </p>
                            <ul className={styles.list}>
                                <li>
                                    <strong>Analytics providers:</strong>{' '}
                                    <u>Google Analytics, Mixpanel</u>
                                </li>
                                <li>
                                    <strong>Authentication services:</strong>{' '}
                                    <u>Supabase, Auth0</u>
                                </li>
                                <li>
                                    <strong>Content delivery networks:</strong>{' '}
                                    <u>Cloudflare, AWS CloudFront</u>
                                </li>
                                <li>
                                    <strong>Social media platforms:</strong>{' '}
                                    <u>Facebook, Twitter, LinkedIn</u>
                                </li>
                            </ul>
                        </section>

                        <section className={styles.section}>
                            <h2 className={styles.sectionTitle}>
                                4. Cookie Duration
                            </h2>
                            <p>Cookies can be classified by their duration:</p>

                            <h3 className={styles.subsectionTitle}>
                                Session Cookies
                            </h3>
                            <p>
                                These are temporary cookies that expire when you
                                close your browser. They are essential for the
                                website's functionality during your visit.
                            </p>

                            <h3 className={styles.subsectionTitle}>
                                Persistent Cookies
                            </h3>
                            <p>
                                These cookies remain on your device for a set
                                period or until you delete them. They remember
                                your preferences across multiple visits.
                            </p>
                        </section>

                        <section className={styles.section}>
                            <h2 className={styles.sectionTitle}>
                                5. Managing Cookies
                            </h2>
                            <p>
                                You have several options for managing cookies:
                            </p>

                            <h3 className={styles.subsectionTitle}>
                                Browser Settings
                            </h3>
                            <p>
                                Most browsers allow you to control cookies
                                through their settings. You can:
                            </p>
                            <ul className={styles.list}>
                                <li>Block all cookies</li>
                                <li>Allow only first-party cookies</li>
                                <li>Delete existing cookies</li>
                                <li>Set up notifications for new cookies</li>
                            </ul>

                            <h3 className={styles.subsectionTitle}>
                                Cookie Consent
                            </h3>
                            <p>
                                When you first visit our website, you'll see a
                                cookie consent banner where you can choose which
                                types of cookies to accept.
                            </p>

                            <h3 className={styles.subsectionTitle}>
                                Opt-Out Tools
                            </h3>
                            <p>
                                For certain advertising cookies, you can use
                                industry opt-out tools:
                            </p>
                            <ul className={styles.list}>
                                <li>
                                    <u>Digital Advertising Alliance (DAA)</u>
                                </li>
                                <li>
                                    <u>Network Advertising Initiative (NAI)</u>
                                </li>
                                <li>
                                    <u>
                                        European Interactive Digital Advertising
                                        Alliance (EDAA)
                                    </u>
                                </li>
                            </ul>
                        </section>

                        <section className={styles.section}>
                            <h2 className={styles.sectionTitle}>
                                6. Impact of Disabling Cookies
                            </h2>
                            <p>
                                If you choose to disable cookies, some features
                                of our website may not function properly:
                            </p>
                            <ul className={styles.list}>
                                <li>You may need to log in repeatedly</li>
                                <li>Your preferences may not be saved</li>
                                <li>Some interactive features may not work</li>
                                <li>
                                    Personalized content may not be available
                                </li>
                            </ul>
                        </section>

                        <section className={styles.section}>
                            <h2 className={styles.sectionTitle}>
                                7. Updates to This Policy
                            </h2>
                            <p>
                                We may update this Cookie Policy from time to
                                time to reflect changes in our practices or for
                                other operational, legal, or regulatory reasons.
                            </p>
                        </section>

                        <section className={styles.section}>
                            <h2 className={styles.sectionTitle}>
                                8. Contact Us
                            </h2>
                            <p>
                                If you have any questions about our use of
                                cookies, please contact us at:
                            </p>
                            <div className={styles.contactInfo}>
                                <p>
                                    <strong>Email:</strong> Will Update Soon
                                </p>
                                <p>
                                    <strong>Address:</strong> Will Update Soon
                                </p>
                            </div>
                        </section>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default CookiePolicyPage;
