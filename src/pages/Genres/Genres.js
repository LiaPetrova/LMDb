import { GenreCard } from './GenreCard/GenreCard';
import styles from './Genres.module.css';
import sciFi from '../../assets/genres/sci-fi.webp';
import drama from '../../assets/genres/drama.webp';
import comedy from '../../assets/genres/comedy.webp';
import horror from '../../assets/genres/horror.webp';
import thriller from '../../assets/genres/thriller.avif';
import action from '../../assets/genres/action.webp';
import adventure from '../../assets/genres/adventure.webp';
import animation from '../../assets/genres/animation.webp';
import romance from '../../assets/genres/romance.avif';

const Genres = () => {

    const genresList = [
        {
            genre: 'Drama',
            imageUrl: drama,
            linkTo: 'drama'
        },
        {
            genre: 'Comedy',
            imageUrl: comedy,
            linkTo: 'comedy'
        },
        {
            genre: 'Horror',
            imageUrl: horror,
            linkTo: 'horror'
        },
        {
            genre: 'Triller',
            imageUrl: thriller,
            linkTo: 'triller'
        },
        {
            genre: 'Action',
            imageUrl: action,
            linkTo: 'action'
        },
        {
            genre: 'Adventure',
            imageUrl: adventure,
            linkTo: 'adventure'
        },
        {
            genre: 'Animation',
            imageUrl: animation,
            linkTo: 'animation'
        },
        {
            genre: 'Romance',
            imageUrl: romance,
            linkTo: 'romance'
        },
        {
            genre: 'Sci-Fi',
            imageUrl: sciFi,
            linkTo: 'sci-Fi'
        },

    ];

    return (
        <section className={styles['genres-section']}>
            
            <ul className={styles['genres-list']}>
                {genresList.map(x => {
                   return <li key={x.genre} className={`${styles['genres-list-item']} box-shadow`}>
                        <GenreCard genreItem={x}  />
                    </li>

                })}
            </ul>
        </section>
    );
};

export default Genres;