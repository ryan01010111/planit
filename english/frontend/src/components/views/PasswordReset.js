import React, { useState } from 'react';
import { useLocation, Redirect, Link } from 'react-router-dom';
import Auth from '../auth';

const PasswordReset = () => {
    const location = useLocation();
    const token = location.search.split('?token=')[1];
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async e => {
        e.preventDefault();
        const passwordRegex = /^[a-z0-9-_!@#$%&*?]+$/i;
        if (password.length < 8 || !passwordRegex.test(password)) {
            return setError('Your password should be at least 8 characters long, and contain only letters, numbers, and/or the following: _!@#$%&*');
        } else if (!password || !passwordConfirm) {
            return setError('Both fields are required');
        } else if (password !== passwordConfirm) {
            return setError('Those passwords don\'t match');
        }
        error && setError('');
        setLoading(true);
        const res = await Auth.resetPassword(token, password);
        if (res.success) {
            setSuccess(true);
        } else {
            setError('Something went wrong. Please try again. Hint: Passwords that are too common, or too similar to your username are not accepted.');
        }
        setLoading(false);
    }

    if (Auth.isAuthenticated()) return <Redirect to="/" />

    return (
        <div id="password-reset-container">
            <h1>Reset your password</h1>
            <h4>Please enter your new password below.</h4>
            <form onSubmit={handleSubmit}>
                <input type="password"
                    placeholder="new password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <input type="password"
                    placeholder="confirm password"
                    value={passwordConfirm}
                    onChange={e => setPasswordConfirm(e.target.value)}
                />
                <button type="submit"
                    disabled={loading || success || !password || !passwordConfirm}
                >
                    Submit
                </button>
            </form>
            {success && <p>Your password was successfully changed. <Link to="/login">Login</Link></p>}
            {error && <p>{error}</p>}
        </div>
    )
}

export default PasswordReset;
