import React from 'react';
import PropTypes from 'prop-types';

import './MenuTitle.scss';

const MenuTitle = ({title, quantity}) => (
    <h3 className="menu-title">
        {title}
        <span>{quantity}</span>
    </h3>
);

MenuTitle.propTypes = {
    title: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
}

export {MenuTitle};
