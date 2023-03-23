import { Link } from 'react-router-dom';
import { useAuthContext } from '../../../contexts/AuthContext';
import styles from './ShowCard.module.css';
import { useNavigate } from 'react-router-dom'
import { addToWishList, removeFromWatchlist } from '../../../services/showsService';

export const ShowCard = ({ show, id, watchlist, setWatchlist, page }) => {

    const { currentUser } = useAuthContext();
    const navigate = useNavigate();

    const isAdded = watchlist.some(x => x.id === id);

    const addToWishListHandler = () => {
        if (!currentUser) {
            return navigate('/login');
        }
        console.log(show.type, currentUser.uid, id);
        addToWishList(show.type, currentUser.uid, id);
        setWatchlist(state => [...state, { type: show.type, id: id }]);
    };

    const removeFromWatchlistHandler = () => {
        removeFromWatchlist(show.type, currentUser.uid, id);
        setWatchlist(state => state.filter(x => x.id !== id));
    };
    return (
        <article
        className={page === 'Home' ?
        styles['home-card-wrapper']
        : styles['catalog-card-wrapper']
    }
    >
            
            <Link className='link' to={`/catalog/${id}`}>

                <div
                    className={page === 'Home' ?
                    styles['home-card']
                        : styles['catalog-card']
                    }
                >
                    
                    <div
                        className={page === 'Home' ?
                            styles['home-img-container']
                            : styles['catalog-img-container']
                        }
                    >
                        <img src={show.imageList[0]} alt="show" />
                    </div>
                    <div
                        className={page === 'Home' ?
                            styles['home-content']
                            : styles['catalog-content']
                        }
                    >

                        <div className={page === 'Home' ?
                            styles['home-show-info']
                            : styles['catalog-show-info']
                        }>
                            <p
                                className={page === 'Home' ?
                                    styles['home-title']
                                    : styles['catalog-title']
                                }
                            >{show.title}</p>

                            {show.year.toString().length === 4 ?
                                <p
                                    className={page === 'Home' ?
                                        styles['home-year']
                                        : styles['catalog-year']
                                    }
                                >{show.year}</p>
                                : <p
                                    className={page === 'Home' ?
                                        styles['home-year']
                                        : styles['catalog-year']
                                    }
                                >{show.year.toString().slice(0, 4)} - {show.year.toString().slice(4)}</p>
                            }
                            <div
                                className={page === 'Home' ?
                                    styles['home-rating']
                                    : styles['catalog-rating']
                                }
                            >
                                <i className="fa-solid fa-star"></i>
                                {show.rating === '' ?
                                    <p className={page === 'Home' ?
                                        styles['home-rating-points']
                                        : styles['catalog-rating-points']
                                    }>No rating yet</p>
                                    : <p className={page === 'Home' ?
                                        styles['home-rating-points']
                                        : styles['catalog-rating-points']
                                    }>{show.rating} / 10</p>
                                }

                            </div>

                            {page !== 'Home' &&
                                <div className={styles.genres}>
                                    {show.genreList.map(x => {
                                        return <span className={styles.genre}>{x}</span>
                                    })}
                                </div>
                            }

                            {page !== 'Home' &&
                                <div className={styles.desc}>{show.desc}</div>
                            }

                        </div>
                    </div>
                </div>
            </Link>
            {isAdded ?
                        // <i className={`${styles.add} fa-solid fa-bookmark`}></i> 
                        <button
                            onClick={removeFromWatchlistHandler}
                            className={page === 'Home' ?
                                styles['home-add']
                                : styles['catalog-add']
                            }
                        ><i className="fa-solid fa-minus"></i>
                        </button>
                        : <button
                            onClick={addToWishListHandler}
                            className={page === 'Home' ?
                                styles['home-add']
                                : styles['catalog-add']
                            }><i className="fa-solid fa-plus"></i>
                        </button>
                    }
        </article>
    );
};