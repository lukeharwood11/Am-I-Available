import React from 'react';
import { Card, Text } from '../../components';
import styles from './legal-pages.module.css';

const TermsOfServicePage: React.FC = () => {
    return (
        <div className={styles.legalPage}>
            <div className={styles.container}>
                <Card variant="elevated" padding="large" className={styles.contentCard}>
                    <div className={styles.header}>
                        <Text variant="heading-large" color="grey-800" className={styles.title}>
                            Terms of Service
                        </Text>
                        <Text variant="body" color="grey-600" className={styles.lastUpdated}>
                            Last updated: <u>September 30, 2025</u>
                        </Text>
                    </div>

                    <div className={styles.content}>
                        <section className={styles.section}>
                            <Text variant="heading" color="grey-800" className={styles.sectionTitle}>
                                1. Acceptance of Terms
                            </Text>
                            <Text variant="body" color="grey-700">
                                By accessing and using Am I Available ("the Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                            </Text>
                        </section>

                        <section className={styles.section}>
                            <Text variant="heading" color="grey-800" className={styles.sectionTitle}>
                                2. Description of Service
                            </Text>
                            <Text variant="body" color="grey-700">
                                Am I Available is a platform that helps users coordinate events and manage their availability. The Service includes features for creating events, managing relationships, and facilitating communication between users.
                            </Text>
                        </section>

                        <section className={styles.section}>
                            <Text variant="heading" color="grey-800" className={styles.sectionTitle}>
                                3. User Accounts
                            </Text>
                            <Text variant="body" color="grey-700">
                                To use the Service, you must create an account. You are responsible for:
                            </Text>
                            <ul className={styles.list}>
                                <li>Providing accurate and complete information</li>
                                <li>Maintaining the security of your account credentials</li>
                                <li>All activities that occur under your account</li>
                                <li>Notifying us immediately of any unauthorized use</li>
                            </ul>
                        </section>

                        <section className={styles.section}>
                            <Text variant="heading" color="grey-800" className={styles.sectionTitle}>
                                4. User Conduct
                            </Text>
                            <Text variant="body" color="grey-700">You agree not to:</Text>
                            <ul className={styles.list}>
                                <li>Use the Service for any unlawful purpose or in violation of any applicable laws</li>
                                <li>Transmit any harmful, threatening, abusive, or harassing content</li>
                                <li>Impersonate any person or entity or misrepresent your affiliation</li>
                                <li>Attempt to gain unauthorized access to any part of the Service</li>
                                <li>Interfere with or disrupt the Service or servers connected to the Service</li>
                            </ul>
                        </section>

                        <section className={styles.section}>
                            <Text variant="heading" color="grey-800" className={styles.sectionTitle}>
                                5. Privacy and Data Protection
                            </Text>
                            <Text variant="body" color="grey-700">
                                Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the Service, to understand our practices.
                            </Text>
                        </section>

                        <section className={styles.section}>
                            <Text variant="heading" color="grey-800" className={styles.sectionTitle}>
                                6. Intellectual Property
                            </Text>
                            <Text variant="body" color="grey-700">
                                The Service and its original content, features, and functionality are and will remain the exclusive property of <u>Am I Available</u> and its licensors. The Service is protected by copyright, trademark, and other laws.
                            </Text>
                        </section>

                        <section className={styles.section}>
                            <Text variant="heading" color="grey-800" className={styles.sectionTitle}>
                                7. Termination
                            </Text>
                            <Text variant="body" color="grey-700">
                                We may terminate or suspend your account and bar access to the Service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of the Terms.
                            </Text>
                        </section>

                        <section className={styles.section}>
                            <Text variant="heading" color="grey-800" className={styles.sectionTitle}>
                                8. Disclaimer
                            </Text>
                            <Text variant="body" color="grey-700">
                                The information on this Service is provided on an "as is" basis. To the fullest extent permitted by law, <u>Am I Available</u> excludes all representations, warranties, conditions and terms relating to our Service and the use of this Service.
                            </Text>
                        </section>

                        <section className={styles.section}>
                            <Text variant="heading" color="grey-800" className={styles.sectionTitle}>
                                9. Limitation of Liability
                            </Text>
                            <Text variant="body" color="grey-700">
                                In no event shall <u>Am I Available</u>, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your use of the Service.
                            </Text>
                        </section>

                        <section className={styles.section}>
                            <Text variant="heading" color="grey-800" className={styles.sectionTitle}>
                                10. Governing Law
                            </Text>
                            <Text variant="body" color="grey-700">
                                These Terms shall be interpreted and governed by the laws of <u>Your Jurisdiction</u>, without regard to its conflict of law provisions.
                            </Text>
                        </section>

                        <section className={styles.section}>
                            <Text variant="heading" color="grey-800" className={styles.sectionTitle}>
                                11. Changes to Terms
                            </Text>
                            <Text variant="body" color="grey-700">
                                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least <u>30 days</u> notice prior to any new terms taking effect.
                            </Text>
                        </section>

                        <section className={styles.section}>
                            <Text variant="heading" color="grey-800" className={styles.sectionTitle}>
                                12. Contact Information
                            </Text>
                            <Text variant="body" color="grey-700">
                                If you have any questions about these Terms of Service, please contact us at:
                            </Text>
                            <div className={styles.contactInfo}>
                                <Text variant="body" color="grey-700"><strong>Email:</strong> Will Update Soon</Text>
                                <Text variant="body" color="grey-700"><strong>Address:</strong> Will Update Soon</Text>
                            </div>
                        </section>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default TermsOfServicePage;
