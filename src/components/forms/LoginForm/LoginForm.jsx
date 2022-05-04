import React, {useCallback, useState} from "react";
import { useTranslation } from "react-i18next";
import {Redirect} from 'react-router-dom';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { useFormik } from "formik";
import cn from "classnames";
import 'regenerator-runtime/runtime.js';
import axios from 'axios';
import useAuth from '../../../hooks/index.js';
import routes from '../../../routes.js';

const fetchLogInData = async (values) => {
    const {data} = await axios.post(routes.loginPath(), values);

    return data;
}

const LoginForm = () => {
    const {logIn} = useAuth();
    const {t} = useTranslation();
    const [submited, setSubmited] = useState(false);

    const validationSchema = yup.object({
        username: yup
          .string(t('logInForm.errors.usernameIsRequired'))
          .required(t('logInForm.errors.usernameIsRequired')),
        password: yup
          .string(t('logInForm.errors.usernameIsRequired'))
          .required(t('logInForm.errors.passwordIsRequired')),
      });

    const onSubmit = useCallback(async (values, { setSubmitting, setErrors }) => {
        try {
            const data = await fetchLogInData(values);
            logIn(data);
            setSubmitting(false);
            setSubmited(true);
        } catch ({message}) {
            if ('Network Error') {
                toast.error(t('toasts.errorMessage'));
            }else {
                setErrors({authorization: t('logInForm.errors.authorization')})
                setSubmitting(false);
            }
        }
    }, [logIn]);

    const formik = useFormik({
        initialValues: {
          username: '',
          password: '',
        },
        validationSchema,
        onSubmit,
      });

    return (
        <div>
            {submited && <Redirect to='/'/>}
            <h2>{t('logInForm.title')}</h2>
            <form onSubmit={formik.handleSubmit}>
                <div className="form-group mb-2">
                    <input
                        id="username"
                        name="username"
                        placeholder={t('logInForm.usernamePlaceholder')}
                        className={cn("form-control", {"is-invalid" : formik.errors.authorization})}
                        value={formik.values.username}
                        onChange={formik.handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        id="password"
                        name="password"
                        placeholder={t('logInForm.passwordPlaceholder')}
                        type="password"
                        className={cn("form-control", {"is-invalid" : formik.errors.authorization})}
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        required
                    />
                    {formik.errors.authorization && (
                        <div className="invalid-feedback">{formik.errors.authorization}</div>
                    )}
                </div>
                <button type="submit" className="btn btn-primary mt-3" disabled={formik.isSubmitting}>
                    {t('logInForm.buttonText')}
                </button>
            </form>
        </div>
    )
}

export default LoginForm;

