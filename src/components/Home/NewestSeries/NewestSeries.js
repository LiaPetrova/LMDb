import { Link } from "react-router-dom";
import { useShowsContext } from "../../../contexts/ShowsConext";
import { ShowCard } from "../../shared/ShowCard/ShowCard";

export const NewestSeries = ({ styles }) => {
    const { seriesList, watchlist, setWatchlist } = useShowsContext();
    console.log(seriesList);

    return (
        <section className={styles.section}>
            <Link className="link" to='/series'>
                <div className={styles['title-wrapper']}>
                    <div className={styles.devider}></div>
                    <h2 className={styles.title}>Newest series</h2>
                    <i className="fa-solid fa-angle-right"></i>
                </div>
            </Link>
            <div className={styles.series}>
                {seriesList.length > 0 ? seriesList.map(x =>
                    <ShowCard key={x.id} show={x.fields} id={x.id} watchlist={watchlist} setWatchlist={setWatchlist} page='Home'/>)
                    : <p className={'no-results'}>Nothing to show</p>}
            </div>
        </section>
    );
};