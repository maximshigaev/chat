import React, {useCallback, useContext, useState} from 'react';
import {observer} from 'mobx-react';
import {Formik, Form} from 'formik';

import {StoreContext} from '../../context';
import {FormField} from '../';
import {Spinner} from '../';
import {myProfileShape} from '../../formShapes';

import './MyProfile.scss';

const MyProfile = observer(() => {
    const {onlineUser, updateUser, isUserUpdating} = useContext(StoreContext);
    const {firstName, surName, email, password, userName, skype, avatar, jobTitle,
        timeZone, fb, tw, inst, lkdn} = onlineUser;
    const [avatarSrc, setAvatarSrc] = useState(avatar);

    const handleFileInputChange = useCallback((evt) => {
        if (evt.target.files.length) {
            const reader = new FileReader();

            reader.readAsDataURL(evt.target.files[0]);
            reader.addEventListener(`load`, (evt) => setAvatarSrc(evt.target.result));
        }
    }, []);

    const handleMyProfileFormSubmit = useCallback((formData) => {
        updateUser({
            ...formData,
            avatar: avatarSrc,
            isProfileOnline: true,
        }, onlineUser.id);
    }, [updateUser, onlineUser.id, avatarSrc]);

    const initialValues = {firstName, surName, email, password, userName, skype, jobTitle: jobTitle || ``,
        timeZone: timeZone || ``,
        fb: fb || ``,
        tw: tw || ``,
        inst: inst || ``,
        lkdn: lkdn || ``,
    }

    return (
        <Formik initialValues={initialValues} 
        onSubmit={handleMyProfileFormSubmit}
            validationSchema={myProfileShape.schema}
        >
            {({isValid}) => (
                <Form className="my-profile custom-scrollbar custom-scrollbar--light">
                    {isUserUpdating && <Spinner size="middle" />}
                    {!isUserUpdating &&
                        <>
                            <div className="my-profile-avatar">
                                <input className="my-profile-upload" type="file" name="avatar"
                                    onChange={handleFileInputChange}
                                />
                                <img className="my-profile-picture" src={avatarSrc} alt="Avatar" width="100" height="100" />
                            </div>
                            <FormField name="firstName" type="text" label="Firstname" isMyProfile={true} />
                            <FormField name="surName" type="text" label="Surname" isMyProfile={true} />
                            <FormField name="userName" type="text" label="Username" isMyProfile={true} />
                            <div className="my-profile-email">
                                <span>Email</span>
                                {onlineUser.email}
                            </div>
                            <FormField name="password" type="password" label="Password" isMyProfile={true} />
                            <FormField name="skype" type="text" label="Skype" isMyProfile={true} />
                            <FormField name="jobTitle" type="text" label="Profession" isMyProfile={true} />
                            <FormField name="timeZone" type="text" label="Timezone" isMyProfile={true} />
                            <FormField name="fb" type="text" label="Facebook" isMyProfile={true} />
                            <FormField name="tw" type="text" label="Twitter" isMyProfile={true} />
                            <FormField name="inst" type="text" label="Instagram" isMyProfile={true} />
                            <FormField name="lkdn" type="text" label="Linkedin" isMyProfile={true} />
                            <button className="my-profile-save-btn" type="submit" disabled={!isValid}>
                                Save profile
                            </button>
                        </>
                    }
                </Form>
            )}
        </Formik>
    );
});

export {MyProfile};
