import { Navigate, Outlet } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuthContext } from "../contexts/AuthContext";

export const AdminGuard = ({ children }) => {
    const { isAdmin, loading } = useAuthContext();
    if (!isAdmin && !loading) {
        toast.error('Only admins have access to this page!')
        return <Navigate to='/' replace />
    }

    return children ? children : <Outlet />
};