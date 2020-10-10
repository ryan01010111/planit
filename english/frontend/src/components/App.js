import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import auth from './auth';
import Loading from './views/Loading';
import Header from './layout/Header';
import Login from './views/Login';
import Logout from './views/Logout';
import Register from './views/Register';
import ForgotPassword from './views/ForgotPassword';
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
                                <Route path="/login" component={Login} />
                                <ProtectedRoute path="/logout"
                                    component={Logout}
                                />
                                <Route path="/register" component={Register} />
                                <Route path="/forgot_password" component={ForgotPassword} />
                                <Route path="/about" component={About} />
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
