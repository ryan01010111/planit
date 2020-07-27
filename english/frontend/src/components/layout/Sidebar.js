import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import auth from '../auth';

export default function Sidebar(props) {
    const path = useLocation().pathname;

    const getStyle = () => {
        if (props.display) {
            return {
                transform: 'translateX(0)'
            };
        }
        return {
            transform: 'translateX(-244px)'
        };
    }

    const toggleFilter = () => {
        document.querySelector('#filter-container').classList.toggle('hide-filter-sm');
    }

    const toggleSidebar = () => {
        props.toggleDisplay('sidebar')
    }

    return (
        <div id="sidebar" style={getStyle()}>
            <div id="sidebar-content">
                <Link to="/account"
                    onClick={toggleSidebar}
                >
                    <p id="username">{auth.state.user.username}</p>
                </Link>
                <div className="sidebar-item">
                    <Link to="/"
                        onClick={toggleSidebar}
                    >
                        My Materials
                    </Link>
                </div>
                <div className="sidebar-item">
                    <Link to="/materials"
                        onClick={toggleSidebar}
                    >
                        Lesson Plans
                    </Link>
                </div>
                <div className="sidebar-item">
                    <Link to="/account"
                        onClick={toggleSidebar}
                    >
                        Account
                    </Link>
                </div>
                <div className="sidebar-item">
                    <Link to="/about"
                        onClick={toggleSidebar}
                    >
                        About
                    </Link>
                </div>
                <p id="copyright">{String.fromCharCode(169)} Copyright 2020</p>
            </div>
            <div id="sidebar-icons">
                <svg id="toggle-sidebar-svg"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                    onClick={toggleSidebar}
                >
                    <path id="toggle-sidebar-path"
                        d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163
                        0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837
                        0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837
                        0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"
                    />
                </svg>
                {(path === '/' || path === '/materials') &&
                    <svg id="toggle-filter-svg"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                        onClick={toggleFilter}
                    >
                            <path id="toggle-filter-path"
                                d="M487.976 0H24.028C2.71 0-8.047 25.866 7.058 40.971L192 225.941V432c0 7.831 3.821 15.17
                                10.237 19.662l80 55.98C298.02 518.69 320 507.493 320 487.98V225.941l184.947-184.97C520.021
                                25.896 509.338 0 487.976 0z"
                            />
                    </svg>
                }
            </div>
        </div>
    )
    
}

// PropTypes
Sidebar.propTypes = {
    display: PropTypes.bool.isRequired,
    toggleDisplay: PropTypes.func.isRequired
}
