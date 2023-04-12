import { useState } from "react";
import Loader from "../../components/shared/Loader/Loader";
import ShowCard from "../../components/shared/ShowCard/ShowCard";
import { useShowsContext } from "../../contexts/ShowsConext";
import styles from './Watchlist.module.css';


const Watchlist = () => {
    const { watchlist } = useShowsContext();
    const [end, setEnd] = useState(10);
    return (
        <section className={styles.section}>
            <div className={styles['title-wrapper']}>
                <div className={styles.devider}></div>
                <h2 className={styles.title}>My watchlist</h2>
            </div>
            <div className={styles.watchlist}>
                {watchlist !== null
                    ? <>
                        {watchlist.length > 0 ? watchlist.slice(0, end).map(x =>
                            <ShowCard key={x.id} show={x.fields} id={x.id} page='Home' />)
                            : <p className={styles['no-results']}>Nothing to show...</p>}
                    </>
                    : <Loader />
                }
            </div>
            {end < watchlist?.length &&
                <button className="btn action-btn" onClick={() => setEnd(state => state + 5)} >
                    Load More
                </button>
            }
        </section>
    );

};

export default Watchlist;