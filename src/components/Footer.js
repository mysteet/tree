import React, {useEffect, useState} from 'react';
import styles from './Footer.module.css';

const Footer = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    useEffect(() => {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
    }, []);

    const toggleExpand = () => {
        setIsExpanded(prevState => !prevState);
    };

    return (
        <footer className={`${styles.footer} ${isExpanded ? styles.expanded : ''}`} onClick={toggleExpand}>
            {isExpanded && (
                <div className={styles.advertisement}>
                    <ins className="adsbygoogle"
                         style={{ display: 'block' }}
                         data-ad-client="ca-pub-6643054555561527"
                         data-ad-slot="1234567890"
                         data-ad-format="auto"
                         data-full-width-responsive="true">
                    </ins>
                </div>
            )}
            <p className={styles.toggle}>{isExpanded ? 'Hide Ads' : 'Show Ads'}</p>
        </footer>
    );
};

export default Footer;
