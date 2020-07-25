import React from 'react';
import times from 'lodash.times';

import './Spinner.scss';

const Spinner = () => (
    <div className="spinner">
        <div className="spinner-content">
            {times(12, () => <div />)}
        </div>
    </div>
);

export {Spinner};
