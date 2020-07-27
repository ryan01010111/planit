import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import auth from '../auth';
import TextInput from './TextInput';

export default class Register extends Component {
    state = {
        values: {
            username: '',
            email: '',
            password: '',
            passwordConf: ''
        },
        errorMsg: null
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
        const { username, email, password, passwordConf } = this.state.values;
        const usernameRegex = /^[a-z0-9-_]+$/i;
        const emailRegex = /\S+@\S+\.\S+/;
        const passwordRegex = /^[a-z0-9-_!@#$%&*?]+$/i;
        let errorMsg = null;
        if (username.length < 4 || !usernameRegex.test(username)) {
            errorMsg = 'Your username should be at least 4 characters long, and contain only letters, numbers, and underscores';
        } else if (!emailRegex.test(email)) {
            errorMsg = 'Please enter a valid email address';
        } else if (password.length < 6 || !passwordRegex.test(password)) {
            errorMsg = 'Your password should be at least 6 characters long, and contain only letters, numbers, and/or the following: _!@#$%&*';
        } else if (password !== passwordConf) {
            errorMsg = "Those passwords don't match";
        } else {
            const success = await auth.register(username, email, password);
            errorMsg = !success
                ? 'That username and/or email address is already registered'
                : null
        }
        this.setState({ 
            values: {
                ...this.state.values,
                username: '',
                email: '',
                password: '',
                passwordConf: ''
            },
            errorMsg
        })
    }

    render() {
        if (auth.isAuthenticated()) {
            return <Redirect to="/intro" />
        }

        const { username, email, password, passwordConf } = this.state.values;

        return (
            <div id="register-container">
                <h1>Let's get you set up.</h1>
                <form onSubmit={this.onSubmit}>
                    {this.state.errorMsg && <p>{this.state.errorMsg}</p>}
                    <TextInput
                        type="text"
                        name="username"
                        placeholder="username"
                        value={username}
                        onChange={this.handleChange}
                        autofocus={true}
                    />
                    <TextInput
                        type="text"
                        name="email"
                        placeholder="email address"
                        value={email}
                        onChange={this.handleChange}
                    />
                    <TextInput
                        type="password"
                        name="password"
                        placeholder="password"
                        value={password}
                        onChange={this.handleChange}
                    />
                    <TextInput
                        type="password"
                        name="passwordConf"
                        placeholder="confirm password"
                        value={passwordConf}
                        onChange={this.handleChange}
                    />
                    <button
                        type="submit"
                        disabled={!username || !email || !password || !passwordConf}
                    >
                        Register
                    </button>
                </form>
                <p>Have an account?</p>
                <Link to="/login">Log in</Link>
            </div>
        )
    }
}
