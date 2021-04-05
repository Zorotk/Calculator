import React from 'react';


import Calculator from "./components/Calculator";

import {BrowserRouter, Switch, Route} from 'react-router-dom'

const App = () => {
    return (
        <BrowserRouter>
            <div className="app">
                <Switch>
                    <Route>
                        <Calculator/>
                    </Route>
                </Switch>
            </div>
        </BrowserRouter>
    );
};

export default App;
