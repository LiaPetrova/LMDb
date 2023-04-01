import styles from './SearchPanel.module.css'
export const SearchPanel = ({
    closeSearchPanel,
    searchPanel,
}) => {

    const outsideClickHandler = (e) => {
        if (e.target.tagName === 'SECTION') {
            setTimeout(() => closeSearchPanel(), 300)
            // closeRateModal();
        }
    };

    return (
        <section onClick={outsideClickHandler} className={`${styles.modal} ${searchPanel ? styles['active'] : styles['inactive']}`} >
            <div className={styles['modal-content']}>
                <span onClick={closeSearchPanel} className={styles['close']}>&times;</span>
                <h2 className={styles.title}>Search results</h2>


            </div>

        </section>
    );
};