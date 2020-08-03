import React, {useContext} from 'react';
import {observer} from 'mobx-react';
import cn from 'classnames';

import {StoreContext} from '../../context';
import {MenuTitle} from '../';
import {Spinner} from '../';
import {FriendsItem} from '../';
import {useControlledInput} from '../../hooks';
import {getErrorMessage} from '../../helpers';
import {ErrorMessage} from '../';

import './FriendsList.scss';

const FriendsList = observer(() => {
    const {friends, isUsersLoading, setFriendsFilterTerm, friendsFilterTerm, isUserUpdating,
        usersError, currentTheme
    } = useContext(StoreContext);
    const {inputValue, handleChange} = useControlledInput(setFriendsFilterTerm);
    const inputClass = cn(`friends-search`, {'friends-search--light': currentTheme === `light`});
    const ulClass = cn(`friends-list`, `custom-scrollbar`, `custom-scrollbar--light`,
        {'custom-scrollbar--themed': currentTheme === `light`});

    return (
        <div className="friends">
            {(isUsersLoading || isUserUpdating) && <Spinner size="middle" />}
            {usersError &&
                <ErrorMessage mode="menu">
                    {getErrorMessage(usersError.type)}
                </ErrorMessage>
            }
            {!isUsersLoading && !isUserUpdating && !usersError &&
                <>
                    <MenuTitle title="Friends" quantity={friends.length} />
                    <input className={inputClass} value={inputValue} placeholder="Search.." onChange={handleChange} />
                    <ul className={ulClass}>
                        {friends
                            .filter(({firstName, surName}) => {
                                return firstName.toLowerCase().includes(friendsFilterTerm.toLowerCase().trim())
                                    || surName.toLowerCase().includes(friendsFilterTerm.toLowerCase().trim());
                            })
                            .map((friend) => <FriendsItem key={friend.id} friend={friend} />)}
                    </ul>
                </>
            }
        </div>
    );
});

export {FriendsList};
