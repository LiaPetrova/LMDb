import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom"
import { CommentSection } from "../../components/CommentSection/CommentSection";
import RatingModal from "../../components/RatingModal/RatingModal";
import Loader from "../../components/shared/Loader/Loader";
import { useAuthContext } from "../../contexts/AuthContext";
import { useShowsContext } from "../../contexts/ShowsConext";
import { deleteShow, getOne, handleRating } from "../../services/showsService";
import { useParsers } from "../../utils/parsers";
import styles from './ShowDetails.module.css';

export const ShowDetails = () => {

    const navigate = useNavigate();
    const { showId, type } = useParams();
    const [show, setShow] = useState({});
    const { currentUser, isAdmin } = useAuthContext();
    const [rateShow, setRateShow] = useState(false);
    const [commentSectionOpen, setCommentSectionOpen] = useState(false);
    const [selectedSlide, setSelectedSlide] = useState(0);
    const [hasRatedWith, setHasRatedWith] = useState(0);
    const [hasRated, setHasRated] = useState(false);
    const [currentRating, setCurrentRating] = useState(0);
    const [usersRatedCount, setUsersRatedCount] = useState(0);
    const { showEdit, setWatchlist, showDelete } = useShowsContext();
    
    const parsers = useParsers();
    
    
    
    const closeRateModal = useCallback(() => setRateShow(false), []);
    const openRateModal = () => {
        if (!currentUser) {
            return navigate('/login');
        }
        setRateShow(true);
    };

    useEffect(() => {
        getOne(showId, type)
            .then(result => {
                setShow(result.fields);
                setHasRated(result.fields.rating?.usersRated.hasOwnProperty(currentUser?.uid));
                setHasRatedWith(Number(result.fields.rating?.usersRated[currentUser?.uid]));
                setCurrentRating(result.fields.rating.ratingPoints);
                setUsersRatedCount(Object.keys(result.fields.rating.usersRated).length);
            });

    }, [showId, type, currentUser]);

    const rateShowHandler = (rating) => {
        handleRating('send', type, currentUser?.uid, showId, rating, usersRatedCount, currentRating, hasRated, hasRatedWith)
            .then(result => {
                setCurrentRating(result.newRatingPoints);
                setUsersRatedCount(result.usersRatedCount);
                if (type === 'Movie') {
                    showEdit(showId, { id: showId, fields: { ...show, rating: { ratingPoints: result.newRatingPoints } } }, 'Movie');
                } else {
                    showEdit(showId, { id: showId, fields: { ...show, rating: { ratingPoints: result.newRatingPoints } } }, 'Series');
                }
                setWatchlist(state => state.map(x => x.id === showId ? { id: showId, fields: { ...show, rating: { ratingPoints: result.newRatingPoints } } } : x));
            });
        setHasRated(true);
        setHasRatedWith(rating);
        closeRateModal();

    };

    const removeRateHandler = (rating) => {
        handleRating('remove', type, currentUser?.uid, showId, rating, usersRatedCount, currentRating, hasRated, hasRatedWith)
            .then(result => {
                setCurrentRating(result.newRatingPoints);
                setUsersRatedCount(result.usersRatedCount);
                if (type === 'Movie') {
                    showEdit(showId, { id: showId, fields: { ...show, rating: { ratingPoints: result.newRatingPoints } } }, 'Movie');

                } else {
                    showEdit(showId, { id: showId, fields: { ...show, rating: { ratingPoints: result.newRatingPoints } } }, 'Series');
                }
                setWatchlist(state => state.map(x => x.id === showId ? { id: showId, fields: { ...show, rating: { ratingPoints: result.newRatingPoints } } } : x));
            });
        setHasRated(false);
        setHasRatedWith(0);
        closeRateModal();
    };

    const deleteShowHandler = useCallback(() => {
        // eslint-disable-next-line no-restricted-globals
       if(confirm(`Are you sure you want to delete ${show.title}`)) {
            deleteShow(showId, type);
            showDelete(showId, type);
            if(type === 'Movie') {
                return navigate('/movies');
            } 
            return navigate('/series');
       }
       
        
    }, []);

    return (
        <>
            <RatingModal
                closeRateModal={closeRateModal}
                rateShow={rateShow}
                title={show.title}
                hasRatedWith={hasRatedWith}
                rateShowHandler={rateShowHandler}
                removeRateHandler={removeRateHandler}
            />

            {show.title ?
                <div className={`${styles['page-wrapper']}`}>


                    <div className={styles['background']}>
                        <img src={show.imageList[1]} alt='background' className={styles['bgn-img']} />
                    </div>
                    <div className={styles['sections-wrapper']}>
                        <section className={`${styles['details-section']} width`}>
                            {isAdmin &&
                                < div className={styles['admin-buttons']}>
                                    <Link to={`/${type}/${showId}/edit`}><button className={`${styles.edit} btn`}>Edit</button></Link>
                                    <button className='btn' onClick={deleteShowHandler}>Delete</button>
                                </div>
                            }

                            <div className={styles.header}>
                                <div className={styles['left-side']}>
                                    <h2 className={styles.title}>{show.title}</h2>
                                    <div className={styles['small-info']}>
                                        <p>{show.type}</p>
                                        <i className="fa-solid fa-circle"></i>
                                        <p>{parsers.yearParser(show.year)}</p>
                                        <i className="fa-solid fa-circle"></i>
                                        <p>{parsers.durationParser(show.duration)}</p>
                                    </div>
                                </div>
                                <div className={styles['rating-wrapper']}>

                                    <div
                                        className={styles['current-rating']}
                                    >
                                        <p className={styles['rating-label']}>LMDb Rate</p>
                                        <div>
                                            <i className="fa-solid fa-star"></i>
                                            {currentRating === 0 ?
                                                <p className={styles['rating-points']}>No rating yet</p>
                                                : <div className={styles['rating-content']}>
                                                    <p className={styles['rating-points']}>{currentRating} / 10</p>
                                                    <p className={styles['users-rated']}>({usersRatedCount})</p>
                                                </div>
                                            }
                                        </div>

                                    </div>
                                    <div
                                        className={styles['your-rating']}
                                    >

                                        <p className={styles['rating-label']}>Your Rate</p>
                                        {hasRated ?
                                            <div>
                                                <button onClick={openRateModal}><i className="fa-solid fa-star"></i></button>
                                                <p className={styles['rating-points']}>{hasRatedWith} / 10</p>
                                            </div>
                                            :
                                            <div>
                                                <button onClick={openRateModal}><i className="fa-regular fa-star"></i></button>
                                                <p className={styles['rating-points']}>Rate</p>
                                            </div>
                                        }

                                    </div>
                                </div>
                            </div>

                            <div className={styles['details-main']}>
                                <div className={styles['img-wrapper']}>
                                    <div className={styles['img-container']}>
                                        <div className={styles.carousel} aria-label="Gallery">
                                            <ol className={styles['carousel__viewport']}>
                                                {show.imageList.map((x, i) => {
                                                    return <li key={i} id={`carousel__slide${i}`}
                                                        tabIndex="0"
                                                        className={styles['carousel__slide']}>
                                                        <div className={styles['carousel__snapper']}>
                                                            <img src={x} alt="" />
                                                        </div>
                                                    </li>
                                                })}


                                            </ol>
                                            <aside className={styles['carousel__navigation__sides']}>
                                                <div className={styles['arrows-container']}>
                                                    <a
                                                        title={`Go to previous`}
                                                        href={`#carousel__slide${selectedSlide - 1}`}
                                                        className={`${styles['carousel__navigation-arrow']} ${selectedSlide > 0 ? '' : styles['hidden']}`}
                                                        onClick={() => setTimeout(() => setSelectedSlide(currentSlide => currentSlide - 1), 100)}

                                                    >
                                                        <i className="fa-solid fa-chevron-left"></i>
                                                    </a>

                                                    <a
                                                        title={`Go to next`}
                                                        href={`#carousel__slide${selectedSlide + 1}`}
                                                        className={`${styles['carousel__navigation-arrow']} ${selectedSlide < show.imageList.length - 1 ? '' : styles['hidden']}`}
                                                        onClick={() => setTimeout(() => setSelectedSlide(currentSlide => currentSlide + 1), 100)}
                                                    >
                                                        <i className="fa-solid fa-chevron-right box-shadow"></i>
                                                    </a>



                                                </div>
                                            </aside>
                                            <aside className={styles['carousel__navigation']}>
                                                <ol className={styles['carousel__navigation-list']}>
                                                    {show.imageList.map((x, i) => {
                                                        return <li key={i} className={styles['carousel__navigation-item']}>
                                                            <a
                                                                title={`Go to slide ${i}`}
                                                                onClick={() => setSelectedSlide(i)}
                                                                href={`#carousel__slide${i}`}
                                                                className={`${styles['carousel__navigation-button']} ${selectedSlide === i ? styles.selected : ''}`}>Go to slide {i}</a>
                                                        </li>
                                                    })}

                                                </ol>
                                            </aside>
                                        </div>
                                    </div>
                                </div>
                                <div className={styles['content']}>
                                    <p className={styles.director}><span>Directer By:</span>{show.director}</p>
                                    <p className={styles.desc}><span>Summary:</span>{show.desc}</p>
                                    <div className={styles.genres}>
                                        {show.genreList.map(x => {
                                            return <span key={x} className={styles.genre}>{x}</span>
                                        })}
                                    </div>
                                    <div className={styles['actor-list']}>
                                        <ul className={styles['actors']}>
                                            {show.actorsList.map(x =>
                                                <li className={`${styles['actor']}`} key={x.fullName}>
                                                    <img className={`${styles['img']} box-shadow`} src={x.imageUrl} alt="actor" />
                                                    <div className={styles['names-container']}>
                                                        <p><span>Actors Name:</span>{x.fullName}</p>
                                                        <p><span>Role Name:</span>{x.roleName}</p>
                                                    </div>
                                                </li>)}
                                        </ul>
                                    </div>
                                </div>

                            </div>
                            <a href="#comment-section" className="link" onClick={() => setCommentSectionOpen(!commentSectionOpen)}>
                                <div className={styles['title-wrapper']}>
                                    <div className={styles.devider}></div>
                                    <h2 className={styles.title}>Users Reviews</h2>
                                    {commentSectionOpen ? <i className="fa-solid fa-angle-up"></i> : <i className="fa-solid fa-angle-down"></i>}
                                </div>
                            </a>
                            {commentSectionOpen && <CommentSection id='comment-section' showId={showId} />}

                        </section>
                    </div>

                </div>

                : <Loader />}
        </>
    );
};