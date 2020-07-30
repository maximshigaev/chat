import React, {useContext, useState, useCallback} from 'react';
import {observer} from 'mobx-react';

import {StoreContext} from '../../context';

import './MenuHeader.scss';

const MenuHeader = observer(() => {
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const {logOut, currentProfile, setIsMyProfileOpen, isMyProfileOpen} = useContext(StoreContext);

    const handleSettingsBtnClick = useCallback(() => setIsSettingsOpen((prevState) => !prevState), []);
    const handleProfileTogglerClick = useCallback(() => {
        setIsSettingsOpen(false);
        setIsMyProfileOpen(!isMyProfileOpen);
    }, [setIsMyProfileOpen, isMyProfileOpen]);

    const handleLogoutBtnClick = useCallback(() =>{
        logOut({
            ...currentProfile,
            isOnline: false,
        }, currentProfile.id);
    }, [logOut, currentProfile]);

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
                    <button className="menu-settings-btn" onClick={handleProfileTogglerClick}
                        title={isMyProfileOpen ? `Channels & friends` : `My profile`}
                    >
                        {isMyProfileOpen ? `Channels & friends` : `My profile`}
                    </button>
                    <button className="menu-settings-btn" title="Log out" onClick={handleLogoutBtnClick}>
                        Log out  
                    </button>
                </div>
            }
        </div>
    );
});

export {MenuHeader};
