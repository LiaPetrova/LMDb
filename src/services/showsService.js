import { addDoc, collection, getDocs, orderBy, query, serverTimestamp, arrayUnion, doc, getDoc, updateDoc, arrayRemove, setDoc, FieldValue, increment, deleteField, deleteDoc } from "firebase/firestore";
import { firestore } from "../firebase_setup/firebase";


const movieCollection = collection(firestore, "movies");
const seriesCollection = collection(firestore, "series");


export const addNewShow = async (type, showData) => {
    let collectionType = type === 'Movie' ? movieCollection : seriesCollection;
    try {
        const data = {
            ...showData,
            rating: {
                ratingPoints: 0,
                usersRated: []
            },
            createdAt: serverTimestamp()
        };
       const result =  await addDoc(collectionType, data);

        return {id: result.id, fields: data};
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


export const editShow = async (type, showId, showData) => {
    let showType = '';
    if (type === 'Movie') {
        showType = 'movies'
    } else if (type === 'Series') {
        showType = 'series'
    }
    const currentShowRef = doc(firestore, showType, showId);
    try {

        const result = await updateDoc(currentShowRef, {
            ...showData
        });
        return result;

    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

export const deleteShow = async (showId, type) => {
    let showType = '';
    if (type === 'Movie') {
        showType = 'movies'
    } else if (type === 'Series') {
        showType = 'series'
    }
    const currentShowRef = doc(firestore, showType, showId);
    return await deleteDoc(currentShowRef);
};

export const getOne = async (showId, type) => {
    let showType = '';
    if (type === 'Movie') {
        showType = 'movies'
    } else if (type === 'Series') {
        showType = 'series'
    }
    const showRef = doc(firestore, showType, showId);
    try {
        const result = await getDoc(showRef);
        const id = result.id;
        const fields = result.data();
        return { id, fields };
    } catch (err) {
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
        const userWatchlist = result.data().watchlist;
        return userWatchlist;
    } catch (err) {
        console.error(err);
        alert(err.message);
    }

};


export const handleRating = async (action, type, userId, showId, ratePoints, usersRatedCount, oldRatingPoints, userHasRated, currentUserRating) => {
    let showType = '';
    if (type === 'Movie') {
        showType = 'movies'
    } else if (type === 'Series') {
        showType = 'series'
    }
    const currentShowRef = doc(firestore, showType, showId);

    let newRatingPoints = 0;

    if (action === 'send') {
        if (userHasRated) {

            newRatingPoints = ((oldRatingPoints * usersRatedCount) - currentUserRating + ratePoints) / usersRatedCount;
        } else {
            newRatingPoints = ((oldRatingPoints * usersRatedCount) + ratePoints) / (usersRatedCount + 1);
            usersRatedCount++;
        }

        await setDoc(currentShowRef, { rating: { usersRated: { [userId]: ratePoints }, ratingPoints: newRatingPoints } }, { merge: true });

    } else if (action === 'remove') {
        newRatingPoints = ((oldRatingPoints * usersRatedCount) - currentUserRating) / (usersRatedCount - 1) || 0;
        usersRatedCount--;

        await setDoc(currentShowRef, { rating: { usersRated: { [userId]: deleteField() }, ratingPoints: newRatingPoints } }, { merge: true });
    }
    return {newRatingPoints, usersRatedCount};
};



