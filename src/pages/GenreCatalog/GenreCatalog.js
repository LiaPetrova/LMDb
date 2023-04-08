import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ShowCard from '../../components/shared/ShowCard/ShowCard';
import SortDropDown from '../../components/shared/SortDropDown/SortDropDown';
import { useShowsContext } from '../../contexts/ShowsConext';
import styles from './GenresCatalog.module.css';

export const GenreCatalog = () => {
    const { allShowsList } = useShowsContext();
    const { genre } = useParams();
    const [filteredShows, setFilteredShows] = useState([]);
    const { showsSort } = useShowsContext();
    const [end, setEnd] = useState(5);

    useEffect(() => {
        const genreName = `${genre.slice(0, 1).toUpperCase()}${genre.slice(1)}`;
        setFilteredShows(allShowsList.filter(x => x.fields.genreList.includes(genreName)));
    }, [allShowsList, genre]);

    const CallBack = useCallback((sortedShows) => {
        return showsSort(sortedShows, 'Movie');
    }, []);
    return (
        <section className={styles.section}>
            {/* <div className={styles['title-wrapper']}>
                <h2 className={styles.title}>Browse throw newest movies</h2>
            </div> */}
            <SortDropDown handleCallBack={CallBack} showsList={filteredShows} />
            <div className={styles.shows}>
                {filteredShows.length > 0 ? filteredShows.slice(0, end).map(x =>
                    <ShowCard key={x.id} show={x.fields} id={x.id} />)
                    : <p className={'no-results'}>Nothing to show...</p>}
            </div>
            {end < filteredShows.length &&
                <button className="btn action-btn" onClick={() => setEnd(state => state + 5)} >
                    Load More
                </button>
            }
        </section>
    );
};