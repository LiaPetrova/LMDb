import { useEffect, useState } from 'react';
import { useAuthContext } from '../../contexts/AuthContext';
import { getAllComments, postComment } from '../../services/commentsService';
import { CommentItem } from './CommentItem/CommentItem';
import styles from './CommentSection.module.css';

export const CommentSection = ({ showId }) => {

    const [openWriteReview, setOpenWriteReview] = useState(false);
    const [commentContent, setCommentContent] = useState('');
    const { currentUser } = useAuthContext();
    const [comments, setComments] = useState([]);


    useEffect(() => {
        getAllComments(showId)
            .then(result => {
                console.log(result);
                setComments(result)
            });

    }, [showId]);



    const changeHandler = (e) => {
        setCommentContent(e.target.value)
    };

    const postCommentHandler = async () => {
        await postComment(showId, currentUser.uid, commentContent)
            .then(result => setComments(state => [...state, result]));
        setCommentContent('');
    }
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
                        <textarea
                            className={`box-shadow`}
                            onChange={changeHandler}
                            value={commentContent}
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