import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import styles from './Header.module.css';

export const Header = () => {
    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                <img src={logo} alt="" className={styles["logo-img"]} />
            </div>

            <nav className={styles['nav-desctop']}>
                <ul className={styles["nav-list"]}>
                    <li className={styles["nav-list-item"]}>
                        <Link to="/movies" className={styles.link}>Movies</Link>
                    </li>

                    <li className={styles["nav-list-item"]}>
                        <Link to='/series' className={styles.link}>Series</Link>
                    </li>
                    <li className={styles["nav-list-item"]}>
                        <Link to='/genres' className={styles.link}>Genres</Link>
                    </li>
                    <li className={styles["nav-list-item"]}>
                        <Link to='/login' className={styles.link}>Login</Link>
                    </li>
                    <li className={styles["nav-list-item"]}>
                        <Link to='/register' className={styles.link}>Register</Link>
                    </li>
                </ul>
            </nav>

        </header>
        
    )
}