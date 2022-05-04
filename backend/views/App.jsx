import { Router } from 'express';
import React from 'react';
import ReactDOM from 'react-dom';

const App = () => {
    return (
        <Router>
            <Switch>
                <Router path="/pay">
                    <Pay/>
                </Router>
                <Router path="/success">
                    <Success/>
                </Router>                
            </Switch>    
        </Router>
    )
}

export default App