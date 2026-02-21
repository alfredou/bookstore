import "./userinfo.css"
import { Formik, Field, Form, ErrorMessage } from "formik"
import Button from "../Button/Button"
import { useContext } from "react"
import { AuthContext } from "../../context/AuthContext"
import toast, { Toaster } from 'react-hot-toast';
import { apiUrl } from "../../services/api"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faEnvelope, faLock, faCheckCircle } from '@fortawesome/free-solid-svg-icons'

const notify = () => toast.success('Profile updated successfully!', {
    style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
    },
});

const errorNotify = (msg) => toast.error(msg || 'Failed to update profile');

export function UserInfo() {
    const { user, dispatch } = useContext(AuthContext)

    return (
        <Formik
            initialValues={{
                username: user.username,
                email: user.email,
                password: '',
                repeatPassword: ''
            }}
            validate={(valores) => {
                let errors = {}

                if (!valores.username) {
                    errors.username = 'Username is required'
                } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.username)) {
                    errors.username = 'Only letters and spaces allowed'
                }

                if (!valores.email) {
                    errors.email = 'Email is required'
                } else if (!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(valores.email)) {
                    errors.email = 'Invalid email format';
                }

                if (valores.password && !/^.{6,12}$/.test(valores.password)) {
                    errors.password = 'Password must be 6-12 characters'
                }
                if (valores.password !== valores.repeatPassword) {
                    errors.repeatPassword = 'Passwords do not match'
                }
                return errors
            }}
            onSubmit={(credentials, { setSubmitting }) => {
                const { repeatPassword, ...otherData } = credentials

                // Only send password if it's actually changed
                if (!otherData.password) {
                    delete otherData.password;
                }

                apiUrl.patch(`/user/updateUser/${user._id}`, otherData, {
                    withCredentials: true
                }).then((res) => {
                    if (res.data) {
                        dispatch({ type: "LOGIN_SUCESS", payload: res.data })
                        notify()
                    }
                }).catch(err => {
                    errorNotify(err.response?.data?.message);
                }).finally(() => {
                    setSubmitting(false);
                });
            }}>

            {({ errors, isSubmitting }) => (
                <Form className="update__user">
                    <Toaster position="bottom-right" reverseOrder={false} />

                    <header>
                        <h2 className="updateuser__title">Personal Information</h2>
                    </header>

                    <div className="updateuser__grid">
                        <div className="updateuser__container">
                            <label htmlFor="username" className="updateuser__text">Full Name</label>
                            <div className="updateuser__input-wrapper">
                                <Field
                                    type="text"
                                    id="username"
                                    name="username"
                                    className="updateuser__input"
                                    placeholder="Enter your name"
                                    autocomplete="username"
                                />
                                <FontAwesomeIcon icon={faUser} className="updateuser__input-icon" />
                            </div>
                            <ErrorMessage name="username" component={() => (
                                <div className="error">{errors.username}</div>
                            )} />
                        </div>

                        <div className="updateuser__container">
                            <label htmlFor="email" className="updateuser__text">Email Address</label>
                            <div className="updateuser__input-wrapper">
                                <Field
                                    type="email"
                                    id="email"
                                    name="email"
                                    className="updateuser__input"
                                    placeholder="your@email.com"
                                    autocomplete="email"
                                />
                                <FontAwesomeIcon icon={faEnvelope} className="updateuser__input-icon" />
                            </div>
                            <ErrorMessage name="email" component={() => (
                                <div className="error">{errors.email}</div>
                            )} />
                        </div>

                        <div className="updateuser__container">
                            <label htmlFor="password" className="updateuser__text">New Password</label>
                            <div className="updateuser__input-wrapper">
                                <Field
                                    type="password"
                                    id="password"
                                    name="password"
                                    className="updateuser__input"
                                    placeholder="Leave blank to keep current"
                                    autocomplete="new-password"
                                />
                                <FontAwesomeIcon icon={faLock} className="updateuser__input-icon" />
                            </div>
                            <ErrorMessage name="password" component={() => (
                                <div className="error">{errors.password}</div>
                            )} />
                        </div>

                        <div className="updateuser__container">
                            <label htmlFor="repeatPassword" className="updateuser__text">Confirm Password</label>
                            <div className="updateuser__input-wrapper">
                                <Field
                                    type="password"
                                    id="repeatPassword"
                                    name="repeatPassword"
                                    className="updateuser__input"
                                    placeholder="Repeat new password"
                                    autocomplete="new-password"
                                />
                                <FontAwesomeIcon icon={faCheckCircle} className="updateuser__input-icon" />
                            </div>
                            <ErrorMessage name="repeatPassword" component={() => (
                                <div className="error">{errors.repeatPassword}</div>
                            )} />
                        </div>
                    </div>

                    <div className="updateuser__footer">
                        <Button
                            type="submit"
                            buttonStyle="btn--blue--medium"
                            buttonSize="btn--large"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Updating...' : 'Save Changes'}
                        </Button>
                    </div>
                </Form>
            )}
        </Formik>
    )
}
