import React, { Component, useContext } from 'react';
import { Redirect, Link } from 'react-router-dom';
import TextInput from './TextInput';
import auth from '../auth';

export default class Login extends Component {
    state = {
        values: {
            username: '',
            password: '',
        },
        success: true
    }

    handleChange = (e) => {
        this.setState({
            values: {
                ...this.state.values,
                [e.target.name]: e.target.value
            }
        })
    }

    onSubmit = async (e) => {
        e.preventDefault();
        const { username, password } = this.state.values;
        const success = await auth.login(username, password);
        this.setState({
            values: {
                ...this.state.values,
                username: '',
                password: ''
            },
            success
        })
    }

    render() {
        if (auth.isAuthenticated()) {
            return <Redirect to="/" />
        }

        const { username, password } = this.state.values;

        return (
            <div id="login-container">
                <h1>Welcome!</h1>
                <h4>Sign in to start planning.</h4>
                <form id="login-form" onSubmit={this.onSubmit}>
                    {!this.state.success && <p>Invalid credentials</p>}
                    <TextInput
                        type="text"
                        name="username"
                        placeholder="username"
                        value={username}
                        onChange={this.handleChange}
                        autofocus={true}
                    />
                    <TextInput
                        type="password"
                        name="password"
                        placeholder="password"
                        value={password}
                        onChange={this.handleChange}
                    />
                    <button
                        type="submit"
                        disabled={!username || !password}
                    >
                        Login
                    </button>
                </form>
                <p>No account yet? Let's get started:</p>
                <Link to="/register">
                    <button>Register</button>
                </Link>
            </div>
        )
    }
}
