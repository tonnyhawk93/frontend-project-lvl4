import React, {useCallback, useEffect, useState} from "react";
import {Redirect} from 'react-router-dom';
import * as yup from 'yup';
import { useFormik } from "formik";
import cn from "classnames";
import 'regenerator-runtime/runtime.js';
import axios from 'axios';
import useAuth from '../../hooks';
import routes from '../../routes.js';

const fetchLogInToken = async (values) => {
    const {data: {token}} = await axios.post(routes.loginPath(), values);

    return token;
}

const validationSchema = yup.object({
    username: yup
      .string('Enter your username')
      .required('username is required'),
    password: yup
      .string('Enter your password')
      .required('Password is required'),
  });

const LoginForm = () => {
    const {logIn} = useAuth();
    const [submited, setSubmited] = useState(false);

    const onSubmit = useCallback(async (values, { setSubmitting, setErrors }) => {
        try {
            const token = await fetchLogInToken(values);
            logIn(token);
            setSubmitting(false);
            setSubmited(true);
        } catch (error) {
            setErrors({authorization: 'Неверные имя пользователя или пароль'})
            setSubmitting(false);
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
            <h2>Войти</h2>
            <form onSubmit={formik.handleSubmit}>
                <div className="form-group mb-2">
                    <input
                        id="username"
                        name="username"
                        placeholder="Ваш ник"
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
                        placeholder="Пароль"
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
                    Войти
                </button>
            </form>
        </div>
    )
}

export default LoginForm;

// const token = localStorage.getItem('token');
            
// const res = await axios.get(routes.dataPath(), {
//     headers: {
//       'authorization': 'Bearer' + ' ' + token
//     }
//   });
