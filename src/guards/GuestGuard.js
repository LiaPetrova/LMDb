import { Navigate, Outlet } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuthContext } from "../contexts/AuthContext";

export const GuestGuard = ({ children }) => {
    const { currentUser } = useAuthContext();
    if (currentUser?.uid) {
        toast.error('You are already logged in!');
        return <Navigate to='/' replace />
    }
    return children ? children : <Outlet />;
};