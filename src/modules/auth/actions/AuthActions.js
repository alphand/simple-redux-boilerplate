import * as AuthActions from '../constants/ActionTypes';

export function isLoaded(globalState) {
    return globalState.auth && globalState.auth.loaded;
}

export function load() {
    return {
        types: [ AuthActions.LOAD, AuthActions.LOAD_SUCCESS, AuthActions.LOAD_FAIL],
        promise: (client) => {
            console.log('client in AA', client);
            client.get('/loadAuth')
        }
    };
}

export function login(name) {
    return {
        types: [AuthActions.LOGIN, AuthActions.LOGIN_SUCCESS, AuthActions.LOGIN_FAIL],
        promise: (client) => client.post('/login', {
            data: {
                name: name
            }   
        })
    };
}

export function logout() {
    return {
        types: [AuthActions.LOGOUT, AuthActions.LOGOUT_SUCCESS, AuthActions.LOGOUT_FAIL],
        promise: (client) => client.get('/logout')
    };
}