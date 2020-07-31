import React, {useContext, useState, useCallback} from 'react';
import {observer} from 'mobx-react';

import {StoreContext} from '../../context';

import './MenuHeader.scss';

const MenuHeader = observer(() => {
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const {logOut, onlineUser, setIsMyProfileOpened, isMyProfileOpened, setCurrentUser,
        isMenuOpened, setIsMenuOpened
    } = useContext(StoreContext);

    const handleSettingsBtnClick = useCallback(() => setIsSettingsOpen((prevState) => !prevState), []);
    const handleCloseMenuBtnClick =  useCallback(() => setIsMenuOpened(false), [setIsMenuOpened]);

    const handleProfileTogglerClick = useCallback(() => {
        setIsSettingsOpen(false);
        setIsMyProfileOpened(!isMyProfileOpened);
        setCurrentUser(onlineUser);
    }, [setIsMyProfileOpened, isMyProfileOpened, onlineUser, setCurrentUser]);

    const handleLogoutBtnClick = useCallback(() =>{
        logOut({...onlineUser,
            isProfileOnline: false,
        }, onlineUser.id);
    }, [logOut, onlineUser]);

    return (
        <div className="menu-header">
            <p className="menu-title menu-title--name">
                {onlineUser.userName}
            </p>
            <button className="menu-btn menu-btn--settings" title={isSettingsOpen ? `Close settings` : `Open settings`}
                onClick={handleSettingsBtnClick}
            />
            {isMenuOpened &&
                <button className="menu-btn menu-btn--close" title="Close menu" onClick={handleCloseMenuBtnClick} />
            }
            {isSettingsOpen &&
                <div className="menu-settings">
                    <button className="menu-settings-btn" onClick={handleProfileTogglerClick}
                        title={isMyProfileOpened ? `Channels & friends` : `My profile`}
                    >
                        {isMyProfileOpened ? `Channels & friends` : `My profile`}
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
