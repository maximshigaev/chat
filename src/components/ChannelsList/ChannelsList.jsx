import React, {useContext, useState, useCallback, useRef} from 'react';
import {observer} from 'mobx-react';
import cn from 'classnames';

import {StoreContext} from '../../context';
import {ChannelsItem} from '../';
import {MenuTitle} from '../';
import {Spinner} from '../';
import {useControlledInput, useChannelError} from '../../hooks';
import {handleKeyDown as onKeyDown, getErrorMessage} from '../../helpers';
import {ErrorMessage} from '../';

import './ChannelsList.scss';

const ChannelsList = observer(() => {
    const {channels, isChannelsLoading, setChannelsFilterTerm, channelsFilterTerm, createChannel, currentSorting,
        setCurrentSorting, favouriteChannels, ordinaryChannels, channelsError, currentTheme
    } = useContext(StoreContext);
    const {inputValue: searchInputValue, handleChange: handleSearchChange} = useControlledInput(setChannelsFilterTerm);
    const {inputValue: addInputValue, handleChange: handleAddChange} = useControlledInput();

    const [isChannelAdding, setIsChannelAdding] = useState(false);
    const {isChannelError: isEmptyError, setIsChannelError: setIsEmptyError, errorMessage: emptyMessage}
        = useChannelError(`empty`);
    const {isChannelError: isLongError, setIsChannelError: setIsLongError, errorMessage: longMessage}
        = useChannelError(`long`);

    const handleNewBtnClick = useCallback(() => {
        setIsEmptyError(false);
        setIsLongError(false);
        setIsChannelAdding((isAdding) => !isAdding);
    }, [setIsEmptyError, setIsLongError]);
    const newBtnClass = cn(`channels-btn`, `channels-btn--new`,
        {'channels-btn--opened': isChannelAdding, 'channels-btn--light': currentTheme === `light`});
    const addInputRef = useRef();

    const handleAddBtnClick = useCallback(() => {
        if (!addInputValue.trim()) {
            setIsEmptyError(true);
            addInputRef.current.blur();
        } else if (addInputValue.trim().length > 20) {
            setIsLongError(true);
            addInputRef.current.blur();
        } else {
            createChannel({
                title: addInputValue.trim(),
                participantsCount: 0,
                isFavourite: false,
            });
            handleAddChange({target: {value: ``}});
            setIsEmptyError(false);
            setIsLongError(false);
            setIsChannelAdding(false);
        }
    }, [createChannel, addInputValue, handleAddChange, setIsEmptyError, setIsLongError]);

    const handleKeyDown = useCallback(onKeyDown(handleAddBtnClick), [handleAddBtnClick]);
    const handleFocus = useCallback(() => {
        setIsEmptyError(false);
        setIsLongError(false);
    }, [setIsEmptyError, setIsLongError]);

    const handleFavouriteBtnClick = useCallback(() => {
        if (currentSorting !== `favourite`) {
            setCurrentSorting(`favourite`);
        } else {
            setCurrentSorting(null);
        }
    }, [setCurrentSorting, currentSorting]);
    const favouriteBtnClass = cn(`channels-btn`, `channels-btn--favourite`,
        {'channels-btn--current': currentSorting === `favourite`, 'channels-btn--light': currentTheme === `light`});

    const handleOrdinaryBtnClick = useCallback(() => {
        if (currentSorting !== `ordinary`) {
            setCurrentSorting(`ordinary`);
        } else {
            setCurrentSorting(null);
        }
    }, [setCurrentSorting, currentSorting]);
    const ordinaryBtnClass = cn(`channels-btn`, `channels-btn--ordinary`,
        {'channels-btn--current': currentSorting === `ordinary`, 'channels-btn--light': currentTheme === `light`});
    const addBtnClass = cn(`channels-btn`, `channels-btn--add`, {'channels-btn--light': currentTheme === `light`});

    const addInputClass = cn(`channels-input`, `channels-input--add`,
        {'channels-input--light': currentTheme === `light`});
    const searchInputClass = cn(`channels-input`, `channels-input--search`,
        {'channels-input--light': currentTheme === `light`});
    const ulClass = cn(`channels-list`, `custom-scrollbar`, `custom-scrollbar--light`,
        {'custom-scrollbar--themed': currentTheme === `light`});
    let renderedChannels;
    let quantity;

    switch (currentSorting) {
        case `favourite`:
            renderedChannels = favouriteChannels;
            quantity = favouriteChannels.length;
            break;
        case `ordinary`:
            renderedChannels = ordinaryChannels;
            quantity = ordinaryChannels.length;
            break;
        default:
            renderedChannels = channels;
            quantity = channels.length;
    }

    return (
        <nav className="channels">
            {isEmptyError && emptyMessage}
            {isLongError && longMessage}
            {isChannelsLoading && <Spinner size="middle" /> }
            {channelsError &&
                <ErrorMessage mode="menu">
                    {getErrorMessage(channelsError.type, `Channels`)}
                </ErrorMessage>
            }
            {!isChannelsLoading && !channelsError &&
                <>
                    <MenuTitle title="Channels" quantity={quantity} />
                    {isChannelAdding &&
                        <>
                            <button className={addBtnClass} title="Add channel" onClick={handleAddBtnClick} />
                            <input className={addInputClass} type="text" value={addInputValue}
                                onChange={handleAddChange} placeholder="Name of the channel" onKeyDown={handleKeyDown}
                                ref={addInputRef} onFocus={handleFocus}
                            />
                        </>
                    }
                    <button className={favouriteBtnClass} onClick={handleFavouriteBtnClick}
                        title={`Show ${(currentSorting !== `favourite` ? `favourite` : `all`)} channels`}
                        
                    />
                    <button className={ordinaryBtnClass} onClick={handleOrdinaryBtnClick}
                        title={`Show ${(currentSorting !== `ordinary` ? `ordinary` : `all`)} channels`}
                    />
                    <button className={newBtnClass} title={isChannelAdding ? `Back` : `New channel`}
                        onClick={handleNewBtnClick}
                    />
                    <input className={searchInputClass} value={searchInputValue}
                        placeholder="Search.." onChange={handleSearchChange} type="text"
                    />
                    <ul className={ulClass}>
                        {renderedChannels
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
