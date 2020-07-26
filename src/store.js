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
            channels: [],
            currentMessages: [],
            currentChannel: null,
            currentUser: null,
            filterTerm: ``,
            get friends() {
                return this.users.filter((user) => user.isFriend);
            },
            currentProfile: null,
            profiles: [],
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
                        lastName: faker.name.lastName(),
                        avatar: faker.internet.avatar(),
                    },
                }, this.currentChannel.id);
            }
        }

        setInterval(emitMessage, 5000);
    }

    setCurrentProfile = (profile) => this.currentProfile = profile;
    getProfiles = action(() => api.getProfiles().then((profiles) => {
        this.profiles = profiles;
        const onlineProfile = this.profiles.find((profile) => profile.isOnline);

        if (onlineProfile) {
            this.setCurrentProfile(onlineProfile);
        } else {
            this.setCurrentProfile(null);
        }
    }));
    createProfile = action((profile) => api.createProfile(profile).then((profile) => this.currentProfile = profile));
    updateProfile = action((profile, id) => api.updateProfile(profile, id).then((profile) => {
        this.getProfiles();
    }));
    getProfile = action(() => api.getProfile().then((profile) => this.profile = profile));
    deleteProfile = action(() => api.deleteProfile());

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
