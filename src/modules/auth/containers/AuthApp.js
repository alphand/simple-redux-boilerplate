import React, { Component } from 'react';
import { LoginView } from '../components'

class AuthApp extends Component {
    render() {
        return(
            <div className="main-container">
                <LoginView />
            </div>
        )
    }
}

export default AuthApp;