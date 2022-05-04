import React, {useCallback, useEffect, useState} from "react";
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

const validationSchema = yup.object({
    username: yup
      .string('Enter your username')
      .required('username is required')
      .min(3, 'Имя должно содержать минимум три символа')
      .max(20, 'Имя должно содержать максимум 20 символов'),
    password: yup
      .string('Enter your password')
      .min(6, 'Пароль должени содержать как минимум 6 символов')
      .required('Password is required'),
    confirmationPassword: yup
      .string('Enter your password')
      .required('Password is required')
      .oneOf([yup.ref('password'), null], 'Пароли не совпадают'),
  });

const SingUpForm = () => {
    const {logIn} = useAuth();
    const [submited, setSubmited] = useState(false);

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
            <h2>Регистрация</h2>
            <form onSubmit={formik.handleSubmit}>
                <div className="form-group mb-2">
                    <input
                        id="username"
                        name="username"
                        placeholder="Имя пользователя"
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
                        placeholder="Пароль"
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
                        placeholder="Подтвердите пароль"
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
                    Зарегистрироваться
                </button>
            </form>
        </div>
    )
}

export default SingUpForm;

