import * as AuthActions from '../constants/ActionTypes';


const initialState = {
  loaded: false
};

export function reducer(state = initialState, action = {}) {
    switch (action.type) {
        case AuthActions.LOAD:
            return {
                ...state,
                loading:true
            }
        case AuthActions.LOAD_SUCCESS:
            return {
                ...state,
                loading: false,
                loaded: true,
                user: action.result
            };
        case AuthActions.LOAD_FAIL:
            return {
                ...state,
                loading: false,
                loaded: false,
                error: action.error
            };
        case AuthActions.LOGIN:
            return {
                ...state,
                loggingIn: true
            };
        case AuthActions.LOGIN_SUCCESS:
            return {
                ...state,
                loggingIn: false,
                user: action.result
            };
        case AuthActions.LOGIN_FAIL:
            return {
                ...state,
                loggingIn: false,
                user: null,
                loginError: action.error
            };
        case AuthActions.LOGOUT:
            return {
                ...state,
                loggingOut: true
            };
        case AuthActions.LOGOUT_SUCCESS:
            return {
                ...state,
                loggingOut: false,
                user: null
            };
        case AuthActions.LOGOUT_FAIL:
            return {
                ...state,
                loggingOut: false,
                logoutError: action.error
            };
        default:
            return state;
    }
}

