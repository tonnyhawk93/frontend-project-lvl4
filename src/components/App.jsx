import React, {useState} from "react";
import AuthContext from "../context";
import LoginPage from "../pages/LoginPage";
import NotFoundPage from "../pages/NotFoundPage";
import ChatsPage from "../pages/ChatsPage";
import {
    Redirect,
    Route,
    Switch,
} from 'react-router-dom';
import useAuth from "../hooks";

const AuthProvider = ({ children }) => {
    const token = Boolean(localStorage.getItem('token'));
    const [loggedIn, setLoggedIn] = useState(token);

    const logIn = (token) => {
        localStorage.setItem('token', token);
        setLoggedIn(true);
    }
    const logOut = () => {
      localStorage.removeItem('token');
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
        <AuthProvider>
            <Switch>
                <Route exact path="/login">
                    <LoginPage />
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
    );
} 

export default App;