import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logIn, registerWithGoogle } from "../../../services/authService";
import { useInput } from "../../../hooks/useInput";
import validationFunctions from "../../../utils/validationFunctions/validationFunctions";
import { toast } from "react-toastify";


export const Login = () => {

    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();


    const email = useInput(validationFunctions.isEmpty);
    const password = useInput(validationFunctions.isEmpty);

    const formIsValid = email.fieldIsValid && password.fieldIsValid;

    const onLoginHandler = async (e) => {
        e.preventDefault();
        if (formIsValid) {
            setIsLoading(true);
            try {
                await logIn(email.value, password.value);
                navigate('/');
                toast.success('Welcome back!');
            } catch (err) {
                toast.error('Wrong email or password!');
                password.fieldReset();
            }
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
                            className={`input ${password.hasError ? 'input-alert' : ''}`}
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