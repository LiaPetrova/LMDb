import { memo, useEffect, useState } from "react";
import styles from './RatingModal.module.css'

const RatingModal = ({
    closeRateModal,
    rateShow,
    hasRatedWith,
    rateShowHandler,
    title,
    removeRateHandler
}) => {
    const [rating, setRating] = useState(hasRatedWith);
    const [hover, setHover] = useState(0);

    const outsideClickHandler = (e) => {
        if (e.target.tagName === 'SECTION') {
            setTimeout(() => closeRateModal(), 300);
        }
    };

    useEffect(() => {
        setRating(hasRatedWith)
    }, [hasRatedWith]);

    return (
        <section onClick={outsideClickHandler} className={`${styles.modal} ${rateShow ? styles['active'] : styles['inactive']}`} >
            <div className={styles['modal-content']}>
                <span onClick={closeRateModal} className={styles['close']}>&times;</span>
                <h2 className={`${styles.title} ${styles.yellow}`}>{title}</h2>
                <h2 className={styles.title}>How would you rate this show from 1 to 10?</h2>
                <div className={styles['star-rating']}>
                    {[...Array(10)].map((star, index) => {
                        index += 1;
                        return (

                            <button
                                type='button'
                                key={index}
                                className={styles['star-btn']}
                                onClick={() => setRating(index)}
                                onMouseEnter={() => setHover(index)}
                                onMouseLeave={() => setHover(rating)}
                                onDoubleClick={() => {
                                    setRating(0);
                                    setHover(0);
                                }}
                            >
                                <span className={styles.star}>
                                    {index <= (hover || rating) ?
                                        <i className="fa-solid fa-star"></i>
                                        : <i className="fa-regular fa-star"></i>
                                    }</span>
                            </button>
                        );
                    })}
                </div>
                <div className={styles['action-btns']}>
                    <button
                        disabled={hasRatedWith === 0 && rating === 0 }
                        onClick={() => rateShowHandler(rating)}
                        className={`${styles['rate-btn']} btn`}
                    >Rate
                    </button>
                    {hasRatedWith !== 0 &&
                        <button
                            onClick={() => removeRateHandler(rating)}
                            className={`${styles['remove-rate-btn']} btn`}
                        >Remove rate
                        </button>
                    }
                </div>

            </div>

        </section>
    );
};

export default memo(RatingModal);