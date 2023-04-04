import { Link } from 'react-router-dom';
import styles from './GenreCard.module.css';

export const GenreCard = ({ genreItem }) => {
    return <Link to={`/catalog/${genreItem.linkTo}`}>
        <article className={styles['card-container']}>
            <div className={styles.background}></div>
            <img src={genreItem.imageUrl} alt="genre" />
            <div className={styles['text-wrapper']}>
                <p className='box-shadow'>{genreItem.genre}</p>
            </div>
        </article>
    </Link>
}