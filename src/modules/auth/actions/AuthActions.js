import * as AuthActions from '../constants/ActionTypes';

export function isLoaded(globalState) {
    return globalState.auth && globalState.auth.loaded;
}

export function load() {
    return {
        types: [ AuthActions.LOAD, AuthActions.LOAD_SUCCESS, AuthActions.LOAD_FAIL],
        promise: (client) => client.get('/loadAuth')
    };
}

export function login(username, password, rememberMe) {
    return {
        types: [AuthActions.LOGIN, AuthActions.LOGIN_SUCCESS, AuthActions.LOGIN_FAIL],
        promise: (client) => client.post('/login', {
            data: {
                username:username,
                password:password,
                rememberMe:rememberMe
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