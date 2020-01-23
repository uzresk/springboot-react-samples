import React, {useContext} from 'react';
import {Redirect, Route} from 'react-router-dom';
import AppContext from "../contexts/AppContexts";

const PrivateRoute = ({component: Component, ...rest}) => {

    const {state} = useContext(AppContext);
    console.log("LoginState: " + state.isAuthenticated);
    return (
        <Route
            {...rest}
            render={({location}) =>
                state.isAuthenticated ? (
                    <Component/>
                ) : (
                    <Redirect to={{
                        pathname: "/",
                        state: {from: location}
                    }}/>
                )
            }/>)
};
export default PrivateRoute;

