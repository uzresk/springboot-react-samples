import {SIGNUP_INIT, SIGNUP, SIGNUP_ERROR} from "../actions";

const initialState = {
    loading: false,
    errorMessage: '',
    signupMessage: '',
};

const signup = (state = initialState, action) => {
    switch (action.type) {
        case SIGNUP_INIT:
            return {
                ...state,
                loading: true,
            };
        case SIGNUP:
            return {
                ...state,
                loading: false,
                signupMessage: "ユーザ登録が成功しました。サインインしてください。"
            };
        case SIGNUP_ERROR:
            return {
                ...state,
                loading: false,
                errorMessage: "登録に失敗しました。",
            };
        default:
            return state;
    }
};
export default signup;