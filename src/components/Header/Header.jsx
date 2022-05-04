import React from 'react';
import { Link} from 'react-router-dom';
import { useTranslation } from "react-i18next";

import useAuth from '../../hooks';

const Header = () => {
    const {loggedIn, logOut} = useAuth();
    const {t} = useTranslation();

    return (
        <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
            <div className="container">
                <Link className='navbar-brand' to="/">{t('header.logoText')}</Link>
                {loggedIn &&
                  <button className='btn btn-primary' onClick={logOut}>{t('header.buttonText')}</button> 
                }
            </div>
        </nav>
    )
}

export default Header;