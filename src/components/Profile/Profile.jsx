import React, {useContext, useState, useCallback, useEffect} from 'react';
import {observer} from 'mobx-react';
import cn from 'classnames';

import {StoreContext} from '../../context';
import {ProfileInfoItem} from '../';

import './Profile.scss';

const Profile = observer(() => {
    const {currentUser, updateUser, onlineUser, isProfileOpened, setIsProfileOpened,
        isMobileMenuOpened, setIsMobileProfileOpened
    } = useContext(StoreContext);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const sectionClass = cn(`profile`, `custom-scrollbar`, `custom-scrollbar--light`,
        {'profile--opened': isProfileOpened, 'profile--opened-mobile-menu': isMobileMenuOpened});

    const handleOptionsBtnClick = useCallback(() => setIsDropdownOpen((prevState) => !prevState) , []);
    let profileHolder = currentUser;

    const handleFriendsBtnClick = useCallback(() => updateUser({
        ...currentUser,
        isFriend: !currentUser.isFriend,
    }, currentUser.id, `friend`), [currentUser, updateUser]);

    useEffect(() => {
        setIsDropdownOpen(false);
    }, [currentUser]);

    if (!currentUser) {
        profileHolder = onlineUser;
    }

    const isOnlineUserProfile = onlineUser === profileHolder;
    const handleCloseProfileBtnClick = useCallback(() => {
        setIsMobileProfileOpened(false);
        setIsProfileOpened(false);
    }, [setIsProfileOpened, setIsMobileProfileOpened]);

    const {firstName, surName, avatar, jobTitle, userName, skype, email, timeZone, isOnline = true, fb, tw, inst,
        lkdn
    } = profileHolder;
    const timeZoneDate =  new Date(Date.parse(timeZone));
    const formattedTimeZone = `${timeZoneDate.getHours()}:${(timeZoneDate.getMinutes() + '').padStart(2, 0)}
        ${timeZoneDate.getHours() > 11 ? 'PM' : 'AM'} Local time`;

    const profileUserName = `${firstName} ${surName}`;
    const headingClass = cn(`profile-name`, {'profile-name--online': isOnline});
    const optionsBtnClass = cn(`profile-btn`, `profile-btn--options`,
        {'profile-btn--reversed': isDropdownOpen});
    const socialLinks  = {fb, tw, inst, lkdn};

    return (
        <section className={sectionClass}>
            <h2 className="visually-hidden">User Profile</h2>
            {isProfileOpened &&
                <button className="profile-close-btn" title="Close profile" onClick={handleCloseProfileBtnClick} />
            }
            <div className="profile-image-wrapper">
                <img className="profile-avatar" src={avatar} alt={profileUserName} width="228" height="228" />
            </div>
            <div className="profile-info">
                <h3 className={headingClass}>
                    {profileUserName}
                </h3>
                {profileHolder.jobTitle && <span className="profile-job">{jobTitle}</span>}
                <div className="profile-social-links">
                    {Object.entries(socialLinks)
                        .map(([key, value]) => {
                            if (value) {
                                return (
                                    <a className={`profile-social-link profile-social-link--${key}`} href={value}
                                        title={value} key={key}
                                    />
                                 );
                            } else {
                                return null;
                            }
                        })
                    }
                </div>
                {!isOnlineUserProfile &&
                    <div className="profile-buttons">
                        <button className="profile-btn profile-btn--message" title={`Write message to ${profileUserName}`}>
                            Message
                        </button>
                        <button className={optionsBtnClass} onClick={handleOptionsBtnClick}
                            title={isDropdownOpen ? `Hide options` : `Show options`}
                        />
                        {isDropdownOpen &&
                            <div className="profile-dropdown">
                                <button className="profile-btn profile-btn--dropdown" onClick={handleFriendsBtnClick}
                                    title={currentUser.isFriend ? `Remove from friends` : `Add to friends`}
                                >
                                    {currentUser.isFriend ? `Remove from friends` : `Add to friends`}
                                </button>
                            </div>
                        }
                    </div>
                }
                <ProfileInfoItem title="Username" content={userName} />
                <ProfileInfoItem title="Email" content={email} />
                <ProfileInfoItem title="Skype" content={skype} />
                {profileHolder.timeZone && <ProfileInfoItem title="Timezone" content={formattedTimeZone} />}
            </div>
        </section>
    );
});

export {Profile};
