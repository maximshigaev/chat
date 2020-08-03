import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import {observer} from 'mobx-react';

import {StoreContext} from '../../context';

import './MenuTitle.scss';

const MenuTitle = observer(({title, quantity}) => {
    const {currentTheme} = useContext(StoreContext);
    const headingClass = cn(`menu-title`, {'menu-title--light': currentTheme === `light`});

    return (
        <h3 className={headingClass}>
            {title}
            <span>{quantity}</span>
        </h3>
    );
});

MenuTitle.propTypes = {
    title: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
}

export {MenuTitle};
