import {LOGIN_INIT, LOGIN, LOGIN_ERROR} from "../actions";

const initialState = {
    loading: false,
    isAuthenticated: false,
    errorMessage: '',
};

const signin = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_INIT:
            return {
                loading: true,
                isAuthenticated: false,
            };
        case LOGIN:
            return {
                loading: true,
                isAuthenticated: true
            };
        case LOGIN_ERROR:
            return {
                loading: false,
                isAuthenticated: false,
                errorMessage: "ログインに失敗しました。ID,パスワードを確認してください。",
            };
        default:
            return state;
    }
};
export default signin;