import { useNavigate } from "react-router-dom"
import { logout } from "../../firebase_setup/firebase";

export const Logout = () => {
    const navigate = useNavigate();
    logout();
    navigate('/');
}