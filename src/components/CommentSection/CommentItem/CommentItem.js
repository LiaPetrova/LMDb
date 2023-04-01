import { useState } from 'react';
import { deleteComment, removeReaction, sendReaction, updateComment } from '../../../services/commentsService';
import { timeAgoHandler } from '../../../utils/timeAgoHadler';
import styles from './CommentItem.module.css';
import { DeleteModal } from './DeleteModal/DeleteModal';

export const CommentItem = ({
    comment,
    userId,
    setOpenWriteReview,
    setComments
}) => {

    const [hasLiked, setHasLiked] = useState(comment.fields.likes.includes(userId));
    const [hasDisliked, setHasDisliked] = useState(comment.fields.dislikes.includes(userId));
    const [likesCount, setLikesCount] = useState(comment.fields.likes.length);
    const [dislikesCount, setDislikesCount] = useState(comment.fields.dislikes.length);
    const [openEditComment, setOpenEditComment] = useState(false);
    const [commentContent, setCommentContent] = useState(comment.fields.commentContent);

    const [deleteModal, setDeleteModal] = useState(false);

    const openDeleteModal = () => setDeleteModal(true);
    const closeDeleteModal = () => setDeleteModal(false);

    const sendReactionHandler = (reaction) => {
        sendReaction(reaction, comment.id, userId);
        if (reaction === 'like') {
            setHasLiked(true);
            setLikesCount(state => state + 1);
        } else {
            setHasDisliked(true);
            setDislikesCount(state => state + 1);
        }
    };

    const removeReactionHandler = (reaction) => {
        removeReaction(reaction, comment.id, userId);

        if (reaction === 'like') {
            setHasLiked(false);
            setLikesCount(state => state - 1);
        } else {
            setHasDisliked(false);
            setDislikesCount(state => state - 1);
        }

    };

    const changeHandler = (e) => {
        setCommentContent(e.target.value);
    };

    const updateCommentHandler = () => {
        updateComment(comment.id, commentContent);
        setOpenEditComment(false);
    };

    const deleteCommentHandler = () => {
        deleteComment(comment.id);
        setComments(state => state.filter(x => x.id !== comment.id));
    };



    const timeAgo = timeAgoHandler(comment.fields.createdAt);
    return (
        <>
            <DeleteModal
                closeDeleteModal={closeDeleteModal}
                deleteModal={deleteModal}
                deleteCommentHandler={deleteCommentHandler}
            />
            <article className={styles['comment-wrapper']}>
                <header className={styles['header']}>
                    <p className={styles['author']}>{comment.fields.ownerName}</p>
                    <div className={styles['header-right']}>
                        <span>Likes: {likesCount}</span>
                        <span>Dislikes: {dislikesCount}</span>
                    </div>

                </header>
                {openEditComment ?
                    <div className={styles['edit-container']}>
                        <textarea
                            autoFocus
                            onFocus={(e) => e.currentTarget.setSelectionRange(e.currentTarget.value.length, e.currentTarget.value.length)}
                            className={`box-shadow ${styles.text} ${styles['content']}`}
                            onChange={changeHandler}
                            value={commentContent}
                            name="comment"
                            id="comment">
                        </textarea>
                        <div className={styles.buttons}>
                            <button
                                onClick={() => setOpenEditComment(false)}
                                className='btn'>Cancel</button>
                            <button
                                onClick={() => updateCommentHandler()}
                                className='btn'>
                                Update
                            </button>
                        </div>
                    </div>
                    : <div className={styles['content']}>
                        <div className={styles.buttons}>
                            {userId === comment.fields.ownerId ?
                                <>
                                    <button
                                        onClick={() => {
                                            setOpenWriteReview(false);
                                            setOpenEditComment(true);
                                        }}
                                        className={styles.edit}>
                                        <i className="fa-solid fa-pen-to-square"></i>
                                    </button>
                                    <button
                                        onClick={openDeleteModal}
                                        className={styles.delete}>
                                        <i className="fa-solid fa-trash"></i>
                                    </button>
                                </>
                                : <>
                                    {(!hasLiked && !hasDisliked) ?
                                        <>
                                            <button
                                                onClick={() => sendReactionHandler('like')}
                                                className={styles.like}>
                                                <i className={`fa-solid fa-thumbs-up ${styles['like']}`}></i>
                                            </button>
                                            <button
                                                onClick={() => sendReactionHandler('dislike')}
                                                className={styles.dislike}>
                                                <i className={`fa-solid fa-thumbs-down ${styles['dislike']}`}></i>
                                            </button>
                                        </>
                                        : hasLiked ?
                                            <button
                                                onClick={() => removeReactionHandler('like')}
                                                className={styles.like}>
                                                <i className={`fa-solid fa-thumbs-up ${styles['selected']} ${styles['like']}`}></i>
                                            </button>
                                            : <button
                                                onClick={() => removeReactionHandler('dislike')}
                                                className={styles.dislike}>
                                                <i className={`fa-solid fa-thumbs-down ${styles['selected']} ${styles['dislike']}`}></i>
                                            </button>

                                    }
                                </>
                            }
                        </div>
                        <p className={styles.text}>{commentContent}</p>
                        <span className={styles.date}>{timeAgo}</span>
                    </div>
                }

            </article >
        </>
    );
}