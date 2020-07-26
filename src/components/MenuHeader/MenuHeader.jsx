import React, {useContext, useState, useCallback} from 'react';
import {observer} from 'mobx-react';

import {StoreContext} from '../../context';

import './MenuHeader.scss';

const MenuHeader = observer(() => {
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const {updateProfile, currentProfile} = useContext(StoreContext);

    const handleSettingsBtnClick = useCallback(() => setIsSettingsOpen((prevState) => !prevState), []);
    const handleLogoutBtnClick = useCallback(() =>{
        updateProfile({
            ...currentProfile,
            isOnline: false,
        }, currentProfile.id);
    }, [updateProfile, currentProfile]);

    return (
        <div className="menu-header">
            <p className="menu-title menu-title--name">
                {currentProfile.userName}
            </p>
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
        </div>
    );
});

export {MenuHeader};
