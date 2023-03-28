import { ShowCard } from "../../components/shared/ShowCard/ShowCard";
import { useShowsContext } from "../../contexts/ShowsConext";
import styles from './Watchlist.module.css';


export const Watchlist = () => {
    const { watchlist, setWatchlist } = useShowsContext();
    console.log(watchlist);
    return (
        <section className={styles.section}>
            <div className={styles['title-wrapper']}>
                <div className={styles.devider}></div>
            <h2 className={styles.title}>My watchlist</h2>
            </div>
            <div className={styles.movies}>
                {watchlist.length > 0 ? watchlist.map(x =>
                    <ShowCard key={x.id} show={x.fields} id={x.id} watchlist={watchlist} setWatchlist={setWatchlist} page='Home'/>)
                    : <p className={styles['no-results']}>Nothing to show...</p>}
            </div>
        </section>
    );

};