import React from "react";
import { useTranslation } from "react-i18next";
import {Link} from "react-router-dom";

const FormContainer = ({children, withRegistatrationLink = true}) => {
    const {t} = useTranslation();

    return (
        <div className="card">
            <div className="card-body row p-5">
                <div className="col-12 d-flex align-items-center justify-content-center">
                    {children}
                </div>
            </div>
            {withRegistatrationLink && 
            <div className="card-footer p-4">
                <div className="text-center">
                    <span>{t('logInForm.registrationLinkText')} <Link to='/singup'>{t('singUpForm.title')}</Link></span>
                </div>
            </div>}
        </div>
    )
}

export default FormContainer;