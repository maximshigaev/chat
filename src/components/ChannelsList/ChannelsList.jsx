import React, {useContext, useState, useCallback, useRef} from 'react';
import {observer} from 'mobx-react';
import cn from 'classnames';

import {StoreContext} from '../../context';
import {ChannelsItem} from '../';
import {MenuTitle} from '../';
import {Spinner} from '../';
import {useControlledInput} from '../../hooks';

import './ChannelsList.scss';

const ChannelsList = observer(() => {
    const {channels, isChannelsLoading, setChannelsFilterTerm, channelsFilterTerm,
        createChannel
    } = useContext(StoreContext);
    const {inputValue: searchInputValue, handleChange: handleSearchChange} = useControlledInput(setChannelsFilterTerm);
    const {inputValue: addInputValue, handleChange: handleAddChange} = useControlledInput();
    const [isChannelAdding, setIsChannelAdding] = useState(false);
    const [isChannelError, setIsChannelError] = useState(false);

    const handleNewBtnClick = useCallback(() => {
        setIsChannelError(false);
        setIsChannelAdding((isAdding) => !isAdding);
    }, []);
    const buttonClass = cn(`channels-btn`, `channels-btn--new`, {'channels-btn--opened': isChannelAdding});
    const addInputRef = useRef();

    const handleAddBtnClick = useCallback(() => {
        if (!addInputValue.trim()) {
            setIsChannelError(true);
            addInputRef.current.blur();
        } else {
            createChannel({
                title: addInputValue.trim(),
                participantsCount: 0,
                isFavourite: false,
            });
            handleAddChange({target: {value: ``}});
            setIsChannelError(false);
            setIsChannelAdding(false);
        }
    }, [createChannel, addInputValue, handleAddChange]);

    const handleKeyDown = useCallback((evt) => {
        if (evt.keyCode === 13) {
            handleAddBtnClick();
        }
    }, [handleAddBtnClick]);
    const handleFocus = useCallback(() => setIsChannelError(false), []);

    return (
        <nav className="channels">
            {isChannelError &&
                <div className="channels-error">
                    Name of the channel is empty
                </div>
            }
            {isChannelsLoading && <Spinner size="middle" />}
            {!isChannelsLoading &&
                <>
                    <MenuTitle title="Channels" quantity={channels.length} />
                    {isChannelAdding &&
                        <button className="channels-btn channels-btn--add" title="Add channel" onClick={handleAddBtnClick} />
                    }
                    <button className={buttonClass} title={isChannelAdding ? `Back` : `New channel`}
                        onClick={handleNewBtnClick}
                    />
                    {isChannelAdding &&
                        <input className="channels-input channels-input--add" type="text" value={addInputValue}
                            onChange={handleAddChange} placeholder="Name of the channel" onKeyDown={handleKeyDown}
                            ref={addInputRef} onFocus={handleFocus}
                        />
                    }
                    <input className="channels-input channels-input--search" value={searchInputValue}
                        placeholder="Search.." onChange={handleSearchChange} type="text"
                    />
                    <ul className="channels-list custom-scrollbar custom-scrollbar--light">
                        {channels
                            .filter((channel) => {
                                return channel.title.toLowerCase().includes(channelsFilterTerm.toLowerCase().trim());
                            })
                            .map((channel) => <ChannelsItem key={channel.id} channel={channel} />)
                        }
                    </ul>
                </>
            }
        </nav>
    );
});

export {ChannelsList};
