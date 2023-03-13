import { useNavigate } from "react-router-dom"
import { logout } from "../../../services/authService";

export const Logout = () => {

    const navigate = useNavigate();
    logout()
    .then(x => navigate('/'));
    
}