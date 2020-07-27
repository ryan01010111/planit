import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import auth from './auth';
import Loading from './views/Loading';
import Header from './layout/Header';
import Login from './views/Login';
import Logout from './views/Logout';
import Register from './views/Register';
import About from './views/About';
import Dashboard from './views/Dashboard';

export default class App extends Component {
    constructor(props) {
        super(props)
        this.state = { loading: true }
        auth.loadUser().then(() => {
            this.setState({ ...this.state, loading: false });
        });
    }

    render() {
        return (
            <Router>
                <Header />
                <main>
                    {this.state.loading
                        ? <Loading />
                        : (
                            <Switch>
                                <Route path="/login">
                                    <Login />
                                </Route>
                                <ProtectedRoute path="/logout"
                                    component={Logout}
                                />
                                <Route path="/register">
                                    <Register />
                                </Route>
                                <Route path="/about">
                                    <About />
                                </Route>
                                <ProtectedRoute path="/"
                                    component={Dashboard}
                                />
                            </Switch>
                        )
                    }
                </main>
            </Router>
        )
    }
}
