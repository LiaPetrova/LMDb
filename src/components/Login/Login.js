import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, logInWithEmailAndPassword, signInWithGoogle } from "../../firebase_setup/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "./Login.css";
export const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();
    useEffect(() => {
        if (loading) {
            // maybe trigger a loading screen
            return;
        }
        if (user) {
            navigate("/")
        };
    }, [user, loading]);

    return (
        <form className="login">
            <div className="login__container">
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
                    onClick={() => logInWithEmailAndPassword(email, password)}
                >
                    Login
                </button>
                <button className="login__btn login__google" onClick={signInWithGoogle}>
                    Login with Google
                </button>
                <div className="login__link">
                    <Link  to="/reset">Forgot Password</Link>
                </div>
                <div className="login__link">
                    Don't have an account? <Link to="/register">Register</Link> now.
                </div>
                <Link to='/' className="login__link">Click here</Link>
                <Link to='/'>Click 2</Link>
            </div>
        </form>
    )
}