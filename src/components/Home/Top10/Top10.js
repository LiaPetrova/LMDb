import { useEffect, useRef, useState } from "react";
import { useShowsContext } from "../../../contexts/ShowsConext";
import Loader from "../../shared/Loader/Loader";
import { Top10Card } from "./Top10Card/TopTenCard";
import styles from './Top10.module.css';

export const Top10 = () => {
    const { allShowsList } = useShowsContext();
    const slideContainer = useRef(null);

    const [topTenRated, setTopTenRated] = useState([]);

    useEffect(() => {
        setTopTenRated(allShowsList.sort((a, b) => b.fields.rating.ratingPoints - a.fields.rating.ratingPoints).slice(0, 10));
    }, [allShowsList]);

    const scrollLeft = (e) => {
        e.currentTarget.parentNode.parentNode.lastChild.scrollBy(-960, 0);
    };
    const scrollRight = (e) => {
        slideContainer.current.scrollBy(960, 0);
    };

    return (
        <section className={styles.section}>

            <div className={styles['title-wrapper']}>
                <div className={styles.devider}></div>
                <h2 className={styles.title}>Top 10 Rated</h2>
            </div>



            <div className={styles['arrows-navigation']}>
                <div
                    title={`Go to previous`}
                    className={`${styles['navigation-arrow']} ${styles.left}`}
                    onClick={scrollLeft}
                >
                    <i className="fa-solid fa-chevron-left"></i>
                </div>

                <div
                    title={`Go to next`}
                    className={`${styles['navigation-arrow']} ${styles.right}`}
                    onClick={scrollRight}
                >
                    <i className="fa-solid fa-chevron-right box-shadow"></i>
                </div>
            </div>
            <div ref={slideContainer} className={styles['top-ten']}>
                {topTenRated.length > 0 ? topTenRated.map((x, i) =>
                    <Top10Card key={x.id} show={x.fields} id={x.id} index={i} />)
                    : <Loader />}
            </div>
        </section>
    );
};