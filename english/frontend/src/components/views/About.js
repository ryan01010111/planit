import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
    return (
        <div id="about-container">
            <h1>Welcome!</h1>
            <img id="greeting-teacher"
                src="../../static/frontend/images/teacher-happy.png"
                alt="greeting teacher"
            />
            <p>
                <strong>
                    Planit is a platform where ESL teachers can find interesting and
                    engaging lesson plans that get everyone speaking.
                </strong>
            </p>
            <p>
                From our growing selection of lesson plans, you'll find materials
                suitable for all ages and levels, and covering a range of practical
                topics. It's easy to get started, and each plan includes all of the
                necessary resources and instructions. All you have to do is teach!
            </p>
            <Link to="/">
                <button>Home</button>
            </Link>
        </div>
    )
}

export default About;
