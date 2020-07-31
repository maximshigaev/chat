import React, {useContext} from 'react';
import {observer} from 'mobx-react';
import cn from 'classnames';

import {ChannelsList} from '../';
import {FriendsList} from '../';
import {MenuHeader} from '../';
import {StoreContext} from '../../context';
import {MyProfile} from '../';

import './Menu.scss';

const Menu =  observer(() =>{
    const {isMyProfileOpened, isMenuOpened, isMobileProfileOpened} = useContext(StoreContext);
    const sectionClass = cn(`menu`, {'menu--opened': isMenuOpened, 'menu--opened-mobile-profile': isMobileProfileOpened});

    return (
        <section className={sectionClass}>
            <MenuHeader />
            {isMyProfileOpened && <MyProfile />}
            {!isMyProfileOpened &&
                <>
                    <ChannelsList />
                    <FriendsList />
                </>
            }
        </section>
    );
});

export {Menu};
