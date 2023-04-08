import { useCallback, useState } from "react";
import Loader from "../../components/shared/Loader/Loader";
import ShowCard from "../../components/shared/ShowCard/ShowCard";
import SortDropDown from "../../components/shared/SortDropDown/SortDropDown";
import { useShowsContext } from "../../contexts/ShowsConext";
import styles from './SeriesCatalog.module.css';

export const SeriesCatalog = () => {
    const { seriesList } = useShowsContext();
    const [end, setEnd] = useState(5);
    const { showsSort } = useShowsContext();

    const CallBack = useCallback((sortedShows) => {
        return showsSort(sortedShows, 'Series');
    }, []);

    return (
        <section className={styles.section}>
            {/* <div className={styles['title-wrapper']}>
                <h2 className={styles.title}>Browse throw newest movies</h2>
            </div> */}
            <SortDropDown handleCallBack={CallBack} showsList={seriesList} />

            <div className={styles.series}>
                {seriesList.length > 0 ? seriesList.slice(0, end).map(x =>
                    <ShowCard key={x.id} show={x.fields} id={x.id} />)
                    : <Loader />}
            </div>
            {end < seriesList.length &&
                <button className="btn action-btn" onClick={() => setEnd(state => state + 5)} >
                    Load More
                </button>
            }
        </section>
    );
};