import React from 'react';
import { useFormik } from 'formik';
import {loginTC} from "./auth-reducer";
import {useAppDispatch} from "./store";


const Login = () => {
    const dispatch = useAppDispatch()
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false,
        },
        onSubmit: values => {
            dispatch(loginTC(values))
        },
    });
    return (
        <form onSubmit={formik.handleSubmit}>
            <label>Email</label>
            <input
                id="firstName"
                name="email"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.email}
            />
            <label>Password</label>
            <input
                id="lastName"
                name="password"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.password}
            />
            <label>RememberMe</label>
            <input
                id="email"
                name="rememberMe"
                type="radio"
                onChange={formik.handleChange}

            />
            <button type="submit">Submit</button>
        </form>
    );
};

export default Login;
