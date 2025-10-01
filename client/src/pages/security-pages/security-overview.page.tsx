import React from 'react';
import { Card, Text } from '../../components';
import styles from './security-pages.module.css';

const SecurityOverviewPage: React.FC = () => {
    return (
        <div className={styles.securityPage}>
            <div className={styles.container}>
                <Card variant="elevated" padding="large" className={styles.contentCard}>
                    <div className={styles.header}>
                        <h1 className={styles.title}>Security Overview</h1>
                        <p className={styles.subtitle}>
                            How we protect your data and ensure the security of our platform
                        </p>
                    </div>

                    <div className={styles.content}>
                        <section className={styles.section}>
                            <h2 className={styles.sectionTitle}>Our Security Commitment</h2>
                            <p>
                                At Am I Available, we take security seriously. We implement industry-standard security measures to protect your data and ensure the integrity of our platform.
                            </p>
                        </section>

                        <section className={styles.section}>
                            <h2 className={styles.sectionTitle}>Data Protection</h2>
                            
                            <h3 className={styles.subsectionTitle}>Encryption</h3>
                            <ul className={styles.list}>
                                <li><strong>Data in Transit:</strong> All data transmission is encrypted using <u>TLS 1.2</u></li>
                                <li><strong>Database Security:</strong> Database connections are secured with <u>SSL/TLS</u></li>
                                <li><strong>API Security:</strong> All API endpoints use <u>HTTPS</u> and authentication</li>
                            </ul>
                        </section>

                        <section className={styles.section}>
                            <h3 className={styles.subsectionTitle}>Monitoring and Logging</h3>
                            <Text variant="body" color="grey-700">
                                Will Update Soon
                            </Text>
                        </section>

                        <section className={styles.section}>
                            <h2 className={styles.sectionTitle}>Application Security</h2>
                            
                            <h3 className={styles.subsectionTitle}>Secure Development</h3>
                            <Text variant="body" color="grey-700">
                                Will Update Soon
                            </Text>

                            <h3 className={styles.subsectionTitle}>Authentication & Authorization</h3>
                            <ul className={styles.list}>
                                <li>OAuth 2.0 and OpenID Connect integration</li>
                                <li>JWT token-based authentication</li>
                            </ul>
                        </section>

                        <section className={styles.section}>
                            <h2 className={styles.sectionTitle}>Compliance and Certifications</h2>
                            <Text variant="body" color="grey-700">
                                Will Update Soon
                            </Text>
                        </section>

                        <section className={styles.section}>
                            <h2 className={styles.sectionTitle}>Incident Response</h2>
                            <p>
                                Will Update Soon
                            </p>
                            <Text variant="body" color="grey-700">
                                Will Update Soon
                            </Text>
                        </section>

                        <section className={styles.section}>
                            <h2 className={styles.sectionTitle}>Third-Party Security</h2>
                            <p>
                                Will Update Soon
                            </p>
                            <Text variant="body" color="grey-700">
                                Will Update Soon
                            </Text>
                        </section>

                        <section className={styles.section}>
                            <h2 className={styles.sectionTitle}>Security Best Practices for Users</h2>
                            <div className={styles.bestPractices}>
                                <h3 className={styles.subsectionTitle}>Account Security</h3>
                                <Text variant="body" color="grey-700">
                                    Will Update Soon
                                </Text>
                                <h3 className={styles.subsectionTitle}>Data Protection</h3>
                                <ul className={styles.list}>
                                    <li>Be cautious with personal information sharing</li>
                                    <li>Regularly review privacy settings</li>
                                    <li>Report suspicious activity immediately</li>
                                    <li>Keep your contact information updated</li>
                                </ul>
                            </div>
                        </section>

                        <section className={styles.section}>
                            <h2 className={styles.sectionTitle}>Reporting Security Issues</h2>
                            <p>
                                If you discover a security vulnerability, please report it to us immediately:
                            </p>
                            <div className={styles.contactInfo}>
                                <p><strong>Security Email:</strong> Will Update Soon</p>
                                <p><strong>Response Time:</strong> Will Update Soon</p>
                                <p><strong>Resolution:</strong> Will Update Soon</p>
                            </div>
                        </section>

                        <section className={styles.section}>
                            <h2 className={styles.sectionTitle}>Security Updates</h2>
                            <p>
                                We regularly update our security measures and will notify users of any significant changes. 
                                This page was last updated on October 1, 2025.
                            </p>
                        </section>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default SecurityOverviewPage;
