import React from 'react';
import {ErrorMessage} from 'formik';
import PropTypes from 'prop-types';
import cn from 'classnames';

import './FormErrorMessage.scss';

const FormErrorMessage = ({name, modifier, isLoginPage, isSignupPage}) => {
    const divClass = cn(`form-error-message`, `form-error-message--${modifier}`,
        {'form-error-message--login': isLoginPage, 'form-error-message--signup': isSignupPage});

    return (
        <ErrorMessage name={name}>
            {(message) => (
                <div className={divClass}>
                    {message}
                </div>
            )} 
        </ErrorMessage>
    );
}

FormErrorMessage.propTypes = {
    name: PropTypes.string.isRequired,
    modifier: PropTypes.string.isRequired,
    isLoginPage: PropTypes.bool,
    isSignupPage: PropTypes.bool,
}

export {FormErrorMessage};
