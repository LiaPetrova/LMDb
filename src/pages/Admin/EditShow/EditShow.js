import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { editShow, getOne } from "../../../services/showsService";
import styles from '../Admin.module.css';


export const EditShow = () => {
    const { showId, type } = useParams();
    const [show, setShow] = useState({});
    const [values, setValues] = useState({
        type: '',
        title: '',
        year: 0,
        desc: '',
        duration: 0,
        director: ''
    });
    const [imageList, setImageList] = useState(['']);
    const [actorsList, setActorsList] = useState([{ fullName: '', roleName: '', imageUrl: '', wikiUrl: '' }]);
    const [genreList, setGenreList] = useState(['']);
    const navigate = useNavigate();

    useEffect(() => {
        getOne(showId, type)
            .then(result => {
                setShow(result.fields);
                setGenreList(result.fields.genreList);
                setActorsList(result.fields.actorsList);
                setImageList(result.fields.imageList);
                setValues({
                    type: result.fields.type,
                    title: result.fields.title,
                    year: result.fields.year,
                    desc: result.fields.desc,
                    duration: result.fields.duration,
                    director: result.fields.director

                });
            });


    }, [showId, type]);

    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        if (name === 'movieImgUrl') {
            const list = [...imageList];
            list[index] = value;
            setImageList(list);
        } else if (name === 'genre') {
            const list = [...genreList];
            list[index] = value;
            setGenreList(list);
        } else {
            const list = [...actorsList];
            list[index][name] = value;
            setActorsList(list);
        }
    };

    // handle click event of the Remove button
    const handleRemoveClick = (e, index, inputName) => {
        e.preventDefault();
        if (inputName === 'movie') {
            const list = [...imageList];
            list.splice(index, 1);
            setImageList(list);
        } else if (inputName === 'actor') {
            const list = [...actorsList];
            list.splice(index, 1);
            setActorsList(list);
        } else if (inputName === 'genre') {
            const list = [...genreList];
            list.splice(index, 1);
            setGenreList(list);
        }
    };

    // handle click event of the Add button
    const handleAddClick = (e, inputName) => {
        e.preventDefault();
        if (inputName === 'movie') {
            setImageList([...imageList, '']);
        } else if (inputName === 'actor') {
            setActorsList([...actorsList, { fullName: '', roleName: '', imageUrl: '', wikiUrl: '' }])
        } else if (inputName === 'genre') {
            setGenreList([...genreList, '']);
        }
    };

    const handleSimpleInputChange = (e) => {
        setValues(state => ({
            ...state,
            [e.target.name]: e.target.value
        }));
        // console.log(values);
    };

    const editHandler = (e) => {
        e.preventDefault();
        let { type, title, year, desc, duration, director } = values;
        year = Number(year);
        duration = Number(duration);
        const showData = { type, title, year, duration, director, desc, imageList, actorsList, genreList };
        if (type === 'Movie') {
            editShow('Movie', showId, showData);
        } else {
            editShow('Series', showId, showData);
        }
        navigate(`/catalog/${type}/${showId}`);
        console.log(JSON.stringify(showData));
    }



    return (
        <section action="" className={styles['section']}>
            <h2 className={styles.heading}>Edit show</h2>
            <form action="" className={styles.form} onSubmit={editHandler}>
                <div className={styles['input-box']}>
                    <div className={styles.label}>Type of show</div>
                    <div>
                        <input
                            className={styles['input-radio']}
                            type="radio"
                            id='movie'
                            name='type'
                            onChange={handleSimpleInputChange}
                            checked={values.type === 'Movie'}

                        />
                        <label htmlFor="movie">Movie</label>
                    </div>
                    <div>
                        <input
                            className={styles['input-radio']}
                            type="radio"
                            id='series'
                            name='type'
                            onChange={handleSimpleInputChange}
                            checked={values.type === 'Series'}

                        />
                        <label htmlFor="series">Series</label>
                    </div>
                </div>
                <br />
                <div className={styles['input-box']}>
                    <label className={styles.label} htmlFor="title">Title</label>
                    <input
                        type="text"
                        name='title'
                        id='title'
                        className={styles.input}
                        onChange={handleSimpleInputChange}
                        // defaultValue={show.title}
                        value={values.title}
                        required

                    />
                    <div className={styles['input-box']}>
                        <label className={styles.label} htmlFor="year">Year</label>
                        <input
                            type="number"
                            name='year'
                            id='year'
                            className={styles.input}
                            onChange={handleSimpleInputChange}
                            value={values.year}
                            required

                        />
                    </div>
                    <div className={styles['input-box']}>
                        <label className={styles.label} htmlFor="duration">Duration</label>
                        <input
                            type="number"
                            name='duration'
                            id='duration'
                            className={styles.input}
                            onChange={handleSimpleInputChange}
                            value={values.duration}
                            required

                        />
                    </div>
                    <div className={styles['input-box']}>
                        <label className={styles.label} htmlFor="director">Director</label>
                        <input
                            type="text"
                            name='director'
                            id='director'
                            className={styles.input}
                            onChange={handleSimpleInputChange}
                            value={values.director}
                            required

                        />
                    </div>
                    <div className={styles['input-box']}>
                        <label className={styles.label} htmlFor="genre">Genre</label>
                    </div>
                    {genreList?.map((x, i) => {
                        return (
                            <div className="box" key={i}>
                                <input
                                    className={styles.input}
                                    name="genre"
                                    value={x}
                                    onChange={e => handleInputChange(e, i)}
                                    required

                                />

                                <div className="btn-box">
                                    {genreList.length !== 1 && <button
                                        className="btn"
                                        onClick={(e) => handleRemoveClick(e, i, 'genre')}><i className="fa-solid fa-minus"></i></button>}
                                    {genreList.length - 1 === i && <button className="btn" onClick={(e) => handleAddClick(e, 'genre')}><i className="fa-solid fa-plus"></i></button>}
                                </div>
                            </div>
                        );
                    })}


                    <label className={styles.label} htmlFor="desc">Description</label>
                    <textarea
                        name='desc'
                        id='desc'
                        className={`${styles.input} ${styles.textarea}`}
                        onChange={handleSimpleInputChange}
                        value={values.desc}
                        required

                    />
                    <div className={styles.images}>
                        <label className={styles.label} htmlFor="imgUrl">Image URL</label>
                        {imageList.map((x, i) => {
                            return (
                                <div className="box" key={i}>
                                    <input
                                        className={styles.input}
                                        name="movieImgUrl"
                                        value={x}
                                        onChange={e => handleInputChange(e, i)}
                                        required

                                    />

                                    <div className="btn-box">
                                        {imageList.length !== 1 && <button
                                            className="btn"
                                            onClick={(e) => handleRemoveClick(e, i, 'movie')}><i className="fa-solid fa-minus"></i></button>}
                                        {imageList.length - 1 === i && <button className="btn" onClick={(e) => handleAddClick(e, 'movie')}><i className="fa-solid fa-plus"></i></button>}
                                    </div>
                                </div>
                            );
                        })}
                        {/* {imageList.join(', ')} */}

                        <label className={styles.label} htmlFor="imgUrl">Actors</label>

                        {actorsList.map((x, i) => {
                            return (
                                <div key={i}>
                                    <input
                                        className={styles.input}
                                        name="fullName"
                                        placeholder="Full Name"
                                        defaultValue={x.fullName}
                                        onChange={e => handleInputChange(e, i)}
                                        required

                                    />

                                    <input
                                        className={styles.input}
                                        name="roleName"
                                        placeholder="Role Name"
                                        defaultValue={x.roleName}
                                        onChange={e => handleInputChange(e, i)}
                                    />

                                    <input
                                        className={styles.input}
                                        name="imageUrl"
                                        placeholder="Image URL"
                                        defaultValue={x.imageUrl}
                                        onChange={e => handleInputChange(e, i)}
                                        required

                                    />

                                    <input
                                        className={styles.input}
                                        name="wikiUrl"
                                        placeholder="Link to Wikipedia"
                                        defaultValue={x.wikiUrl}
                                        onChange={e => handleInputChange(e, i)}
                                        required

                                    />

                                    <div className="btn-box">
                                        {actorsList.length !== 1 && <button
                                            className="btn"
                                            onClick={(e) => handleRemoveClick(e, i, 'actor')}><i className="fa-solid fa-minus"></i></button>}
                                        {actorsList.length - 1 === i && <button className="btn" onClick={(e) => handleAddClick(e, 'actor')}><i className="fa-solid fa-plus"></i></button>}
                                    </div>
                                </div>
                            )
                        })}

                    </div>

                </div>
                <button className={`btn ${styles['submit-btn']}`}>Submit</button>
            </form>

        </section>
    );
};