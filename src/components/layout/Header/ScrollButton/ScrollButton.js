import { useEffect, useState } from "react";
import styles from './ScrollButton.module.css';

export const ScrollButton = () => {

    const [visible, setVisible] = useState(false);
    useEffect(() => {

        window.addEventListener('scroll', toggleVisible);
    }, []);

    const toggleVisible = () => {
        const scrolled = document.documentElement.scrollTop;
        if (scrolled > 350) {
            setVisible(true)
        }
        else if (scrolled <= 350) {
            setVisible(false)
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
            /* you can also use 'auto' behaviour
               in place of 'smooth' */
        });
    };
    return (
        <div className={styles['scroll-to-top-wrapper']}>
            <button onClick={scrollToTop} className={`btn ${styles['scroll-to-top']} ${visible ? styles.visible : styles.hidden}`}>
                <i className="fa-solid fa-arrow-up"></i>
            </button>
        </div>
    );
};