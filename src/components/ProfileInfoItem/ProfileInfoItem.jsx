import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import {observer} from 'mobx-react';

import {StoreContext} from '../../context';

import './ProfileInfoItem.scss';

const ProfileInfoItem = observer(({title, content}) => {
    const {currentTheme} = useContext(StoreContext);
    const titleSpanClass = cn(`info-item-title`, {'info-item-title--light': currentTheme ===`light`});
    const contentSpanClass = cn(`info-item-content`, {'info-item-content--light': currentTheme ===`light`});

    return (
        <div className="info-item">
            <span className={titleSpanClass}>
                {title}
            </span>
            <span className={contentSpanClass}>
                {content}
            </span>
        </div>
    );
});

ProfileInfoItem.propTypes = {
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
}

export {ProfileInfoItem};
