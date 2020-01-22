import React, {useReducer} from 'react';
import '../App.css';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Signin from './Signin'
import Signup from "./Signup";
import Top from './Top';
import Next from './Next';
import AppContext from "../contexts/AppContexts";
import PrivateRoute from "./PrivateRoute";

import reducer from '../reducers'

function App() {

    const initialState = {
        isAuthenticated: false,
    };
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <AppContext.Provider value={{state, dispatch}}>
            <div className="App">
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/" component={Signin}/>
                        <Route exact path="/signup" component={Signup}/>
                        <PrivateRoute path="/top" component={Top}/>
                        <PrivateRoute path="/next" component={Next}/>
                    </Switch>
                </BrowserRouter>
            </div>
        </AppContext.Provider>
    );
}

export default App;
