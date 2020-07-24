import {extendObservable, action} from 'mobx';

import {api} from './api';

class Store {
    constructor() {
        this.getAllUsers();
        this.getAllChannels();

        extendObservable(this, {
            users: [],
            channels: [],
            currentMessages: [],
            currentChannel: null,
            currentUser: null,
            filterTerm: ``,
            get friends() {
                return this.users.filter((user) => user.isFriend);
            },
        });
    }

    setFilterTerm = action((term) => this.filterTerm= term);

    getAllUsers = action(() => api.getUsers().then((users) => this.users = users));
    getAllChannels = action(() => api.getChannels().then((channels) => this.channels = channels));

    setCurrentUser = action((user) => this.currentUser = user);
    createFriend = action((friend) => {
        api.createFriend(friend);
        this.getAllUsers();
    });
    deleteFriend = action((id) => {
        api.deleteFriend(id);
        this.getAllUsers();
    });

    createChannel = action((channel) => {
        api.createChannel(channel);
        this.getAllChannels();
    });
    updateChannel = action((channel) => {
        api.updateChannel(channel);
        this.getAllChannels();
    });
    deleteChannel = action((id) => {
        api.deleteChannel(id);
        this.getAllChannels();
    });

    getCurrentMessages = action((id) => api.getCurrentMessages(id).then((messages) => {
        this.currentMessages = messages;
        this.currentChannel = this.channels.find((channel) => channel.id === +id);
    }));
    createMessage = action((message, id) => {
        api.createMessage(message, id);
        this.getCurrentMessages(this.currentChannel.id);
    });
}

const store = new Store();

export {store};
