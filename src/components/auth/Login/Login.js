import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../../firebase_setup/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { logIn, registerWithGoogle } from "../../../services/authService";
import { useAuthContext } from "../../../contexts/AuthContext";
import userValidation from "../../../validationFunctions/validationFunctions";
import { useInput } from "../../../hooks/useInput";


export const Login = () => {

    const [loading] = useAuthState(auth);
    const { currentUser } = useAuthContext();
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();


    const email = useInput(userValidation.isEmpty);
    const password = useInput(userValidation.isEmpty);

    const formIsValid = email.fieldIsValid && password.fieldIsValid;


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
        if(formIsValid) {
            setIsLoading(true);
            const result = await logIn(email.value, password.value);
            navigate('/');
            return result;
        }
        setIsLoading(false);
    };

    const onGoogleRegisterHandler = () => {
        registerWithGoogle();
    };

    return (
        <section className="form-section auth">
            <div className="login__container">
                <form className="form" onSubmit={onLoginHandler}>
                    <h2 className={'heading'}>Login</h2>
                    <div className={'input-box'}>
                        {/* <label className={'label'} htmlFor="email">Email</label> */}
                        {email.hasError && <p className={'alert'}>Email is required!</p>}
                        <input
                            type="text"
                            className={`input ${email.hasError && 'input-alert'}`}
                            value={email.value}
                            onChange={email.onChange}
                            onBlur={email.onBlur}
                            placeholder="E-mail Address"
                            id="email"
                        />
                    </div>
                    <div className={'input-box'}>
                        {/* <label className={'label'} htmlFor="password">Password</label> */}
                        {password.hasError && <p className={'alert'}>Password is required!</p>}

                        <input
                            type="password"
                            className={`input ${password.hasError ? 'input-alert': ''}`}
                            value={password.value}
                            onChange={password.onChange}
                            onBlur={password.onBlur}
                            placeholder="Password"
                            id="password"
                        />
                    </div>
                    <button
                    disabled={!formIsValid || isLoading}
                        className="btn action-btn"
                    >
                        Login
                    </button>
                </form>
                <button className={`btn google-btn action-btn`} onClick={onGoogleRegisterHandler}>
                    Login with Google
                </button>
                <div className="link anchor">
                    <Link className="link anchor" to="/reset">Forgot Password</Link>
                </div>
                <div className="link anchor">
                    Don't have an account? <Link className="link" to="/register">Register</Link> now.
                </div>
            </div>

        </section>

    );
};