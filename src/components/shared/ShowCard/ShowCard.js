import { Link } from 'react-router-dom';
import { useAuthContext } from '../../../contexts/AuthContext';
import styles from './ShowCard.module.css';
import { useNavigate } from 'react-router-dom'
import { addToWishList, removeFromWatchlist } from '../../../services/showsService';
<<<<<<< HEAD
import { useParsers } from '../../../utils/parsers';
import { toast } from 'react-toastify';
import { useShowsContext } from '../../../contexts/ShowsConext';
import { useCallback } from 'react';
import {memo} from 'react';
=======
import { durationParser, textShortener, yearParser } from '../../../utils/parsers';
>>>>>>> parent of 87140975 (update)

const ShowCard = ({ show, id, page }) => {

    const parsers = useParsers();
    const { watchlist, setWatchlist } = useShowsContext();
    const { currentUser } = useAuthContext();
    const navigate = useNavigate();

    console.log('ok');

    const isAdded = watchlist?.some(x => x.id === id);

    const addToWatchListHandler = useCallback(() => {
        if (!currentUser) {
            return navigate('/login');
        }
        addToWishList(show.type, currentUser.uid, id);
        setWatchlist(state => [...state, { fields: show, id: id }]);
<<<<<<< HEAD
        toast.success(`You added ${show.title} to your watchlist!`);
    }, []);
=======
    };
>>>>>>> parent of 87140975 (update)

    const removeFromWatchlistHandler = useCallback(() => {
        removeFromWatchlist(show.type, currentUser.uid, id);
        setWatchlist(state => state.filter(x => x.id !== id));
<<<<<<< HEAD
        toast.info(`You removed ${show.title} from your     !`);

    }, []);
=======
    };
>>>>>>> parent of 87140975 (update)
    return (
        <>
            {show && <article
                className={page === 'Home' ?
                    styles['home-card-wrapper']
                    : styles['catalog-card-wrapper']
                }
            >

                <Link className='link' to={`/catalog/${show.type}/${id}`}>

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
                                <div className={page === 'Home' ? '' : styles['title-wrapper']}>
                                    <p
                                        className={page === 'Home' ?
                                            styles['home-title']
                                            : styles['catalog-title']
                                        }
                                    >{show.title}</p>


                                    <p
                                        className={page === 'Home' ?
                                            styles['home-year']
                                            : styles['catalog-year']
                                        }
                                    >{parsers.yearParser(show.year)}</p>


                                </div>
                                {page !== 'Home' &&
                                    <p className={styles.duration}>
                                        {parsers.durationParser(show.duration)}
                                    </p>}
                                <div
                                    className={page === 'Home' ?
                                        styles['home-rating']
                                        : styles['catalog-rating']
                                    }
                                >
                                    <i className="fa-solid fa-star"></i>
                                    {show.rating.ratingPoints === 0 ?
                                        <p className={page === 'Home' ?
                                            styles['home-rating-points']
                                            : styles['catalog-rating-points']
                                        }>No rating yet</p>
                                        : <p className={page === 'Home' ?
                                            styles['home-rating-points']
                                            : styles['catalog-rating-points']
                                        }>{show.rating.ratingPoints} / 10</p>
                                    }

                                </div>

                                {page !== 'Home' &&
                                    <div className={styles.genres}>
                                        {show.genreList.map(x => {
                                            return <span key={x} className={styles.genre}>{x}</span>
                                        })}
                                    </div>
                                }

                                {page !== 'Home' &&
                                    <div className={styles.desc}>{parsers.textShortener(show.desc)}</div>
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
                            styles['home-remove']
                            : styles['catalog-remove']
                        }
                    ><i className="fa-solid fa-minus"></i>
                    </button>
                    : <button
                        onClick={addToWatchListHandler}
                        className={page === 'Home' ?
                            styles['home-add']
                            : styles['catalog-add']
                        }><i className="fa-solid fa-plus"></i>
                    </button>
                }
            </article>
            }
        </>
    );
};

export default memo(ShowCard);