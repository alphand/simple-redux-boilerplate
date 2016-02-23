import React, { Component } from 'react';
import MainLayout from '../../../containers/Layout/MainLayout'
import { LoginView } from '../components'

class AuthApp extends Component {
    render() {
        return(
            <MainLayout>
                <LoginView />
            </MainLayout>
        )
    }
}

export default AuthApp;