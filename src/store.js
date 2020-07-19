import {extendObservable, action} from 'mobx';

import {api} from './api';

class Store {
    constructor() {
        this.getAllUsers();
        this.getAllChannels();
        this.getAllMessages();

        extendObservable(this, {
            users: [],
            channels: [],
            messages: [],
            currentUser: null,
            currentChannel: null,
            friends: () => this.users.filter((user) => user.isFriend),
            currentMessages: () => this.messages.filter((message) => message.channelId = this.currentChannel.id),
        });
    }

    getAllUsers = action(() => api.getUsers().then((users) => this.users = users));
    getAllChannels = action(() => api.getChannels().then((channels) => this.channels = channels));
    getAllMessages = action(() => api.getMessages().then((messages) => this.messages = messages));

    setCurrentUser = action((id) => this.currentUser = this.users.find((user) => user.id === id));
    createFriend = action((friend) => {
        api.createFriend(friend);
        this.getAllUsers();
    });
    deleteFriend = action((id) => {
        api.deleteFriend(id);
        this.getAllUsers();
    });

    setCurrentChannel = action((id) => this.currentChannel = this.channels.find((channel) => channel.id === id));
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

    createMessage = action((message) => {
        api.createMessage(message);
        this.getAllMessages();
    });
}

const store = new Store();

export {store};
