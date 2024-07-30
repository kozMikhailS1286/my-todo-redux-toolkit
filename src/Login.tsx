import React from 'react';
import { useFormik } from 'formik';
import {loginTC} from "./auth-reducer";
import {AppRootStateType, useAppDispatch} from "./store";
import {Navigate} from "react-router-dom";
import {useSelector} from "react-redux";


const Login = () => {
    const dispatch = useAppDispatch()
    const isLoggedIn = useSelector<AppRootStateType>(state => state.auth.isLoggedIn)
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

    if (isLoggedIn) {
        return <Navigate to={"/"}/>
    }

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
