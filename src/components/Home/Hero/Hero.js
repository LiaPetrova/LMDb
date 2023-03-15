import { Link } from 'react-router-dom';
import styles from './Hero.module.css';

export const Hero = () => {
    return (
        <div className={styles.hero}>
            <h1 className={styles['main-title']}>Join the community of LMDb now!</h1>
            <h2 className={styles['sub-title']}>Here we share the passion for old and new movies and series!</h2>
            <button className='btn btn-primary box-shadow'><Link className='link' to='/register'>Register</Link></button>
        </div>
    );
}