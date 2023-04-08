import { memo, useState } from 'react';
import { renderSortedShows } from '../../../utils/renderSortedShows';
import styles from './SortDropDown.module.css';

const SortDropDown = ({ handleCallBack, showsList }) => {

    const [direction, setDirection] = useState('descending');
    const [criteria, setCriteria] = useState('createdAt');


    const changeHandler = (e) => {

        if(e.currentTarget.tagName === 'BUTTON') {
            if (direction === 'descending') {
                setDirection('ascending');
                handleCallBack(renderSortedShows(showsList, criteria, 'ascending'));

            } else if (direction === 'ascending') {
                setDirection('descending');
                handleCallBack(renderSortedShows(showsList, criteria, 'descending'));
            }
        } else {
            setCriteria(e.target.value);
            handleCallBack(renderSortedShows(showsList, e.target.value, direction));
        }
    };
    return (
        <div className={styles['sort-drop-down']}>
            <span>Sort By:</span>
            <select className={styles['select']} name="criteria" id="criteria" onChange={changeHandler}>
                <option value="createdAt">New</option>
                <option value="year">Year</option>
                <option value="rating">Rating</option>
                <option value="title">Title</option>
            </select>
            <button name='direction' onClick={changeHandler}>
                {direction === 'descending' ? <i className="fa-solid fa-arrow-down-wide-short"></i>
                    : <i className="fa-solid fa-arrow-up-wide-short"></i>}
            </button>
        </div>
    );
};

export default memo(SortDropDown);