import React, {useContext, useState} from 'react';
import {observer} from 'mobx-react';

import {StoreContext} from '../../context';

import './MenuHeader.scss';

const MenuHeader = observer(() => {
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const {updateProfile} = useContext(StoreContext);
    const handleSettingsBtnClick = () => setIsSettingsOpen((prevState) => !prevState);
    const handleLogoutBtnClick = () => updateProfile({});

    return (
        <div className="menu-header">
            <h2 className="menu-title">Nomad List</h2>
            <button className="menu-btn menu-btn--settings" title={isSettingsOpen ? `Close settings` : `Open settings`}
                onClick={handleSettingsBtnClick}
            />
            {isSettingsOpen &&
                <div className="menu-settings">
                    <button className="menu-settings-btn" title="Log out" onClick={handleLogoutBtnClick}>
                        Log out  
                    </button>
                </div>
            }
            <button className="menu-btn menu-btn--dropdown" title="Expand" />
            <p className="menu-intro">All threads</p>
        </div>
    );
});

export {MenuHeader};
