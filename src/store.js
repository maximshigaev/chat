import {observable, computed, action} from 'mobx';

import {Api} from './api';

class Store {
    constructor() {
        this.getAllUsers();
        this.getAllChannels();
        this.getAllMessages();
    }

    @action getAllUsers = () => Api.getUsers().then((users) => this.users = users);
    @action getAllChannels = () => Api.getChannels().then((channels) => this.channels = channels);
    @action getAllMessages = () => Api.getMessages().then((messages) => this.messages = messages);

    @action setCurrentUser = (id) => this.currentUser = this.users.find((user) => user.id === id);
    @action createFriend = (friend) => {
        Api.createFriend(friend);
        this.getAllUsers();
    };
    @action deleteFriend = (id) => {
        Api.deleteFriend(id);
        this.getAllUsers();
    };

    @action setCurrentChannel = (id) => this.currentChannel = this.channels.find((channel) => channel.id === id);
    @action createChannel = (channel) => {
        Api.createChannel(channel);
        this.getAllChannels();
    }
    @action updateChannel = (channel) => {
        Api.updateChannel(channel);
        this.getAllChannels();
    }
    @action deleteChannel = (id) => {
        Api.deleteChannel(id);
        this.getAllChannels();
    }

    @action createMessage = (message) => {
        Api.createMessage(message);
        this.getAllMessages();
    }

    @observable users = [];
    @observable channels = [];
    @observable messages = [];
    @observable currentUser = null;
    @observable currentChannel = null;

    @computed friends = this.users.filter((user) => user.isFriend);
    @computed currentMessages = this.messages.filter((message) => message.channelId = this.currentChannel.id);
}

const store = new Store();

export {store};
