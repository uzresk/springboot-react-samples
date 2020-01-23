import {LOGIN, LOGIN_ERROR} from "../actions";

const signin = (state, action) => {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                isAuthenticated: true
            };
        case LOGIN_ERROR:
            return {
                ...state,
                isAuthenticated: false,
                errorMessage: "ログインに失敗しました。ID,パスワードを確認してください。",
            };
        default:
            return state;
    }
};

export default signin;