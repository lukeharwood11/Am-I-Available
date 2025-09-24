import React from 'react';
import Logo from '../../components/icons/Logo';
import styles from './Footer.module.css';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className={styles.footer}>
            <div className={styles.footerContent}>
                <div className={styles.footerSection}>
                    <div className={styles.logoSection}>
                        <Logo size={32} className={styles.logo} />
                        <p className={styles.tagline}>
                            Making event coordination effortless
                        </p>
                    </div>
                </div>

                <div className={styles.footerSection}>
                    <h4 className={styles.sectionTitle}>Product</h4>
                    <ul className={styles.linkList}>
                        <li>
                            <a href='#features' className={styles.footerLink}>
                                Features
                            </a>
                        </li>
                        <li>
                            <a href='#about' className={styles.footerLink}>
                                About
                            </a>
                        </li>
                        <li>
                            <a href='#pricing' className={styles.footerLink}>
                                Pricing
                            </a>
                        </li>
                    </ul>
                </div>

                <div className={styles.footerSection}>
                    <h4 className={styles.sectionTitle}>Support</h4>
                    <ul className={styles.linkList}>
                        <li>
                            <a href='#help' className={styles.footerLink}>
                                Help Center
                            </a>
                        </li>
                        <li>
                            <a href='#contact' className={styles.footerLink}>
                                Contact Us
                            </a>
                        </li>
                        <li>
                            <a href='#status' className={styles.footerLink}>
                                Status
                            </a>
                        </li>
                    </ul>
                </div>

                <div className={styles.footerSection}>
                    <h4 className={styles.sectionTitle}>Legal</h4>
                    <ul className={styles.linkList}>
                        <li>
                            <a href='#privacy' className={styles.footerLink}>
                                Privacy Policy
                            </a>
                        </li>
                        <li>
                            <a href='#terms' className={styles.footerLink}>
                                Terms of Service
                            </a>
                        </li>
                        <li>
                            <a href='#cookies' className={styles.footerLink}>
                                Cookie Policy
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            <div className={styles.footerBottom}>
                <div className={styles.copyright}>
                    <p>&copy; {currentYear} AMIA. All rights reserved.</p>
                </div>
                <div className={styles.socialLinks}>
                    <a
                        href='#twitter'
                        className={styles.socialLink}
                        aria-label='Twitter'
                    >
                        <FaTwitter size={20} />
                    </a>
                    <a
                        href='#linkedin'
                        className={styles.socialLink}
                        aria-label='LinkedIn'
                    >
                        <FaLinkedin size={20} />
                    </a>
                    <a
                        href='#github'
                        className={styles.socialLink}
                        aria-label='GitHub'
                    >
                        <FaGithub size={20} />
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
