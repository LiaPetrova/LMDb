import { Link } from "react-router-dom";
import { ShowCard } from "../../components/shared/ShowCard/ShowCard";
import { useShowsContext } from "../../contexts/ShowsConext";
import styles from './MoviesCatalog.module.css';

export const MoviesCatalog = () => {
    const { moviesList, watchlist, setWatchlist } = useShowsContext();

    return (
        <section className={styles.section}>
            {/* <div className={styles['title-wrapper']}>
                <h2 className={styles.title}>Browse throw newest movies</h2>
            </div> */}
        <div className={styles.movies}>
            {moviesList.length > 0 ? moviesList.map(x =>
                <ShowCard key={x.id} show={x.fields} id={x.id} watchlist={watchlist} setWatchlist={setWatchlist} />)
                : <p className={styles['no-results']}>Nothing to show</p>}
        </div>
    </section>
    );
};