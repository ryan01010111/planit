import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const IntroMessage = ({ end }) => {
    useEffect(() => {
        if (end) {
            document.querySelector('#intro-get-started').classList.remove('animate-get-started');
        }
    }, [end])

    return (
        <div id="intro-dialog-container">
            <div id="teacher-container">
                <img id="intro-teacher" src="../../static/frontend/images/teacher-sad.png" alt="sad teacher"/>
            </div>
            {!end
                ? (
                    <div id="intro-dialog">
                        <p>Hi there!</p>
                        <p>Need a lesson plan too?</p>
                        <p>You're in the right place!</p>
                        
                    </div>
                ) : (
                    <div id="intro-dialog">
                        <p>Click "Get started" to claim your first lesson plan!</p>
                        <Link to="/">
                            <button
                                id="intro-get-started"
                                className="animate-get-started"
                            >
                                Get started
                            </button>
                        </Link>
                    </div>
                )
            }
        </div>
    )
}

//PropTypes
IntroMessage.propTypes = {
    end: PropTypes.bool.isRequired
}

export default IntroMessage;
