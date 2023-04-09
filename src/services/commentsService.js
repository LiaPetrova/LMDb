import { addDoc, arrayRemove, arrayUnion, collection, deleteDoc, deleteField, doc, getDocs, orderBy, query, serverTimestamp, setDoc, Timestamp, updateDoc, where } from "firebase/firestore";
import { firestore } from "../firebase_setup/firebase";
import { getUserAdditionalData } from "./authService"

const commentCollection = collection(firestore, 'comments');


export const getAllComments = async (showId) => {
    const orderedQuery = query(commentCollection, orderBy('createdAt', 'asc'), where('showId', '==', showId));
    try {
        const result = await getDocs(orderedQuery)
            .then(docs => {
                let arr = [];

                docs.forEach((doc) => {
                    let fields = doc.data();

                    arr.push({
                        id: doc.id,
                        fields: { ...fields, createdAt: fields.createdAt.toDate() }
                    });
                });
                return arr;
            });
        // console.log(result);
        return result;

    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

export const postComment = async (showId, ownerId, commentContent) => {

    const owner = await getUserAdditionalData(ownerId);
    try {
        const result = await addDoc(commentCollection, {
            showId,
            commentContent,
            likes: [],
            dislikes: [],
            ownerId,
            ownerName: owner.name,
            createdAt: serverTimestamp()
        });

        return {
            id: result.id, fields: {
                showId,
                commentContent,
                likes: [],
                dislikes: [],
                ownerId,
                ownerName: owner.name,
                createdAt: Date.now()
            }
        };
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};


export const updateComment = async (commentId, newContent) => {
    const currentCommentRef = doc(firestore, 'comments', commentId);
    try {

        const result = await updateDoc(currentCommentRef, {
           commentContent: newContent
        });
        return result;

    } catch (err) {
        console.error(err);
        alert(err.message);
    }

};

export const deleteComment = async (commentId) => {
    const currentCommentRef = doc(firestore, 'comments', commentId);
    return deleteDoc(currentCommentRef);
};

export const sendReaction = async (reaction, commentId, userId) => {

    const currentCommentRef = doc(firestore, 'comments', commentId);
    try {
        if (reaction === 'like') {
            await updateDoc(currentCommentRef, {
                likes: arrayUnion(userId)
            });
        } else {
            await updateDoc(currentCommentRef, {
                dislikes: arrayUnion(userId)
            });
        }

    } catch (err) {
        console.error(err);
        alert(err.message);
    }

}

export const removeReaction = async (reaction, commentId, userId) => {

    const currentCommentRef = doc(firestore, 'comments', commentId);
    try {
        if (reaction === 'like') {
            await updateDoc(currentCommentRef, {
                likes: arrayRemove(userId)
            });
        } else {
            await updateDoc(currentCommentRef, {
                dislikes: arrayRemove(userId)
            });
        }

    } catch (err) {
        console.error(err);
        alert(err.message);
    }

}