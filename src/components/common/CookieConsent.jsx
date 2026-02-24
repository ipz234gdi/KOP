import { useState, useEffect } from 'react';
import styles from './CookieConsent.module.css';

/**
 * @module CookieConsent
 * @description GDPR-compliant cookie consent banner component.
 * Displays a banner at the bottom of the screen if the user hasn't made a choice yet.
 * Stores the user's consent choice in localStorage.
 */

/**
 * CookieConsent banner component.
 * @function CookieConsent
 * @returns {JSX.Element|null} The cookie consent banner or null if already accepted/declined.
 */
export default function CookieConsent() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('cookieConsent');
        if (!consent) {
            setVisible(true);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('cookieConsent', 'accepted');
        setVisible(false);
    };

    const handleDecline = () => {
        localStorage.setItem('cookieConsent', 'declined');
        setVisible(false);
    };

    if (!visible) return null;

    return (
        <div className={styles.banner}>
            <div className={styles.content}>
                <p className={styles.text}>
                    Цей сайт використовує localStorage для збереження ваших ігрових результатів та налаштувань.
                    Ніякі дані не передаються третім особам.
                    Детальніше — у нашій{' '}
                    <a
                        href="https://github.com/ipz234gdi/KOP/blob/lab_1_docs/PRIVACY_POLICY.md"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.link}
                    >
                        Політиці конфіденційності
                    </a>.
                </p>
                <div className={styles.buttons}>
                    <button className={styles.acceptBtn} onClick={handleAccept}>
                        Прийняти
                    </button>
                    <button className={styles.declineBtn} onClick={handleDecline}>
                        Відхилити
                    </button>
                </div>
            </div>
        </div>
    );
}
