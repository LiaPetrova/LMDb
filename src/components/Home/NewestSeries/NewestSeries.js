import { Link } from "react-router-dom";
import { useShowsContext } from "../../../contexts/ShowsConext";
import Loader from "../../shared/Loader/Loader";
import ShowCard from "../../shared/ShowCard/ShowCard";

export const NewestSeries = ({ styles }) => {
    const { seriesList } = useShowsContext();
    console.log(seriesList);

    return (
        <section className={styles.section}>
            <Link className="link" to='/series'>
                <div className={styles['title-wrapper']}>
                    <div className={styles.devider}></div>
                    <h2 className={styles.title}>Newest series</h2>
                    <i className="fa-solid fa-angle-right"></i>
                </div>
            </Link>
            <div className={styles.series}>
                {seriesList.length > 0 ? seriesList.slice(0,5).map(x =>
                    <ShowCard key={x.id} show={x.fields} id={x.id} page='Home'/>)
                    : <Loader />}
            </div>
        </section>
    );
};