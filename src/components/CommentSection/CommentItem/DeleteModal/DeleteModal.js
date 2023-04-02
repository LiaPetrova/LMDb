import styles from './DeleteModal.module.css'

export const DeleteModal = ({
    closeDeleteModal,
    deleteModal,
    deleteCommentHandler
}) => {

    const outsideClickHandler = (e) => {
        if (e.target.tagName === 'SECTION') {
            setTimeout(() => closeDeleteModal(), 300)
            // closeRateModal();
        }
    };

    return (
        <section onClick={outsideClickHandler} className={`${styles.modal} ${deleteModal ? styles['active'] : styles['inactive']}`} >
            <div className={styles['modal-content']}>
                <span onClick={closeDeleteModal} className={styles['close']}>&times;</span>
                <h2 className={styles.title}>Are you sure you want to delete your comment?</h2>

                <div className={styles['action-btns']}>
                    <button
                        onClick={() => closeDeleteModal()}
                        className={`btn`}
                    >Cancel
                    </button>
                    <button
                        onClick={() => deleteCommentHandler()}
                        className={`btn`}
                    >Delete
                    </button>

                </div>

            </div>

        </section>
    );
};