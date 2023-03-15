import { useState } from 'react';
import styles from './AddNew.module.css';

export const AddNew = () => {

    const [imageList, setImageList] = useState(['']);

    const addNewInput = (e) => {
        e.preventDefault();
        return (
            <input type="text" id='imgUrl' name='imgUrl' className={styles.input} />
        );
    };

    const handleInputChange = (e, index) => {
        const { value } = e.target;
        const list = [...imageList];
        list[index] = value;
        setImageList(list);
    };

    // handle click event of the Remove button
    const handleRemoveClick = (e, index) => {
        e.preventDefault();
        const list = [...imageList];
        list.splice(index, 1);
        setImageList(list);
    };

    // handle click event of the Add button
    const handleAddClick = () => {
        setImageList([...imageList, '']);
    };

    return (
        <section action="" className={styles['form']}>
            <h2 className={styles.heading}>Add new title</h2>
            <form action="" className={styles.form}>
                <label htmlFor="title">Title</label>
                <input type="text" name='title' id='title' className={styles.input} />
                <label htmlFor="year">Year</label>
                <input type="number" name='year' id='year' className={styles.input} />
                <label htmlFor="genre">Genre</label>
                <input type="text" name='genre' id='genre' className={styles.input} />
                <label htmlFor="desc">Description</label>
                <textarea name='desc' id='desc' className={styles.input} />
                <div className={styles.images}>
                    <label htmlFor="imgUrl">Image URL</label>
                    {/* <button onClick={addNewInput} className={`btn`}><i className="fa-solid fa-plus"></i></button> */}
                    {imageList.map((x, i) => {
                        return (
                            <div className="box" key={i}>
                                <input
                                className={styles.input}
                                    name="imgUrl"
                                    value={x}
                                    onChange={e => handleInputChange(e, i)}
                                />

                                <div className="btn-box">
                                    {imageList.length !== 1 && <button
                                        className="btn"
                                        onClick={(e) => handleRemoveClick(e, i)}><i className="fa-solid fa-minus"></i></button>}
                                    {imageList.length - 1 === i && <button className="btn" onClick={handleAddClick}><i className="fa-solid fa-plus"></i></button>}
                                </div>
                            </div>
                        );
                    })}
                    <div style={{ marginTop: 20 }}>{JSON.stringify(imageList)}</div>
                </div>
            </form>
        </section>
    )
};