import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShowCard } from '../../components/shared/ShowCard/ShowCard';
import { useShowsContext } from '../../contexts/ShowsConext';
import styles from './GenresCatalog.module.css';

export const GenreCatalog = () => {
    const { allShowsList, watchlist, setWatchlist } = useShowsContext();
    const { genre }  = useParams();
    const [filteredShows, setFilteredShows] = useState([]);



    useEffect(() => {
        const genreName = `${genre.slice(0,1).toUpperCase()}${genre.slice(1)}`;
        setFilteredShows(allShowsList.filter(x => x.fields.genreList.includes(genreName)));
    }, [allShowsList, genre]);
    return (
        <section className={styles.section}>
            {/* <div className={styles['title-wrapper']}>
                <h2 className={styles.title}>Browse throw newest movies</h2>
            </div> */}
        <div className={styles.shows}>
            {filteredShows.length > 0 ? filteredShows.map(x =>
                <ShowCard key={x.id} show={x.fields} id={x.id} watchlist={watchlist} setWatchlist={setWatchlist} />)
                : <p className={'no-results'}>Nothing to show...</p>}
        </div>
    </section>
    );
};