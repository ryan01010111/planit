import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Auth from '../auth';

function Header() {
    const path = useLocation().pathname;

    return (
        <header>
            <img id="logo-main"
                src="../../static/frontend/images/logo.png"
                alt="logo"
            />
            <nav>
                {!Auth.isAuthenticated()
                    ? (
                        <ul>
                            {path !== '/login' &&
                                <li id="nav-login"><Link to="/login">Login</Link></li>
                            }
                            {!['/register', '/forgot_password', '/password_reset'].includes(path) &&
                                <li id="nav-register"><Link to="/register">Register</Link></li>
                            }
                            {path !== '/about' &&
                                <li id="nav-about"><Link to="/about">About</Link></li>
                            }
                        </ul>
                    ) : (
                        <ul>
                            {Auth.isAuthenticated() && path !== '/logout' &&
                                <li id="nav-logout"><Link to="/logout">Logout</Link></li>
                            }
                        </ul>
                    )
                }
            </nav>
        </header>
    )
}

export default Header;
