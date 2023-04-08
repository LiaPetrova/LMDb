import { GenreCard } from './GenreCard/GenreCard';
import styles from './Genres.module.css';

const Genres = () => {

    const genresList = [
        {
            genre: 'Drama',
            imageUrl: 'https://media-cldnry.s-nbcnews.com/image/upload/rockcms/2022-04/220408-titanic-kate-winslet-leonardo-dicaprio-1997-ac-559p-866425.jpg',
            linkTo: 'drama'
        },
        {
            genre: 'Comedy',
            imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFSMtfjI52HK8wyfES8JWFnV8RZCIfNsxH_A&usqp=CAU',
            linkTo: 'comedy'
        },
        {
            genre: 'Horror',
            imageUrl: 'https://media.gq.com/photos/59efa5f866e2d56abcd7a055/16:9/w_2560%2Cc_limit/state-of-horror-gq.jpg',
            linkTo: 'horror'
        },
        {
            genre: 'Triller',
            imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNoqKWwTsQJ9MymHRyQfuk3vuWT6a77LQBkg&usqp=CAU',
            linkTo: 'triller'
        },
        {
            genre: 'Action',
            imageUrl: 'https://www.syfy.com/sites/syfy/files/2019/05/john-wick-2017-image-3840x2400.jpg',
            linkTo: 'action'
        },
        {
            genre: 'Adventure',
            imageUrl: 'https://unitingartists.org/wp-content/uploads/2020/06/Adventure-Genre-800x445.jpg',
            linkTo: 'adventure'
        },
        {
            genre: 'Animation',
            imageUrl: 'https://todaysparent.mblycdn.com/tp/resized/2018/04/600x338/best-animated-movies-for-kids-moana.jpg',
            linkTo: 'animation'
        },
        {
            genre: 'Romance',
            imageUrl: 'https://media1.popsugar-assets.com/files/thumbor/h_ZrSLfWyOr9Q7FsY41nWKGmDaA/fit-in/1200x630/filters:format_auto-!!-:strip_icc-!!-:fill-!white!-/2016/02/09/905/n/1922283/575696e9_edit_img_facebook_post_image_file_2387502_1455050447.jpg',
            linkTo: 'romance'
        },
        {
            genre: 'Sci-Fi',
            imageUrl: 'https://whatnerd.com/wp-content/uploads/2021/05/greatest-sci-fi-movies-memorable-ex-machina.jpg',
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