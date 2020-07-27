import React, {useContext} from 'react';
import {observer} from 'mobx-react';
import cn from 'classnames';

import {StoreContext} from '../../context';
import {ProfileInfoItem} from '../';

import './Profile.scss';

const Profile = observer(() => {
    const {currentUser} = useContext(StoreContext);

    if (!currentUser) {
        return (
            <section className="profile profile--empty">
                <h2 className="visually-hidden">User Profile</h2>
                Please, select the user profile
            </section>
        );
    }

    const {firstName, lastName, avatar, jobTitle, userName, skype, email, timeZone, isOnline, fb, tw, inst,
        lkdn} = currentUser;
    const timeZoneDate =  new Date(Date.parse(timeZone));
    const formattedTimeZone = `${timeZoneDate.getHours()}:${(timeZoneDate.getMinutes() + '').padStart(2, 0)}
        ${timeZoneDate.getHours() > 11 ? 'PM' : 'AM'} Local time`;

    const profileUserName = `${firstName} ${lastName}`;
    const headingStyle = cn(`profile-name`, {'profile-name--online': isOnline});
    const socialLinks  = {fb, tw, inst, lkdn};

    return (
        <section className="profile custom-scrollbar custom-scrollbar--light">
            <h2 className="visually-hidden">User Profile</h2>
            <img className="profile-avatar" src={avatar} alt={profileUserName} width="228" height="228" />
            <div className="profile-info">
                <h3 className={headingStyle}>
                    {profileUserName}
                </h3>
                <span className="profile-job">
                    {jobTitle}
                </span>
                <div className="profile-social-links">
                    {Object.entries(socialLinks)
                        .map(([key, value]) => (
                            <a className={`profile-social-link profile-social-link--${key}`} href={value}
                                title={value} key={key}
                            />
                        ))
                    }
                </div>
                <div className="profile-buttons">
                    <button className="profile-btn profile-btn--message" title={`Write message to ${profileUserName}`}>
                        Message
                    </button>
                    <button className="profile-btn profile-btn--options" title="Show options" />
                </div>
                <ProfileInfoItem title="Username" content={userName} />
                <ProfileInfoItem title="Email" content={email} />
                <ProfileInfoItem title="Skype" content={skype} />
                <ProfileInfoItem title="Timezone" content={formattedTimeZone} />
            </div>
        </section>
    );
});

export {Profile};
