import {extendObservable, action} from 'mobx';
import faker from 'faker';

import {api} from './api';

class Store {
    constructor() {
        this.getUsers();
        this.getChannels();

        // this.startChat();

        extendObservable(this, {
            users: [],
            onlineUser: null,
            isUsersLoading: true,
            isUserUpdating: false,
            isUserCreating: false,
            currentUser: null,
            channels: [],
            channelsFilterTerm: ``,
            currentChannel: null,
            isChannelsLoading: true,
            currentMessages: [],
            isMessagesLoading: false,
            filterTerm: ``,
            get friends() {
                return this.users.filter((user) => user.isFriend);
            },
            get favouriteChannels() {
                return this.channels.filter((channel) => channel.isFavourite);
            },
            get ordinaryChannels() {
                return this.channels.filter((channel) => !channel.isFavourite);
            },
            friendsFilterTerm: ``,
            isMyProfileOpened: false,
            isLoggingOut: false,
            uploadedFiles: [],
            isMenuOpened: false,
            isProfileOpened: false,
            isMobileMenuOpened: false,
            isMobileProfileOpened: false,
            currentSorting: null,
            channelsError: null,
            usersError: null,
            messagesError: null,
        });
    }

    startChat = () => {
        const emitMessage = () => {
            if (this.currentChannel) {
                this.createMessage({
                    channelId: this.currentChannel.id,
                    date: new Date().toISOString(),
                    text: faker.lorem.text(),
                    author: {
                        firstName: faker.name.firstName(),
                        surName: faker.name.lastName(),
                        avatar: faker.internet.avatar(),
                    },
                }, this.currentChannel.id);
            }
        }

        setInterval(emitMessage, 5000);
    }

    setUploadedFiles = action((files) => this.uploadedFiles = files); 
    setIsMyProfileOpened = action((isOpened) => this.isMyProfileOpened = isOpened);
    logOut = action((user, id) => {
        this.isLoggingOut = true;
        this.usersError = null;

        api.updateUser(user, id)
            .then(() => this.getUsers())
            .catch((err) => {
                this.isLoggingOut = false;
                this.usersError = {type: `logout`, error: err,};
            })
    });

    setFilterTerm = action((term) => this.filterTerm = term);
    setFriendsFilterTerm = action((term) => this.friendsFilterTerm = term);

    getUsers = action(() => {
        api.getUsers()
            .then((users) => {
                this.users = users;
                this.usersError = null;

                const onlineUser = this.users.find((user) => user.isProfileOnline);
            
                if (onlineUser) {
                    this.setOnlineUser(onlineUser);
                } else {
                    this.setOnlineUser(null);
                }
            })
            .catch((err) => this.usersError = {type: `list`, error: err,})
            .finally(() => {
                this.isLoggingOut = false;
                this.isUserUpdating = false;
                this.isUserCreating = false;
                this.isUsersLoading = false;
            })
    });
    setCurrentUser = action((user) => this.currentUser = user);
    updateUser = action((user, id, action) => {
        this.isUserUpdating = true;
        this.usersError = null;

        api.updateUser(user, id)
            .then((user) => {
                this.setCurrentUser(user);
                this.getUsers();
            })
            .catch((err) => {
                this.isUserUpdating = false;
                this.usersError = {type: action, error: err,};
            })
    });
    setOnlineUser = action((user) => this.onlineUser = user);
    createUser = action((user) => {
        this.isUserCreating = true;
        this.usersError = null;

        api.createUser(user)
            .then(() => this.getUsers())
            .catch((err) => {
                this.isUserCreating = false;
                this.usersError = {type: `signup`, error: err,};
            })
    });

    getChannels = action(() => {
        api.getChannels()
            .then((channels) => {
                this.channels = channels;
                this.channelsError = null;

                if (this.currentChannel) {
                    const currentChannel = channels.find((channel) => channel.id === this.currentChannel.id);
                    this.setCurrentChannel(currentChannel);
                }
            })
            .catch((err) => this.channelsError = {type: `list`, error: err,})
            .finally(() => this.isChannelsLoading = false)
    });
    setChannelsFilterTerm = action((term) => this.channelsFilterTerm = term);
    createChannel = action((channel) => {
        this.isChannelsLoading = true;

        api.createChannel(channel)
            .then(() => {
                this.channelsError = null;
                this.getChannels();
            })
            .catch((err) => {
                this.isChannelsLoading = false;
                this.channelsError = {type: `create`, error: err,};
            })
    });
    deleteChannel = action((id) => {
        this.isChannelsLoading = true;

        api.deleteChannel(id)
            .then(() => {
                this.channelsError = null;
                this.getChannels();
            })
            .catch((err) => {
                this.isChannelsLoading = false;
                this.channelsError = {type: `delete`, error: err,};
            })
    });
    updateChannel = action((channel, id, action) => {
        this.isChannelsLoading = true;

        api.updateChannel(channel, id)
            .then(() => {
                this.channelsError = null;
                this.getChannels();
            })
            .catch((err) => {
                this.isChannelsLoading = false;
                this.channelsError = {type: action, error: err,};
            })
    });
    setCurrentChannel = action((channel) => this.currentChannel = channel);

    getCurrentMessages = action((id) => {
        this.isMessagesLoading = true;
        this.messagesError = null;

        api.getCurrentMessages(id)
            .then((messages) => this.currentMessages = messages)
            .catch((err) => this.messagesError = {type: `list`, error: err,})
            .finally(() => {
                const currentChannel = this.channels.find((channel) => channel.id === +id);
                this.setCurrentChannel(currentChannel);
                this.isMessagesLoading = false;
            })
    });
    createMessage = action((message, id) => {
        this.isMessagesLoading = true;

        api.createMessage(message, id)
            .then(() => this.getCurrentMessages(this.currentChannel.id))
            .catch((err) => {
                this.isMessagesLoading = false;
                this.messagesError = {type: `create`, error: err,};
            })
    });

    setIsMenuOpened = action((isOpened) => this.isMenuOpened = isOpened);
    setIsProfileOpened = action((isOpened) => this.isProfileOpened = isOpened);
    setIsMobileMenuOpened = action((isOpened) => this.isMobileMenuOpened = isOpened);
    setIsMobileProfileOpened = action((isOpened) => this.isMobileProfileOpened = isOpened);

    setCurrentSorting = action((sorting) => this.currentSorting = sorting);
}

const store = new Store();

export {store};
