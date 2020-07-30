import {extendObservable, action} from 'mobx';
import faker from 'faker';

import {api} from './api';

class Store {
    constructor() {
        this.getAllUsers();
        this.getAllChannels();

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
            friendsFilterTerm: ``,
            isMyProfileOpen: false,
            isLoggingOut: false,
            uploadedFiles: [],
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
    setIsMyProfileOpen = action((isOpen) => this.isMyProfileOpen = isOpen);
    logOut = action((user, id) => {
        this.isLoggingOut = true;
        api.updateUser(user, id)
            .then(() => this.getAllUsers())
    });

    setFilterTerm = action((term) => this.filterTerm = term);
    setFriendsFilterTerm = action((term) => this.friendsFilterTerm = term);

    getAllUsers = action(() => {
        api.getUsers()
            .then((users) => {
                this.users = users;

                const onlineUser = this.users.find((user) => user.isProfileOnline);
            
                if (onlineUser) {
                    this.setOnlineUser(onlineUser);
                } else {
                    this.setOnlineUser(null);
                }

                this.isLoggingOut = false;
                this.isUserUpdating = false;
                this.isUserCreating = false;
                this.isUsersLoading = false;
            })
    });
    setCurrentUser = action((user) => this.currentUser = user);
    updateUser = action((user, id) => {
        this.isUserUpdating = true;
        api.updateUser(user, id)
            .then((user) => {
                this.setCurrentUser(user);
                this.getAllUsers();
            })
    });
    setOnlineUser = action((user) => this.onlineUser = user);
    createUser = action((user) => {
        this.isUserCreating = true;
        api.createUser(user)
            .then(() => this.getAllUsers())
    });

    getAllChannels = action(() => {
        api.getChannels()
            .then((channels) => {
                this.channels = channels;
                this.isChannelsLoading = false;
            })
    });
    setChannelsFilterTerm = action((term) => this.channelsFilterTerm = term);

    getCurrentMessages = action((id) => {
        this.isMessagesLoading = true;
        api.getCurrentMessages(id)
            .then((messages) => {
                this.isMessagesLoading = false;
                this.currentMessages = messages;
                this.currentChannel = this.channels.find((channel) => channel.id === +id);
            })
    });
    createMessage = action((message, id) => {
        api.createMessage(message, id)
            .then(() => this.getCurrentMessages(this.currentChannel.id))
    });
}

const store = new Store();

export {store};
