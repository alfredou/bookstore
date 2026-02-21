import { Formik, Form, Field, ErrorMessage } from "formik";
import { NavLink } from "react-router-dom";
import Button from "../Button/Button";
import './login.css'
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom"
import { apiUrl } from "../../services/api";
import toast, { Toaster } from 'react-hot-toast';
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const loginSuccess = () => toast.success('User logged sucessfully');


function Login() {
    const { user, loading, error, dispatch } = useContext(AuthContext)
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false)

    useEffect(() => {
        toast.dismiss()
        toast.remove()
    }, [])

    return (
        <Formik
            initialValues={{
                username: '',
                password: ''
            }}
            validate={(valores) => {
                let errors = {}

                if (!valores.username) {
                    errors.username = 'Please type a username'
                } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.username)) {
                    errors.username = 'Username can only contain letters and spaces'
                }

                if (!valores.password) {
                    errors.password = 'Please type a password'
                } else if (valores.password.length < 8) {
                    errors.password = 'The password must be at least 8 characters long'
                }

                return errors
            }}
            onSubmit={(credentials) => {
                dispatch({ type: "LOGIN_START" })
                apiUrl.post(`/auth/login`, credentials, {
                    withCredentials: true // Habilitar el manejo de cookies en Axios
                }).then(res => {
                    //console.log(res.data)
                    dispatch({ type: "LOGIN_SUCESS", payload: res.data })
                    loginSuccess()
                    setTimeout(() => navigate("/"), 1000)
                }).catch((e) => {
                    const errorMessage = e.response?.data?.message || 'An error has ocurred';
                    toast.error(errorMessage);
                    dispatch({ type: "LOGIN_FAILURE", payload: e })
                })
            }}
        >
            {({ errors }) => (

                <Form className="login">
                    <Toaster
                        position="bottom-right"
                        reverseOrder={false}
                    />
                    <div className="login__card">
                        <h2 className="login__title">Welcome Back</h2>
                        <div className="login__container">
                            <label htmlFor="username" className="login__Text">Username</label>
                            <Field
                                type="text"
                                id="username"
                                name="username"
                                className="login__input"
                                placeholder="John Doe"
                                autoComplete="username" />

                            <ErrorMessage name="username" component={() => (
                                <div className="error">{errors.username}</div>
                            )} />

                        </div>
                        <div className="login__container">
                            <label htmlFor="password" className="login__Text">Password</label>
                            <div className="input-group">
                                <Field
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    name="password"
                                    className="login__input"
                                    placeholder="Password"
                                    autoComplete="current-password"
                                />
                                <button
                                    type="button"
                                    className="password-toggle"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                                </button>
                            </div>

                            <ErrorMessage name="password" component={() => (
                                <div className="error">{errors.password}</div>
                            )} />
                        </div>
                        <div className="login__actions">
                            <Button type="submit" buttonStyle="btn--primary--solid" buttonSize="btn--large" loading={loading}>Login</Button>
                        </div>
                        <div className="login__footer">
                            <span className="login__footer-text">Don't have an account?</span>
                            <NavLink className="login__create" to="/register">Create account</NavLink>
                        </div>
                    </div>
                </Form>
            )}

        </Formik >
    )
}

export default Login