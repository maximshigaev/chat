import React, {useContext, useState, useCallback} from 'react';
import {observer} from 'mobx-react';
import cn from 'classnames';

import {StoreContext} from '../../context';

import './MenuHeader.scss';

const MenuHeader = observer(() => {
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const {logOut, onlineUser, setIsMyProfileOpened, isMyProfileOpened, setCurrentUser,
        isMenuOpened, setIsMenuOpened, setIsMobileMenuOpened, setCurrentTheme, currentTheme
    } = useContext(StoreContext);
    const titleClass = cn(`menu-header-title`, {'menu-header-title--light': currentTheme === `light`});
    const settingsBtnClass = cn(`menu-btn`, `menu-btn--settings`, {'menu-btn--light': currentTheme === `light`});
    const closeBtnClass = cn(`menu-btn`, `menu-btn--close`, {'menu-btn--light': currentTheme === `light`});

    const handleSettingsBtnClick = useCallback(() => setIsSettingsOpen((prevState) => !prevState), []);
    const handleCloseMenuBtnClick =  useCallback(() => {
        setIsMenuOpened(false);
        setIsMobileMenuOpened(false);
    }, [setIsMenuOpened, setIsMobileMenuOpened]);

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

    const handleThemeBtnClick = useCallback(() => {
        setCurrentTheme((currentTheme === `dark`) ? `light` : `dark`);
        setIsSettingsOpen(false);
    }, [setCurrentTheme, currentTheme]);
    const dropdownBtnClass = cn(`menu-settings-btn`, {'menu-settings-btn--light': currentTheme === `light`});

    return (
        <div className="menu-header">
            <p className={titleClass}>
                {onlineUser.userName}
            </p>
            <button className={settingsBtnClass} title={isSettingsOpen ? `Close settings` : `Open settings`}
                onClick={handleSettingsBtnClick}
            />
            {isMenuOpened &&
                <button className={closeBtnClass} title="Close menu" onClick={handleCloseMenuBtnClick} />
            }
            {isSettingsOpen &&
                <div className="menu-settings">
                    <button className={dropdownBtnClass} onClick={handleProfileTogglerClick}
                        title={isMyProfileOpened ? `Channels & friends` : `My profile`}
                    >
                        {isMyProfileOpened ? `Channels & friends` : `My profile`}
                    </button>
                    <button className={dropdownBtnClass} onClick={handleThemeBtnClick}
                        title={`Set the ${(currentTheme === `dark`) ? `light` : `dark`} theme`}
                    >
                        {`Set the ${(currentTheme === `dark`) ? `light` : `dark`} theme`}
                    </button>
                    <button className={dropdownBtnClass} title="Log out" onClick={handleLogoutBtnClick}>
                        Log out  
                    </button>
                </div>
            }
        </div>
    );
});

export {MenuHeader};
