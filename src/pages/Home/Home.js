import { Hero } from "../../components/Home/Hero/Hero"
import { NewestMovies } from "../../components/Home/NewestMovies/NewestMovies";
import { NewestSeries } from "../../components/Home/NewestSeries/NewestSeries";
import { Top10 } from "../../components/Home/Top10/Top10";
import { useAuthContext } from "../../contexts/AuthContext";
import styles from './Home.module.css';

export const Home = () => {

    const { currentUser } = useAuthContext();
    return (
        <>
            {!currentUser &&
            <Hero />
            }
            <Top10 />
            <NewestMovies styles={styles}/>
            <NewestSeries styles={styles}/>
        </>

    );
}