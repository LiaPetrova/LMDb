import { Link } from "react-router-dom";
import { useShowsContext } from "../../../contexts/ShowsConext";
import { ShowCard } from "../../shared/ShowCard/ShowCard";

export const NewestMovies = ({ styles }) => {
    const { moviesList, watchlist, setWatchlist } = useShowsContext();

    return (
        <section className={styles.section}>
            <Link className="link" to='/movies'>
                <div className={styles['title-wrapper']}>
                    <div className={styles.devider}></div>
                    <h2 className={styles.title}>Newest movies</h2>
                    <i className="fa-solid fa-angle-right"></i>
                </div>
            </ Link>
            <div className={styles.movies}>
                {moviesList.length > 0 ? moviesList.map(x =>
                    <ShowCard key={x.id} show={x.fields} id={x.id} watchlist={watchlist} setWatchlist={setWatchlist} page='Home'/>)
                    : <p className={styles['no-results']}>Nothing to show</p>}
            </div>
        </section>
    );
};