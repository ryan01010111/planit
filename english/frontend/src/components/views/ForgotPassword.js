import React, { useState } from 'react';
import Auth from '../auth';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');

    const handleSubmit = async e => {
        e.preventDefault();
        await Auth.requestPasswordReset(email);
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" name="email" value={email} onChange={e => setEmail(e.target.value)} />
                <button type="submit">Send email</button>
            </form>
        </div>
    )
}

export default ForgotPassword;
