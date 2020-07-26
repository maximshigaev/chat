import React from 'react';
import {ErrorMessage} from 'formik';
import PropTypes from 'prop-types';
import cn from 'classnames';

import './FormErrorMessage.scss';

const FormErrorMessage = ({name, modifier, isLoginPage}) => {
    const divClass = cn(`form-error-message`, `form-error-message--${modifier}`,
        {'form-error-message--login': isLoginPage});

    return (
        <ErrorMessage name={name}>
            {(message) => <div className={divClass}>
                {message}
            </div>} 
        </ErrorMessage>
    );
}

FormErrorMessage.propTypes = {
    name: PropTypes.string.isRequired,
    modifier: PropTypes.string.isRequired,
    isLoginPage: PropTypes.bool,
}

export {FormErrorMessage};
