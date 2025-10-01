import React from 'react';
import { Card, Text } from '../../components';
import styles from './legal-pages.module.css';

const PrivacyPolicyPage: React.FC = () => {
    return (
        <div className={styles.legalPage}>
            <div className={styles.container}>
                <Card
                    variant='elevated'
                    padding='large'
                    className={styles.contentCard}
                >
                    <div className={styles.header}>
                        <Text
                            variant='heading-large'
                            color='grey-800'
                            className={styles.title}
                        >
                            Privacy Policy
                        </Text>
                        <Text
                            variant='body'
                            color='grey-600'
                            className={styles.lastUpdated}
                        >
                            Last updated: <u>September 30, 2025</u>
                        </Text>
                    </div>

                    <div className={styles.content}>
                        <section className={styles.section}>
                            <Text
                                variant='heading'
                                color='grey-800'
                                className={styles.sectionTitle}
                            >
                                1. Information We Collect
                            </Text>
                            <Text variant='body' color='grey-700'>
                                We collect information you provide directly to
                                us, such as when you create an account, use our
                                services, or contact us for support.
                            </Text>

                            <Text
                                variant='heading-small'
                                color='primary'
                                className={styles.subsectionTitle}
                            >
                                Personal Information
                            </Text>
                            <ul className={styles.list}>
                                <li>Name and email address</li>
                                <li>Profile information and preferences</li>
                                <li>Event and calendar data</li>
                                <li>Communication preferences</li>
                            </ul>

                            <Text
                                variant='heading-small'
                                color='primary'
                                className={styles.subsectionTitle}
                            >
                                Usage Information
                            </Text>
                            <ul className={styles.list}>
                                <li>Log data and analytics</li>
                                <li>Device information and IP addresses</li>
                                <li>Cookies and similar technologies</li>
                                <li>Usage patterns and preferences</li>
                            </ul>
                        </section>

                        <section className={styles.section}>
                            <h2 className={styles.sectionTitle}>
                                2. How We Use Your Information
                            </h2>
                            <p>We use the information we collect to:</p>
                            <ul className={styles.list}>
                                <li>
                                    Provide, maintain, and improve our services
                                </li>
                                <li>
                                    Process transactions and send related
                                    information
                                </li>
                                <li>
                                    Send technical notices, updates, and support
                                    messages
                                </li>
                                <li>Respond to your comments and questions</li>
                                <li>Monitor and analyze trends and usage</li>
                                <li>Personalize your experience</li>
                            </ul>
                        </section>

                        <section className={styles.section}>
                            <h2 className={styles.sectionTitle}>
                                3. Information Sharing and Disclosure
                            </h2>
                            <p>
                                We do not sell, trade, or otherwise transfer
                                your personal information to third parties
                                without your consent, except in the following
                                circumstances:
                            </p>
                            <ul className={styles.list}>
                                <li>With your explicit consent</li>
                                <li>To comply with legal obligations</li>
                                <li>To protect our rights and prevent fraud</li>
                                <li>
                                    With service providers who assist in our
                                    operations
                                </li>
                                <li>
                                    In connection with a business transfer or
                                    acquisition
                                </li>
                            </ul>
                        </section>

                        <section className={styles.section}>
                            <h2 className={styles.sectionTitle}>
                                4. Data Security
                            </h2>
                            <p>
                                We implement appropriate technical and
                                organizational measures to protect your personal
                                information against unauthorized access,
                                alteration, disclosure, or destruction. However,
                                no method of transmission over the internet or
                                electronic storage is 100% secure.
                            </p>
                        </section>

                        <section className={styles.section}>
                            <h2 className={styles.sectionTitle}>
                                5. Data Retention
                            </h2>
                            <p>
                                We retain your personal information for as long
                                as necessary to provide our services and fulfill
                                the purposes outlined in this Privacy Policy,
                                unless a longer retention period is required or
                                permitted by law.
                            </p>
                        </section>

                        <section className={styles.section}>
                            <h2 className={styles.sectionTitle}>
                                6. Your Rights and Choices
                            </h2>
                            <p>You have the right to:</p>
                            <ul className={styles.list}>
                                <li>
                                    Access and update your personal information
                                </li>
                                <li>Delete your account and associated data</li>
                                <li>Opt out of certain communications</li>
                                <li>Request a copy of your data</li>
                                <li>Object to certain processing activities</li>
                            </ul>
                        </section>

                        <section className={styles.section}>
                            <h2 className={styles.sectionTitle}>
                                7. Cookies and Tracking Technologies
                            </h2>
                            <p>
                                We use cookies and similar tracking technologies
                                to enhance your experience, analyze usage
                                patterns, and provide personalized content. You
                                can control cookie settings through your browser
                                preferences.
                            </p>
                        </section>

                        <section className={styles.section}>
                            <h2 className={styles.sectionTitle}>
                                8. Third-Party Services
                            </h2>
                            <p>
                                Our service may contain links to third-party
                                websites or services. We are not responsible for
                                the privacy practices of these third parties. We
                                encourage you to review their privacy policies.
                            </p>
                        </section>

                        <section className={styles.section}>
                            <h2 className={styles.sectionTitle}>
                                9. International Data Transfers
                            </h2>
                            <p>
                                Your information may be transferred to and
                                processed in countries other than your own. We
                                ensure appropriate safeguards are in place to
                                protect your personal information in accordance
                                with this Privacy Policy.
                            </p>
                        </section>

                        <section className={styles.section}>
                            <h2 className={styles.sectionTitle}>
                                10. Children's Privacy
                            </h2>
                            <p>
                                Our service is not intended for children under{' '}
                                <u>13 years of age</u>. We do not knowingly
                                collect personal information from children under
                                this age.
                            </p>
                        </section>

                        <section className={styles.section}>
                            <h2 className={styles.sectionTitle}>
                                11. Changes to This Privacy Policy
                            </h2>
                            <p>
                                We may update this Privacy Policy from time to
                                time. We will notify you of any changes by
                                posting the new Privacy Policy on this page and
                                updating the "Last updated" date.
                            </p>
                        </section>

                        <section className={styles.section}>
                            <h2 className={styles.sectionTitle}>
                                12. Contact Us
                            </h2>
                            <p>
                                If you have any questions about this Privacy
                                Policy, please contact us at:
                            </p>
                            <div className={styles.contactInfo}>
                                <p>
                                    <strong>Email:</strong>{' '}
                                    <u>privacy@amiavailable.com</u>
                                </p>
                                <p>
                                    <strong>Address:</strong>{' '}
                                    <u>Will Update Soon</u>
                                </p>
                                {/* <p><strong>Data Protection Officer:</strong> <u>dpo@amiavailable.com</u></p> */}
                            </div>
                        </section>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default PrivacyPolicyPage;
