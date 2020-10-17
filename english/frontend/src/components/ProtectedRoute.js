import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Auth from './auth';

export default function ProtectedRoute({ component: Component, ...rest }) {
    return (
        <Route {...rest} render={
            props => {
                if (!Auth.isAuthenticated()) {
                    return <Redirect to="/login" />
                } else {
                    return <Component {...props} {...rest} />
                }
            }
        } />
    )
}
