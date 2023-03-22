import { Hero } from "../../components/Home/Hero/Hero"
import { NewestMovies } from "../../components/Home/NewestMovies/NewestMovies";
import { NewestSeries } from "../../components/Home/NewestSeries/NewestSeries";
import { useAuthContext } from "../../contexts/AuthContext";
import styles from './Home.module.css';

export const Home = () => {

    const { currentUser } = useAuthContext();
    return (
        <>
            {!currentUser &&
            <Hero />
            }
            <NewestMovies styles={styles}/>
            <NewestSeries styles={styles}/>
        </>

    );
}