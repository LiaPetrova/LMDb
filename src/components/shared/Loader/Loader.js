import styles from './Loader.module.css';
import loader1 from '../../../assets/images/loader1.png';
import loader2 from '../../../assets/images/loader2.png';
import { memo } from 'react';

const Loader = () => {
    return (
        <section className={styles['loader-wrapper']}>

            <div className={styles["loader"]}>
                <div className={styles["loader__container"]}>
                    <div className={styles["loader__film"]}>
                        <img className={styles["loader__film-img"]} src={loader1} alt="" />
                        <img className={styles["loader__film-img"]} src={loader1} alt="" />
                    </div>
                    <img className={styles["loader__camera"]} src={loader2} alt="" />
                </div>
                <p className={styles.text}>Loading...</p>
            </div>
        </section>

    );
};

export default memo(Loader);
