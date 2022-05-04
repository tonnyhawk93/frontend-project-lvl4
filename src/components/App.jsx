import React, {useState} from "react";
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n';
import AuthContext from "../context";
import LoginPage from "../pages/LoginPage";
import NotFoundPage from "../pages/NotFoundPage";
import ChatsPage from "../pages/ChatsPage";
import SingUpPage from "../pages/SingUpPage";
import {
    Redirect,
    Route,
    Switch,
} from 'react-router-dom';
import useAuth from "../hooks";

const AuthProvider = ({ children }) => {
    const token = Boolean(localStorage.getItem('token'));
    const [loggedIn, setLoggedIn] = useState(token);

    const logIn = ({token, username}) => {
        localStorage.setItem('token', token);
        localStorage.setItem('userName', username)
        setLoggedIn(true);
    }
    const logOut = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userName');
        setLoggedIn(false);
    };
  
    return (
      <AuthContext.Provider value={{ loggedIn, logIn, logOut }}>
        {children}
      </AuthContext.Provider>
    );
  };

const PrivateRoute = ({ children }) => {
    const auth = useAuth();

    return (
        auth.loggedIn ? children : <Redirect to="/login"/>
    );
};

const App = () => {
    return (
        <I18nextProvider i18n={i18n}>
            <AuthProvider>
                <Switch>
                    <Route exact path="/login">
                        <LoginPage />
                    </Route>
                    <Route exact path="/singup">
                        <SingUpPage />
                    </Route>
                    <Route exact path="/">
                        <PrivateRoute>
                            <ChatsPage />
                        </PrivateRoute>
                    </Route>
                    <Route path="*">
                        <NotFoundPage />
                    </Route>
                </Switch>
            </AuthProvider>
        </I18nextProvider>
    );
} 

export default App;