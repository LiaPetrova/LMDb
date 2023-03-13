import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../../firebase_setup/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "./Login.css";
import { logIn, registerWithGoogle } from "../../../services/authService";
import { useAuthContext } from "../../../contexts/AuthContext";
export const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading] = useAuthState(auth);
    const { currentUser } = useAuthContext();
    const navigate = useNavigate();
    useEffect(() => {
        if (loading) {
            // maybe trigger a loading screen
            return;
        }
        if (currentUser) {
            console.log('already logged in');
            navigate('/');
        };
    }, [currentUser]);

    const onLoginHandler = async (e) => {
        e.preventDefault();
        const result = await logIn(email, password);
        navigate('/');
        return result;
    };

    const onGoogleRegisterHandler = () => {
        registerWithGoogle();
    }

    return (
        <div className="login">
            <div className="login__container">
                <form className="login__container" onSubmit={onLoginHandler}>
                    <input
                        type="text"
                        className="login__textBox"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="E-mail Address"
                    />
                    <input
                        type="password"
                        className="login__textBox"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                    />
                    <button
                        className="login__btn"
                    >
                        Login
                    </button>
                </form>
                <button className="login__btn login__google" onClick={onGoogleRegisterHandler}>
                    Login with Google
                </button>
                <div className="login__link">
                    <Link to="/reset">Forgot Password</Link>
                </div>
                <div className="login__link">
                    Don't have an account? <Link to="/register">Register</Link> now.
                </div>
            </div>

        </div>
    )
}