import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify";
import { logout } from "../../../services/authService";

export const Logout = () => {

    const navigate = useNavigate();
    logout()
    .then(x => {
        navigate('/');
        toast.success('You\'re now logged out!')
    });

    
}