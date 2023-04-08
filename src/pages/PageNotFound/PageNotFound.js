import { Link } from 'react-router-dom';
import styles from './PageNotFound.module.css';

const PageNotFound = () => {
    return (
        <section className={styles['page-not-found']}>
            <div className={styles["lamp__wrap"]}>
                <div className={styles['lamp']}>
                    <div className={styles['cable']}></div>
                    <div className={styles.cover}></div>
                    <div className={styles['in-cover']}>
                        <div className={styles.bulb}></div>
                    </div>
                    <div className={styles.light}></div>
                </div>
            </div>
            <section className={styles.error}>
                <div className={styles['error__content']}>
                    <div className={styles['error__message message']}>
                        <h1 className={styles['message__title']}>Page Not Found</h1>
                    </div>
                    <div className={styles['error__nav e-nav']}>
                        <Link to="/" className={styles['e-nav__link']}></Link>
                    </div>
                </div>
            </section>
        </section>
    );
};

export default PageNotFound;