import React from "react";
import {Link} from "react-router-dom";

const FormContainer = ({children, withRegistatrationLink = true}) => {
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
                    <span>Нет аккаунта? <Link to='/singup'>Регистрация</Link></span>
                </div>
            </div>}
        </div>
    )
}

export default FormContainer;