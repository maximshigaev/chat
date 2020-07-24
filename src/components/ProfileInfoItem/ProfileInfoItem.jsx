import React from 'react';
import PropTypes from 'prop-types';

import './ProfileInfoItem.scss';

const ProfileInfoItem = ({title, content}) => (
    <div className="info-item">
        <span className="info-item-title">
            {title}
        </span>
        <span className="info-item-content">
            {content}
        </span>
    </div>
);

ProfileInfoItem.propTypes = {
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
}

export {ProfileInfoItem};
