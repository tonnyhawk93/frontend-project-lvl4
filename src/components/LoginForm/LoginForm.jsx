import React from "react";
import * as yup from 'yup';
import { useFormik } from "formik";
import cn from "classnames";

const validationSchema = yup.object({
    nickName: yup
      .string('Enter your nickname')
      .required('nickname is required'),
    password: yup
      .string('Enter your password')
      .min(8, 'Password should be of minimum 8 characters length')
      .required('Password is required'),
  });

const handleSubmit = (values, { setSubmitting }) => {
    setTimeout(() => {
    alert(JSON.stringify(values, null, 2));
    setSubmitting(false);
    }, 400);
}

const LoginForm = () => {
    const formik = useFormik({
        initialValues: {
          nickName: '',
          password: '',
        },
        validationSchema,
        onSubmit: handleSubmit,
      });

    return (
        <div>
            <h2>Войти</h2>
            <form onSubmit={formik.handleSubmit}>
                <div className="form-group mb-2">
                    <input
                        id="nickName"
                        name="nickName"
                        placeholder="Ваш ник"
                        className={cn("form-control", {"is-invalid" : formik.errors.firstName && formik.touched.nickName})}
                        value={formik.values.nickName}
                        onChange={formik.handleChange}
                        required
                    />
                    {formik.errors.nickName && formik.touched.nickName && (
                        <div className="invalid-feedback">{formik.errors.firstName}</div>
                    )}
                </div>
                <div className="form-group">
                    <input
                        id="password"
                        name="password"
                        placeholder="Пароль"
                        type="password"
                        className={cn("form-control", {"is-invalid" : formik.errors.password && formik.touched.password})}
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        required
                    />
                    {formik.errors.password && formik.touched.password && (
                        <div className="invalid-feedback">{formik.errors.password}</div>
                    )}
                </div>
                <button type="submit" className="btn btn-primary mt-3">
                    Войти
                </button>
            </form>
        </div>
    )
}

export default LoginForm;