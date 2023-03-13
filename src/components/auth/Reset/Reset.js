import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../../contexts/AuthContext";
import { auth } from "../../../firebase_setup/firebase";
import { sendPasswordReset } from "../../../services/authService";
import "./Reset.css";
function Reset() {
    const [email, setEmail] = useState("");
    const [ loading, error] = useAuthState(auth);
    const { currentUser } = useAuthContext();
    const navigate = useNavigate();


    useEffect(() => {
        // if (loading) {
        //     return;
        // }
        if (currentUser) {
            navigate("/");
        }
    }, [currentUser, loading]);


    return (
        <div className="reset">
            <div className="reset__container">
                <input
                    type="text"
                    className="reset__textBox"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="E-mail Address"
                />
                <button
                    className="reset__btn"
                    onClick={() => sendPasswordReset(email)}
                >
                    Send password reset email
                </button>
                <div>
                    Don't have an account? <Link to="/register">Register</Link> now.
                </div>
            </div>
        </div>
    );
}
export default Reset;