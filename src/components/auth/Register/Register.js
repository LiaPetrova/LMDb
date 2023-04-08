import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
    auth,
} from "../../../firebase_setup/firebase";
import { useInput } from "../../../hooks/useInput";
import { registerWithEmail, registerWithGoogle } from "../../../services/authService";
import validationFunctions from "../../../utils/validationFunctions/validationFunctions";

const Register = () => {
    const [user, loading] = useAuthState(auth);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);


    const email = useInput(validationFunctions.emailIsValid);
    const name = useInput(validationFunctions.nameIsLength);
    const password = useInput(validationFunctions.passwordIsLength);
    const repeatPassword = useInput(validationFunctions.isEqual.bind(null, password.value));

    const formIsValid =
        email.fieldIsValid
        && password.fieldIsValid
        && password.fieldIsValid
        && repeatPassword.fieldIsValid;




    const onRegisterHandler = async (e) => {
        e.preventDefault();
        if (formIsValid) {
            setIsLoading(true);
            try {
                await registerWithEmail(name.value, email.value, password.value);
                navigate('/');
                toast.success(`Welcome, ${name.value}`);
            } catch (err){
                password.fieldReset();
                repeatPassword.fieldReset();
                toast.error('Email is already taken!');
            }
        }
        setIsLoading(false);
    };

    const onGoogleRegisterHandler = () => {
        registerWithGoogle();
    };


    useEffect(() => {
        if (loading) {
            return;
        }
    }, [user, loading]);
    return (
        <section className="form-section auth">
            <div className="login__container">
                <form className="form" onSubmit={onRegisterHandler}>
                    <h2 className={'heading'}>Register</h2>
                    <div className={'input-box'}>
                        {/* <label className={'label'} htmlFor="email">Email</label> */}
                        {email.hasError && <p className={'alert'}>Email must be valid!</p>}
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
                        {name.hasError && <p className={'alert'}>Full name must be at least 5 characters long!</p>}

                        <input
                            type="text"
                            className={`input ${name.hasError ? 'input-alert' : ''}`}
                            value={name.value}
                            onChange={name.onChange}
                            onBlur={name.onBlur}
                            placeholder="Full Name"
                            id="name"
                        />
                    </div>
                    <div className={'input-box'}>
                        {/* <label className={'label'} htmlFor="password">Password</label> */}
                        {password.hasError && <p className={'alert'}>Password must be at least 6 characters long!</p>}

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
                    <div className={'input-box'}>
                        {/* <label className={'label'} htmlFor="password">Password</label> */}
                        {repeatPassword.hasError && <p className={'alert'}>Passwords don't match!</p>}

                        <input
                            type="password"
                            className={`input ${repeatPassword.hasError ? 'input-alert' : ''}`}
                            value={repeatPassword.value}
                            onChange={repeatPassword.onChange}
                            onBlur={repeatPassword.onBlur}
                            placeholder="Repeat Password"
                            id="repeatPassword"
                        />
                    </div>
                    <button
                        disabled={!formIsValid || isLoading}
                        className="btn action-btn"
                    >
                        Register
                    </button>
                </form>
                <button className={`btn google-btn action-btn`} onClick={onGoogleRegisterHandler}>
                    Register with Google
                </button>
                <div className="link anchor">
                    Already have an account? <Link className="link" to="/login">Login</Link> now.
                </div>
            </div>

        </section>
    );
};

export default Register;
