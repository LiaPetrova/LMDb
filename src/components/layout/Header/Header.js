import { Link } from 'react-router-dom';
import logo from '../../../assets/images/logo.png';
import { useAuthContext } from '../../../contexts/AuthContext';
import styles from './Header.module.css';

export const Header = () => {

    const { currentUser, isAdmin } = useAuthContext();
    return (
        <header className={`${styles.header} width`}>
            <div className={styles.logo}>
                <Link to='/'><img src={logo} alt="" className={styles["logo-img"]} /></Link>
            </div>

            <nav className={styles['nav-desctop']}>
                <ul className={styles["nav-list"]}>
                    {isAdmin &&
                        <li className={styles["nav-list-item"]}>
                            <Link to="/add" className={styles.link}>Add</Link>
                        </li>}
                    <li className={styles["nav-list-item"]}>
                        <Link to="/movies" className={styles.link}>Movies</Link>
                    </li>

                    <li className={styles["nav-list-item"]}>
                        <Link to='/series' className={styles.link}>Series</Link>
                    </li>
                    <li className={styles["nav-list-item"]}>
                        <Link to='/genres' className={styles.link}>Genres</Link>
                    </li>
                    {!currentUser ?
                        <>
                            <li className={styles["nav-list-item"]}>
                                <Link to='/login' className={styles.link}>Login</Link>
                            </li>
                            <li className={styles["nav-list-item"]}>
                                <Link to='/register' className={styles.link}>Register</Link>
                            </li>
                        </>
                        : <>
                            <li className={styles["nav-list-item"]}>
                                <Link to='/watchlist' className={styles.link}>Watchlist</Link>
                            </li>
                            <li className={styles["nav-list-item"]}>
                                <Link to='/logout' className={styles.link}>Logout</Link>
                            </li>

                        </>
                    }

                </ul>
            </nav>

        </header>

    )
}