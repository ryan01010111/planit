import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import auth from '../auth';

const Logout = () => {
    useEffect(() => {
        auth.logout();
    }, [])

    return (
        <div id="logout-container">
            <h3>You've been logged out.</h3>
            <h1>Come back again soon!</h1>
            <Link to="/login"><button>Log in</button></Link>
        </div>
    )
}

export default Logout;
