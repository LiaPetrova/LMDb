import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../assets/images/logo.png';
import { useAuthContext } from '../../../contexts/AuthContext';
import { useShowsContext } from '../../../contexts/ShowsConext';
import { filterSearchResults } from '../../../utils/filterSearchResults';
import styles from './Header.module.css';
import { SearchPanel } from './SearchPanel/SearchPanel';
let lastScrollTop = 0;

export const Header = () => {

    const { currentUser, isAdmin } = useAuthContext();
    const [headerBgn, setHeaderBgn] = useState(false);
    const [showHeader, setShowHeader] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchPanel, setSearchPanel] = useState(false);
    const [searchResult, setSearchResults] = useState([]);
    const { allShowsList, moviesList, seriesList } = useShowsContext();
    const [type, setType] = useState('All');


    const openSearchPanel = () => setSearchPanel(true);
    const closeSearchPanel = () => {
        setSearchPanel(false)
        setSearchTerm('');
    };

    const changeHandler = (e) => {
        if (e.target.name === 'type') {
            setType(e.target.value);
        } else {
            setSearchTerm(e.target.value);
        }
        if (e.target.name === 'searchTerm') {
            if (type === 'movies') {
                setSearchResults(filterSearchResults(moviesList, e.target.value));
            } else if (type === 'series') {
                setSearchResults(filterSearchResults(seriesList, e.target.value));
            } else {
                setSearchResults(filterSearchResults(allShowsList, e.target.value));
            }
            openSearchPanel(true);
        }
    };


    const changeBackground = () => {
        if (window.scrollY >= 120) {
            setHeaderBgn(true)
        } else {
            setHeaderBgn(false)
        }

    };


    const toggleHeader = () => {
        let st = window.pageYOffset || document.documentElement.scrollTop; // Credits: "https://github.com/qeremy/so/blob/master/so.dom.js#L426"
        if (st > lastScrollTop) {
            // downscroll code
            setShowHeader(false);
        } else if (st < lastScrollTop) {
            // upscroll code
            setShowHeader(true);
        } // else was horizontal scroll
        lastScrollTop = st <= 0 ? 0 : st;
    }

    useEffect(() => {
        changeBackground()
        // adding the event when scroll change background
        window.addEventListener("scroll", changeBackground);
        window.addEventListener("scroll", toggleHeader);
    })


    return (
        <>
            <header className={`${styles.header} width ${headerBgn ? styles['header-bgn'] : ''} ${showHeader ? '' : styles['header-inactive']}`}>
                <div className={styles.logo}>
                    <Link to='/'><img src={logo} alt="" className={styles["logo-img"]} /></Link>
                </div>

                <div className={styles.search}>
                    <select className={styles['select']} name="type" id="type" onChange={changeHandler}>
                        <option value="all">All</option>
                        <option value="movies">Movies</option>
                        <option value="series">Series</option>
                    </select>
                    <input type="text" value={searchTerm} onChange={changeHandler} name='searchTerm' />
                    <button
                        // onClick={} 
                        className={styles['search-btn']}>
                        <i className={`fa-solid fa-magnifying-glass box-shadow`}></i>
                    </button>
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
            <SearchPanel searchResult={searchResult} closeSearchPanel={closeSearchPanel} searchPanel={searchPanel} />
        </>

    )
}