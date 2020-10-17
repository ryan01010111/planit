class Auth {
    constructor() {
        this.state = {
            isAuthenticated: null,
            token: localStorage.getItem('token'),
            user: null
        }
    }

    isAuthenticated = () => {
        return this.state.isAuthenticated;
    }

    headerTemplate = () => {
        let header = { 'Content-Type': 'application/json' }
        if (this.state.token) {
            header = {
                ...header,
                'Authorization': `token ${this.state.token}`
            }
        };
        return header
    }

    register = async (username, email, password) => {
        const res = await fetch('/api/auth/register', {
            method: "POST",
            headers: this.headerTemplate(),
            body: JSON.stringify({ username, email, password })
        });
        if (res.status != 200) {
            this.state.isAuthenticated = false;
            return false;
        } else {
            const data = await res.json();
            localStorage.setItem('token', data.token)
            this.state = {
                ...this.state,
                isAuthenticated: true,
                token: data.token,
                user: data.user
            }
            return true;
        }
    }

    login = async (username, password) => {
        const res = await fetch('/api/auth/login', {
            method: 'POST',
            headers: this.headerTemplate(),
            body: JSON.stringify({ username, password })
        });
        if (res.status != 200) {
            this.state.isAuthenticated = false;
            return false;
        } else {
            const data = await res.json();
            localStorage.setItem('token', data.token);
            this.state = {
                ...this.state,
                isAuthenticated: true,
                token: data.token,
                user: data.user
            }
            return true;
        }
    }

    logout = async () => {
        const res = await fetch('/api/auth/logout', {
            method: 'POST',
            headers: this.headerTemplate()
        })
        if (res.status != 204) {
            return false;
        } else {
            localStorage.removeItem('token');
            this.state = {
                ...this.state,
                isAuthenticated: false,
                token: null,
                user: null
            }
            return true;
        }
    }

    loadUser = async () => {
        const token = this.state.token;
        if (token) {
            const res = await fetch('/api/auth/user', {
                method: 'GET',
                headers: this.headerTemplate()
            });
            const data = await res.json();
            if (!data.username) {
                localStorage.removeItem('token');
                this.state = {
                    ...this.state,
                    isAuthenticated: false,
                    token: null,
                    user: null
                }
                return false;
            } else {
                this.state = {
                    ...this.state,
                    isAuthenticated:
                        true,
                    user: data
                }
                return true;
            }

        } else {
            this.state.isAuthenticated = false;
            return false;
        }
    }

    requestPasswordReset = async email => {
        try {
            const res = await fetch('/api/auth/password_reset/', {
                method: 'POST',
                headers: this.headerTemplate(),
                body: JSON.stringify({ email })
            });
            const success = res.status === 200;
            return { success };
        } catch (e) {
            return { success: false };
        }
    }

    resetPassword = async (token, password) => {
        try {
            const res = await fetch('/api/auth/password_reset/confirm/', {
                method: 'POST',
                headers: this.headerTemplate(),
                body: JSON.stringify({ token, password })
            });
            const success = res.status === 200;
            return { success };
        } catch (e) {
            return { success: false };
        }
    }
}

export default new Auth();
