import {LOGIN} from "../actions";

const signin = (state, action) => {
    switch (action.type) {
        case LOGIN:
            console.log("login!!")
            return {
                ...state,
                isAuthenticated: true
            };
        default:
            return state;
    }
};

export default signin;