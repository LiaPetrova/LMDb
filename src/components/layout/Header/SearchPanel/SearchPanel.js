import { Link } from 'react-router-dom';
import { yearParser } from '../../../../utils/parsers';
import styles from './SearchPanel.module.css'
export const SearchPanel = ({
    closeSearchPanel,
    searchPanel,
    searchResult
}) => {

    const outsideClickHandler = (e) => {
        if (e.target.tagName === 'SECTION') {
            setTimeout(() => closeSearchPanel(), 300)
            // closeRateModal();
        }
    };

    return (
        <section onClick={outsideClickHandler} className={`${styles.modal} ${searchPanel ? styles['active'] : styles['inactive']}`} >
            <div className={styles['panel-content']}>
                <div className={styles.header}>
                    <h2 className={styles.title}>Search results</h2>
                    <span onClick={closeSearchPanel} className={styles['close']}>&times;</span>
                </div>
                <div className={styles.results}>
                    {searchResult.length > 0 ?
                        <ul className={styles['result-list']}>
                            {searchResult.map(x => {
                                return <Link onClick={closeSearchPanel} to={`catalog/${x.fields.type}/${x.id}`} className='link'>
                                    <li
                                        key={x.id}
                                        className={styles['result-item']}
                                    >
                                        <div className={styles['img-container']}>
                                            <img src={x.fields.imageList[0]} alt="movie" className={styles['img']} />
                                        </div>
                                        <div className={styles.content}>
                                            <div className={styles['show-data']}>
                                                <p className={styles.title}>
                                                    {x.fields.title}
                                                </p>
                                                <p className={styles.year}>
                                                    {yearParser(x.fields.year)}
                                                </p>
                                            </div>
                                            <div className={styles.rating}>
                                                <i class="fa-solid fa-star"></i>
                                                {x.fields.rating.ratingPoints === 0 ?
                                                    <p>No rating yet</p>
                                                    : <p>{x.fields.rating.ratingPoints} / 10</p>
                                                }
                                            </div>
                                        </div>
                                    </li>
                                </Link>
                            })}
                        </ul>
                        : <p className={styles['no-results']}>No matches found...</p>
                    }
                </div>
            </div>


        </section>
    );
};