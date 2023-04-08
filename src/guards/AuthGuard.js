import { Navigate, Outlet } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuthContext } from "../contexts/AuthContext";

export const AuthGuard = ({ children }) => {
    const { currentUser } = useAuthContext();
    if (!currentUser) {
        toast.warn('You should be logged in to access this page!')
        return <Navigate to='/login' replace />
    }

    return children ? children : <Outlet />;
};