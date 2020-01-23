import {LOGIN_INIT, LOGIN, LOGIN_ERROR} from "../actions";

const signin = (state, action) => {
    switch (action.type) {
        case LOGIN_INIT:
            return {
                ...state,
                loading: true,
                isAuthenticated: false,
            };
        case LOGIN:
            return {
                ...state,
                loading: true,
                isAuthenticated: true
            };
        case LOGIN_ERROR:
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                errorMessage: "ログインに失敗しました。ID,パスワードを確認してください。",
            };
        default:
            return state;
    }
};

export default signin;