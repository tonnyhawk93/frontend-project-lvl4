import React, { useState, useMemo } from 'react';
import { I18nextProvider } from 'react-i18next';
import 'react-toastify/dist/ReactToastify.min.css';
import { ToastContainer } from 'react-toastify';
import {
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import i18n from '../i18n';
import AuthContext from '../context';
import LoginPage from '../pages/LoginPage';
import NotFoundPage from '../pages/NotFoundPage';
import ChatsPage from '../pages/ChatsPage';
import SingUpPage from '../pages/SingUpPage';
import useAuth from '../hooks';

function AuthProvider({ children }) {
  const [loggedIn, setLoggedIn] = useState(Boolean(localStorage.getItem('token')));

  const logIn = ({ token, username }) => {
    localStorage.setItem('token', token);
    localStorage.setItem('userName', username);
    setLoggedIn(true);
  };
  const logOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    setLoggedIn(false);
  };

  const auth = useMemo(() => ({ loggedIn, logIn, logOut }));

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
}

function PrivateRoute({ children }) {
  const auth = useAuth();

  return (
    auth.loggedIn ? children : <Redirect to="/login" />
  );
}

function App({ socket }) {
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
              <ChatsPage socket={socket} />
            </PrivateRoute>
          </Route>
          <Route path="*">
            <NotFoundPage />
          </Route>
        </Switch>
        <ToastContainer />
      </AuthProvider>
    </I18nextProvider>
  );
}

export default App;
