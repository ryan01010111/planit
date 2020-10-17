import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import Auth from '../auth';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async e => {
        e.preventDefault();
        const emailRegex = /\S+@\S+\.\S+/;
        if (!email || !emailRegex.test(email)) {
            return setError('Please enter the email address your account is registered with.');
        }
        error && setError('');
        setLoading(true);
        const res = await Auth.requestPasswordReset(email);
        if (res.success) {
            setSuccess(true);
        } else {
            setError('Something went wrong. Please try again.');
        }
        setLoading(false);
    }

    if (Auth.isAuthenticated()) return <Redirect to="/" />

    return (
        <div id="forgot-password-container">
            <h1>Forgot your password?</h1>
            <h4>You can request a link to reset your password by entering your email below.</h4>
            <form onSubmit={handleSubmit}>
                <input type="email"
                    placeholder="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <button type="submit" disabled={loading || success || !email}>Send Link</button>
            </form>
            {success && <p>Please check your email for a link to reset your password.</p>}
            {error && <p>{error}</p>}
        </div>
    )
}

export default ForgotPassword;
