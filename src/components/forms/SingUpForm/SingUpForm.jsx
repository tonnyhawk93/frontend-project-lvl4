import React, {useCallback, useState} from "react";
import { useTranslation } from "react-i18next";
import {Redirect} from 'react-router-dom';
import * as yup from 'yup';
import { useFormik } from "formik";
import cn from "classnames";
import 'regenerator-runtime/runtime.js';
import axios from 'axios';
import useAuth from '../../../hooks';
import routes from '../../../routes.js';

const fetchSingUpData = async (values) => {
    const {data} = await axios.post(routes.signupPath(), values);

    return data;
}

const SingUpForm = () => {
    const {logIn} = useAuth();
    const {t} = useTranslation();
    const [submited, setSubmited] = useState(false);
    
    const validationSchema = yup.object({
        username: yup
          .string(t('singUpForm.errors.usernameIsRequired'))
          .required(t('singUpForm.errors.usernameIsRequired'))
          .min(3, t('singUpForm.errors.usernameMinCount'))
          .max(20, t('singUpForm.errors.usernameMaxCount')),
        password: yup
          .string(t('singUpForm.errors.passwordIsRequired'))
          .min(6, t('singUpForm.errors.passwordMinCount'))
          .required(t('singUpForm.errors.passwordIsRequired')),
        confirmationPassword: yup
          .string(t('singUpForm.errors.passwordIsRequired'))
          .required(t('singUpForm.errors.passwordIsRequired'))
          .oneOf([yup.ref('password'), null], t('singUpForm.errors.passwordsNotEqual')),
      });

    const onSubmit = useCallback(async ({username, password}, { setSubmitting, setErrors }) => {
        const user = {username, password};

        try {
            const data = await fetchSingUpData(user);
            logIn(data);
            setSubmitting(false);
            setSubmited(true);
        } catch (error) {
            setErrors({singup: 'Пользователь с таким ником уже существует'})
            setSubmitting(false);
        }
    }, [logIn]);

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
            confirmationPassword: '',
        },
        validationSchema,
        onSubmit,
      });

    return (
        <div>
            {submited && <Redirect to='/'/>}
            <h2>{t('singUpForm.title')}</h2>
            <form onSubmit={formik.handleSubmit}>
                <div className="form-group mb-2">
                    <input
                        id="username"
                        name="username"
                        placeholder={t('singUpForm.usernamePlaceholder')}
                        className={cn("form-control", {"is-invalid" : formik.touched.username && (formik.errors.username || formik.errors.singup)})}
                        value={formik.values.username}
                        onChange={formik.handleChange}
                        required
                    />
                    {(formik.errors.username || formik.errors.singup) && formik.touched.username && (
                        <div className="invalid-feedback">{formik.errors.username || formik.errors.singup}</div>
                    )}
                </div>
                <div className="form-group mb-2">
                    <input
                        id="password"
                        name="password"
                        placeholder={t('singUpForm.passwordPlaceholder')}
                        type="password"
                        className={cn("form-control", {"is-invalid" : formik.touched.password && formik.errors.password})}
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        required
                    />
                    {formik.errors.password && formik.touched.password && (
                        <div className="invalid-feedback">{formik.errors.password}</div>
                    )}
                </div>
                <div className="form-group">
                    <input
                        id="confirmationPassword"
                        name="confirmationPassword"
                        placeholder={t('singUpForm.passwordConfirmationPlaceholder')}
                        type="password"
                        className={cn("form-control", {"is-invalid" : formik.touched.confirmationPassword && formik.errors.confirmationPassword})}
                        value={formik.values.confirmationPassword}
                        onChange={formik.handleChange}
                        required
                    />
                    {formik.errors.confirmationPassword && formik.touched.confirmationPassword && (
                        <div className="invalid-feedback">{formik.errors.confirmationPassword}</div>
                    )}
                </div>
                <button type="submit" className="btn btn-outline-primary mt-3" disabled={formik.isSubmitting}>
                    {t('singUpForm.buttonText')}
                </button>
            </form>
        </div>
    )
}

export default SingUpForm;

