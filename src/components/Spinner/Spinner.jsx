import React from 'react';
import times from 'lodash.times';
import PropTypes from 'prop-types';
import cn from 'classnames';

import './Spinner.scss';

const Spinner = ({size}) => {
    const divClass = cn(`spinner`, {'spinner--middle': size === `middle`});

    return (
        <div className={divClass}>
            {times(12, () => <div key={Math.random()} className="spinner-petal" />)}
        </div>
    );
}

Spinner.propTypes = {
    size: PropTypes.string,
}

export {Spinner};
