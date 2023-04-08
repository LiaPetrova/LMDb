import { useCallback, useState } from "react";
import Loader from "../../components/shared/Loader/Loader";
import ShowCard from "../../components/shared/ShowCard/ShowCard";
import SortDropDown from "../../components/shared/SortDropDown/SortDropDown";
import { useShowsContext } from "../../contexts/ShowsConext";
import styles from './MoviesCatalog.module.css';

export const MoviesCatalog = () => {
    const { moviesList } = useShowsContext();
    const [end, setEnd] = useState(5);
    const { showsSort } = useShowsContext();

    const CallBack = useCallback((sortedShows) => {
        return showsSort(sortedShows, 'Movie');
    }, []);

    return (
        <section className={styles.section}>
            <SortDropDown handleCallBack={CallBack} showsList={moviesList} />
            {/* <div className={styles['title-wrapper']}>
                <h2 className={styles.title}>Browse throw newest movies</h2>
            </div> */}
            <div className={styles.movies}>
                {moviesList.length > 0 ? moviesList.slice(0, end).map(x =>
                    <ShowCard key={x.id} show={x.fields} id={x.id} />)
                    : <Loader />}
            </div>
            {end < moviesList.length &&
                <button className="btn action-btn" onClick={() => setEnd(state => state + 5)} >
                    Load More
                </button>
            }
        </section>
    );
};