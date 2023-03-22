import { Link } from 'react-router-dom';
import { useAuthContext } from '../../../contexts/AuthContext';
import styles from './ShowCard.module.css';
import { useNavigate } from 'react-router-dom'
import { addToWishList, removeFromWatchlist } from '../../../services/showsService';

export const ShowCard = ({ show, id, watchlist, setWatchlist }) => {

    const { currentUser } = useAuthContext();
    const navigate = useNavigate();

    const isAdded = watchlist.some(x => x.id === id);

    const addToWishListHandler = () => {
        if (!currentUser) {
            return navigate('/login');
        }
        console.log(show.type, currentUser.uid, id);
        addToWishList(show.type, currentUser.uid, id);
        setWatchlist(state => [...state, {type: show.type, id: id}]);
    };
    
    const removeFromWatchlistHandler = () => {
        removeFromWatchlist(show.type, currentUser.uid, id);
        setWatchlist(state => state.filter(x => x.id !== id));
    };
    return (
        <article className={styles['card-wrapper']}>
            {isAdded ?
            // <i className={`${styles.add} fa-solid fa-bookmark`}></i> 
                <button onClick={removeFromWatchlistHandler} className={styles.add}><i className="fa-solid fa-minus"></i></button>
                : <button onClick={addToWishListHandler} className={styles.add}><i className="fa-solid fa-plus"></i></button>
            }
            <Link className='link' to={`/catalog/${id}`}>
                <div className={styles.card}>
                    <div className={styles['img-container']}>
                        <img src={show.imageList[0]} alt="show" />
                    </div>
                    <div className={styles.content}>
                        <div className={styles.rating}>
                            <i className="fa-solid fa-star"></i>
                            {show.rating === '' ?
                                <p className={styles['rating-points']}>No rating yet</p>
                                : <p className={styles['rating-points']}>{show.rating} / 10</p>
                            }

                        </div>
                        <div className={styles['show-info']}>
                            <p className={styles.title}>{show.title}</p>

                            {show.year.toString().length === 4 ?
                                <p className={styles.year}>{show.year}</p>
                                : <p className={styles.year}>{show.year.toString().slice(0, 4)} - {show.year.toString().slice(4)}</p>
                            }


                        </div>
                    </div>
                </div>
            </Link>
        </article>
    );
};