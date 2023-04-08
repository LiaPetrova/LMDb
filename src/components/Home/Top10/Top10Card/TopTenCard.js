import { Link } from 'react-router-dom';
import styles from './TopTenCard.module.css'

export const Top10Card = ({ show, id, index }) => {
    const img = require(`../../../../assets/top10/${index + 1}.png`);


    return (
        <Link className='link' to={`/catalog/${show.type}/${id}`}>
            <article className={styles['top-ten-article']}>
                <div className={styles.wrapper}>
                        <img className={styles.number} src={img} alt="" />
                    <div className={styles['show-img-wrapper']}>
                        <img className={styles['show-img']} src={show.imageList[0]} alt="" />
                    </div>
                </div>
            </article>
        </Link>
    )
};