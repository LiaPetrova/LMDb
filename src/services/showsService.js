import { addDoc, collection, getDocs, orderBy, query, serverTimestamp, arrayUnion, doc, getDoc, updateDoc, arrayRemove } from "firebase/firestore";
import { firestore } from "../firebase_setup/firebase";


const movieCollection = collection(firestore, "movies");
const seriesCollection = collection(firestore, "series");


export const addNewShow = async (type, showData) => {
    let collectionType = type === 'Movie' ? movieCollection : seriesCollection;
    try {
        await addDoc(collectionType, {
            ...showData,
            rating: '',
            createdAt: serverTimestamp()
        });
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

export const getAll = async (type) => {
    let collectionType = type === 'Movie' ? movieCollection : seriesCollection;

    const orderedQuery = query(collectionType, orderBy('createdAt', 'desc'));
    try {
        const result = await getDocs(orderedQuery)
            .then(docs => {
                let arr = [];

                docs.forEach((doc) => {
                    let fields = doc.data();

                    arr.push({
                        id: doc.id,
                        fields: fields
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

export const getOne = async (showId, type) => {
    let showType = '';
    if(type === 'Movie') {
        showType = 'movies'
    } else if (type === 'Series') {
        showType = 'series'
    }
    const showRef = doc(firestore, showType, showId);
    try {
        const result = await getDoc(showRef);
        const id = result.id;
        const fields = result.data();
    return {id, fields};
    } catch(err) {
        console.error(err);
        alert(err.message);
    }
};


export const addToWishList = async (type, userId, showId) => {
    const currentUserRef = doc(firestore, 'users', userId);

    await updateDoc(currentUserRef, {
        watchlist: arrayUnion({ showId, type })
    });
};

export const removeFromWatchlist = async (type, userId, showId) => {
    const currentUserRef = doc(firestore, 'users', userId);
    await updateDoc(currentUserRef, {
        watchlist: arrayRemove({ showId, type })
    });
};

export const getAllFromWatchlist = async (userId) => {
    const currentUserRef = collection(firestore, 'users');
    try {
        const result = await getDoc(doc(currentUserRef, userId))
        // .then(doc => doc.data().watchlist);
        const watchlist = result.data().watchlist;
        return watchlist;
    } catch (err) {
        console.error(err);
        alert(err.message);
    }

};

