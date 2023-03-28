import { useState } from 'react';
import { useAuthContext } from '../../contexts/AuthContext';
import { postComment } from '../../services/commentsService';
import styles from './CommentSection.module.css';

export const CommentSection = ({showId}) => {
   
    const [openWriteReview, setOpenWriteReview] = useState(false);
    const [commentContent, setCommentContent] = useState('');
    const {currentUser} = useAuthContext();

    const changeHandler = (e) => {
        setCommentContent(e.target.value)
    };

    const postCommentHandler = async () => {
       const result = await postComment(showId, currentUser.uid, commentContent);
       console.log(result);
    }
    return (
        <section>
            {currentUser?.uid && !openWriteReview && <button
                onClick={() => setOpenWriteReview(true)}
                className={`btn`}>
                Write your review
            </button>}
            {openWriteReview &&
                <div className={styles['write-review']}>
                    <textarea onChange={changeHandler} value={commentContent} name="comment" id="comment" cols="30" rows="10"></textarea>
                    <button
                onClick={() => postCommentHandler()}
                className={`btn`}>
                Send
            </button>
                </div>}
        </section>
    );
}