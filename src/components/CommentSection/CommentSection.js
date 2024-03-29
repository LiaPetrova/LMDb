import { useEffect, useState } from 'react';
import { useAuthContext } from '../../contexts/AuthContext';
import { useInput } from '../../hooks/useInput';
import { getAllComments, postComment } from '../../services/commentsService';
import validationFunctions from '../../utils/validationFunctions/validationFunctions';
import { CommentItem } from './CommentItem/CommentItem';
import styles from './CommentSection.module.css';

export const CommentSection = ({ showId }) => {

    const [openWriteReview, setOpenWriteReview] = useState(false);
    const commentContent = useInput(validationFunctions.textIsLength);
    const { currentUser } = useAuthContext();
    const [comments, setComments] = useState([]);


    useEffect(() => {
        getAllComments(showId)
            .then(result => {
                setComments(result)
            });

    }, [showId]);


    const postCommentHandler = async () => {
        if(commentContent.fieldIsValid) {
            await postComment(showId, currentUser.uid, commentContent.value)
                .then(result => setComments(state => [...state, result]));
            commentContent.fieldReset();
        }
    };
    
    return (
        <>

            <section className={styles['comment-section']}>
                {comments.length > 0 ? comments.map(x =>
                    <CommentItem
                        setOpenWriteReview={setOpenWriteReview}
                        comment={x}
                        key={x.id}
                        userId={currentUser?.uid}
                        setComments={setComments}
                    />)
                    : <p className={styles['no-results']}>No reviews yet...</p>}
                {currentUser?.uid && !openWriteReview && <button
                    onClick={() => setOpenWriteReview(true)}
                    className={`btn ${styles['btn-write-review']}`}

                >
                    Write your review
                </button>}
                {openWriteReview &&
                    <div className={styles['write-review']}>

                        {commentContent.hasError && <p className={'alert'}>Your review must be at least 10 characters long!</p>}
                        <textarea
                            className={`input ${commentContent.hasError && 'input-alert'} box-shadow`}
                            value={commentContent.value}
                            onChange={commentContent.onChange}
                            onBlur={commentContent.onBlur}
                            name="comment"
                            id="comment"
                            cols="30" rows="10"
                            autoFocus
                            ></textarea>
                        <div className={styles.buttons}>
                            <button
                                onClick={() => setOpenWriteReview(false)}
                                className={`btn cancel`}>
                                Cancel
                            </button>
                            <button
                            disabled={!commentContent.fieldIsValid}
                                onClick={() => postCommentHandler()}
                                className={`btn`}>
                                Send
                            </button>

                        </div>
                    </div>}
            </section>
        </>
    );
}