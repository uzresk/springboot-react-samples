import React from 'react';
import '../App.css';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={Login}/>
                    <Route exact path="/signup" component={Signup}/>
                </Switch>
            </BrowserRouter>
        </div>
    );
}

export default App;
