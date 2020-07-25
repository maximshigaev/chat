import React, {useContext} from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import {PropTypes} from 'prop-types';

import {loginFormShape} from '../../formShapes';
import {StoreContext} from '../../context';

import './LoginForm.scss';

const LoginForm = ({onSignUpClick: handleSignUpClick}) => {
    const {createProfile} = useContext(StoreContext);
    const handleLoginFormSubmit = (formData) => {
        createProfile({...formData,
            firstName: null,
            lastName: null,
            avatar: null,
            jobTitle: null,
            userName: null,
            skype: null,
            timeZone: null,
            social: {
                fb: null,
                tw: null,
                inst: null,
                lkdn: null,
            },
            isLoggedIn: true,
        }); 
    };

    return (
        <Formik initialValues={loginFormShape.initialValues} onSubmit={handleLoginFormSubmit}
            validationSchema={loginFormShape.schema}
        >
            {({ isValid }) => (
                <Form className="login-form">
                    <ErrorMessage name="email">
                        {(message) => (
                            <div className="login-message login-message--email">
                                {message}
                            </div>
                        )}                   
                    </ErrorMessage>
                    <ErrorMessage name="password">
                        {(message) => (
                            <div className="login-message login-message--password">
                                {message}
                            </div>
                        )}
                    </ErrorMessage>
                    <div className="login-field">
                        <Field className="login-input" type="email" placeholder="Email address" name="email"
                            id="user-email"
                        />
                        <label className="login-label visually-hidden" htmlFor="user-email">
                            Email address
                        </label>
                    </div>
                    <div className="login-field">
                        <Field className="login-input" type="password" placeholder="Password" name="password"
                            id="user-password"
                        />
                        <label className="login-label visually-hidden" htmlFor="user-password">
                            Password
                        </label>
                    </div>
                    <button className="form-btn form-btn--login" type="submit" title="Log in" disabled={!isValid}>
                        Log in
                    </button>
                    <a className="form-btn form-btn--signup" onClick={handleSignUpClick} title="Sign up">
                        Sign up
                    </a>
                </Form>
            )}
        </Formik>
    );
}

LoginForm.propTypes = {
    onSignUpClick: PropTypes.func.isRequired,
}

export {LoginForm};
