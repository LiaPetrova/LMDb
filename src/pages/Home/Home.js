import { Hero } from "../../components/Home/Hero/Hero"
import { useAuthContext } from "../../contexts/AuthContext";

export const Home = () => {

    const { currentUser } = useAuthContext();
    return (
        <>
            {!currentUser &&
            <Hero />
            }
        </>

    );
}