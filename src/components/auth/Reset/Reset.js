import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../../contexts/AuthContext";
import { auth } from "../../../firebase_setup/firebase";
import { useInput } from "../../../hooks/useInput";
import { sendPasswordReset } from "../../../services/authService";
import validationFunctions from "../../../validationFunctions/validationFunctions";
import styles from './Reset.module.css';

export const Reset = () => {
    const email = useInput(validationFunctions.emailIsValid);

    const [loading, error] = useAuthState(auth);
    const { currentUser } = useAuthContext();
    const [isLoading, setIsLoading] = useState(false);
    const [notificationModal, setNotificationModal] = useState(false);

    const navigate = useNavigate();

    const formIsValid = email.fieldIsValid;


    useEffect(() => {
        if (currentUser?.uid) {
            navigate("/");
        }
    }, [currentUser, loading]);

    const onPasswordResetHandler = async (e) => {
        e.preventDefault();
        if (formIsValid) {
            await sendPasswordReset(email.value);
            setNotificationModal(true);
        };
    };

    const closeNotificationModal = () => {
        setNotificationModal(false);
        navigate('/login');
    };


    return (

        <>
            <section className={`${styles.modal} ${notificationModal ? styles['active'] : styles['inactive']}`} >
                <div className={styles['modal-content']}>
                    <span onClick={closeNotificationModal} className={styles['close']}>&times;</span>
                    <h2 className={styles.title}>Password reset link sent! Check your email!</h2>

                    <div className={styles['action-btns']}>
                        <button
                            onClick={() => closeNotificationModal()}
                            className={`btn`}
                        >Okey
                        </button>
                    </div>
                </div>
            </section>

            <section className="form-section auth">
                <form className="form" onSubmit={onPasswordResetHandler}>
                    <h2 className={'heading'}>Reset Password</h2>
                    <div className={'input-box'}>
                        {/* <label className={'label'} htmlFor="email">Email</label> */}
                        {email.hasError && <p className={'alert'}>Email should be valid!</p>}
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

                    <button
                        disabled={!formIsValid || isLoading}
                        className={`btn action-btn reset-pass`}
                    >
                        Send password reset email
                    </button>
                </form>
                <div className="link anchor">
                    Don't have an account? <Link className="link" to="/register">Register</Link> now.
                </div>
            </section>
        </>
    );
};
