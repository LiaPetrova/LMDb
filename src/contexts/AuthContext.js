import { onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase_setup/firebase";

export const AuthContext = createContext();
export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(useAuthState(auth));
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => setCurrentUser(user));

        setIsAdmin(currentUser?.uid === process.env.REACT_APP_ADMIN_UID);
        console.log(isAdmin);
        setLoading(false);

        return unsubscribe;
    }, [currentUser, isAdmin]);

    return (
        <AuthContext.Provider value={{ currentUser, loading, isAdmin }}>
            {!loading && children}
        </AuthContext.Provider>
    )

}


