import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import './ErrorMessage.scss';

const ErrorMessage = ({children, mode}) => {
    const divClass = cn(`error-message`, {[`error-message--${mode}`]: !!mode});

    return (
        <div className={divClass}>
            {children}
        </div>
    );
}

ErrorMessage.propTypes = {
    children: PropTypes.any.isRequired,
    mode: PropTypes.string,
}

export {ErrorMessage};
