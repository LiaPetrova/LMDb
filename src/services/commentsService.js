import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { firestore } from "../firebase_setup/firebase";
import { getUserAdditionalData } from "./authService"

const commentCollection = collection(firestore, 'comments');

export const postComment = async (showId, ownerId, commentContent) => {
    
    const owner = await getUserAdditionalData(ownerId);
    console.log(owner);
    try {
        return await addDoc(commentCollection, {
            showId,
            commentContent,
            likes: [],
            dislikes: [],
            ownerId,
            ownerName: owner.name,
            createdAt: serverTimestamp()
        });
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
}