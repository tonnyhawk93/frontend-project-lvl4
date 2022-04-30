import React from "react";
import LoginPage from "../pages/LoginPage";
import NotFoundPage from "../pages/NotFoundPage";
import {
    Route,
    Switch,
} from 'react-router-dom';

const App = () => (
    <Switch>
        <Route exact path="/login">
            <LoginPage />
        </Route>
        <Route exact path="/">
            <h1>Main</h1>
        </Route>
        <Route path="*">
            <NotFoundPage />
        </Route>
    </Switch>
);

export default App;