import { createUserWithEmailAndPassword, GoogleAuthProvider, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import { addDoc, collection, doc, getDoc, getDocs, query, setDoc, where } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { auth, firestore } from '../firebase_setup/firebase';

const googleProvider = new GoogleAuthProvider();
const registerWithGoogle = async () => {
    try {
        const res = await signInWithPopup(auth, googleProvider);
        const user = res.user;
        const q = query(collection(firestore, "users"), where("uid", "==", user.uid));
        const docs = await getDocs(q);
        if (docs.docs.length === 0) {
            await addDoc(collection(firestore, "users"), {
                uid: user.uid,
                name: user.displayName,
                authProvider: "google",
                email: user.email,
            });
        }
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};
const logIn = async (email, password) => {
    await signInWithEmailAndPassword(auth, email, password);

};
const registerWithEmail = async (name, email, password) => {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        const uid = user.uid;
        await setDoc(doc(firestore, "users", uid), {
            name,
            authProvider: "local",
            email,
            watchlist: []
        });
};
const sendPasswordReset = async (email) => {
    try {
        await sendPasswordResetEmail(auth, email);
        // alert("Password reset link sent!");
    } catch (err) {
        console.error(err);
        // alert(err.message);
    }
};
const logout = async () => {
    await signOut(auth);
};

const getUserAdditionalData = async (userId) => {
    const userRef = doc(firestore, 'users', userId);
    try {
        const result = await getDoc(userRef);
        const fields = result.data();
        return fields;
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};
export {
    registerWithGoogle,
    logIn,
    registerWithEmail,
    sendPasswordReset,
    logout,
    getUserAdditionalData
};