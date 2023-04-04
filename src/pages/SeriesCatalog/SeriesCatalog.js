import { ShowCard } from "../../components/shared/ShowCard/ShowCard";
import { useShowsContext } from "../../contexts/ShowsConext";
import styles from './SeriesCatalog.module.css';

export const SeriesCatalog = () => {
    const { seriesList, watchlist, setWatchlist } = useShowsContext();

    return (
        <section className={styles.section}>
            {/* <div className={styles['title-wrapper']}>
                <h2 className={styles.title}>Browse throw newest movies</h2>
            </div> */}
        <div className={styles.series}>
            {seriesList.length > 0 ? seriesList.map(x =>
                <ShowCard key={x.id} show={x.fields} id={x.id} watchlist={watchlist} setWatchlist={setWatchlist} />)
                : <p className={'no-results'}>Nothing to show...</p>}
        </div>
    </section>
    );
};