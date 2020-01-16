import React from 'react';
import '../App.css';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Signin from "./Signin";
import Signup from "./Signup";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={Signin}/>
                    <Route exact path="/signup" component={Signup}/>
                </Switch>
            </BrowserRouter>
        </div>
    );
}

export default App;
