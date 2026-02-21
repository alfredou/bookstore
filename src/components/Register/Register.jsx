import { Formik, Field, Form, ErrorMessage } from "formik"
import { NavLink } from "react-router-dom"
import Button from "../Button/Button"
import { useContext, useState } from "react"
import { AuthContext } from "../../context/AuthContext"
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from "react-router-dom"
import { apiUrl } from "../../services/api"
import './register.css'
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const registerSuccess = () => toast.success('User registered successfully');


function Register() {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    return (
        <Formik
            initialValues={{
                username: '',
                email: '',
                password: '',
                confirmPassword: ''
            }}
            validate={(valores) => {
                let errors = {}

                if (!valores.username) {
                    errors.username = 'Please type a name'
                } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.username)) {
                    errors.username = 'Username can only contain letters and spaces'
                }

                if (!valores.email) {
                    errors.email = 'Please type an email'
                } else if (!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(valores.email)) {
                    errors.email = 'Email format is not valid';
                }

                if (!valores.password) {
                    errors.password = 'Please type a password'
                } else if (valores.password.length < 8) {
                    errors.password = 'The password must be at least 8 characters long'
                } else if (valores.username && valores.password.toLowerCase().includes(valores.username.toLowerCase())) {
                    errors.password = 'The password cannot contain your username'
                }

                if (!valores.confirmPassword) {
                    errors.confirmPassword = 'Please confirm your password'
                } else if (valores.password !== valores.confirmPassword) {
                    errors.confirmPassword = 'Passwords do not match'
                }

                return errors
            }}
            onSubmit={(values, { resetForm }) => {
                setLoading(true)
                const { confirmPassword, ...credentials } = values; // Quitamos confirmPassword antes de enviar al backend
                apiUrl.post('/auth/register', credentials)
                    .then(() => {
                        registerSuccess()
                        resetForm()
                        setLoading(false)
                        setTimeout(() => navigate('/login'), 1500)
                    }).catch((e) => {
                        setLoading(false)
                        const errorMessage = e.response?.data?.message || 'An error has ocurred';
                        toast.error(errorMessage);
                        console.log(e);
                    })
            }}>

            {({ errors }) => (
                <Form className="register">
                    <Toaster
                        position="bottom-right"
                        reverseOrder={false}
                    />
                    <div className="register__card">
                        <h2 className="register__title">Create Account</h2>

                        <div className="register__container">
                            <label htmlFor="username" className="register__text">Username</label>
                            <Field
                                type="text"
                                id="username"
                                name="username"
                                className="register__input"
                                placeholder="John Doe"
                                autoComplete="username"
                            />
                            <ErrorMessage name="username" component={() => (
                                <div className="error">{errors.username}</div>
                            )} />
                        </div>

                        <div className="register__container">
                            <label htmlFor="email" className="register__text">Email</label>
                            <Field
                                type="text"
                                id="email"
                                name="email"
                                className="register__input"
                                placeholder="john@example.com"
                                autoComplete="email"
                            />
                            <ErrorMessage name="email" component={() => (
                                <div className="error">{errors.email}</div>
                            )} />
                        </div>

                        <div className="register__container">
                            <label htmlFor="password" className="register__text">Password</label>
                            <div className="input-group">
                                <Field
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    name="password"
                                    className="register__input"
                                    placeholder="Password"
                                    autoComplete="new-password"
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

                        <div className="register__container">
                            <label htmlFor="confirmPassword" className="register__text">Confirm Password</label>
                            <div className="input-group">
                                <Field
                                    type={showConfirmPassword ? "text" : "password"}
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    className="register__input"
                                    placeholder="Confirm Password"
                                    autoComplete="new-password"
                                />
                                <button
                                    type="button"
                                    className="password-toggle"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                >
                                    <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} />
                                </button>
                            </div>
                            <ErrorMessage name="confirmPassword" component={() => (
                                <div className="error">{errors.confirmPassword}</div>
                            )} />
                        </div>

                        <div className="register__actions">
                            <Button type="submit" buttonStyle="btn--primary--solid" buttonSize="btn--large" loading={loading}>Register</Button>
                        </div>

                        <div className="register__footer">
                            <span className="register__footer-text">Already have an account?</span>
                            <NavLink className="register__create" to="/login">Login</NavLink>
                        </div>
                    </div>
                </Form>
            )}
        </Formik>
    )
}

export default Register