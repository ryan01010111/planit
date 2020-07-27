import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import auth from '../auth';

function Header() {
    const path = useLocation().pathname;

    return (
        <header>
            <img id="logo-main"
                src="../../static/frontend/images/logo.png"
                alt="logo"
            />
            <nav>
                {!auth.isAuthenticated()
                    ? (
                        <ul>
                            {path !== '/login' &&
                                <li id="nav-login"><Link to="/login">Login</Link></li>
                            }
                            {path !== '/register' &&
                                <li id="nav-register"><Link to="/register">Register</Link></li>
                            }
                            {path !== '/about' &&
                                <li id="nav-about"><Link to="/about">About</Link></li>
                            }
                        </ul>
                    ) : (
                        <ul>
                            {auth.isAuthenticated() && path !== '/logout' &&
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
