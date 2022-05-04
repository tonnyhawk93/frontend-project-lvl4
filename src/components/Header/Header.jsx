import React from 'react';
import { Link, Redirect} from 'react-router-dom';

import useAuth from '../../hooks';

const Header = () => {
    const {loggedIn, logOut} = useAuth();

    return (
        <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
            <div className="container">
                <Link className='navbar-brand' to="/">Hexlet Chat</Link>
                {loggedIn &&
                  <button className='btn btn-primary' onClick={logOut}>Выйти</button> 
                }
            </div>
        </nav>
    )
}

export default Header;