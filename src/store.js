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
            isUsersLoading: true,
            channels: [],
            isChannelsLoading: true,
            currentMessages: [],
            currentChannel: null,
            currentUser: null,
            filterTerm: ``,
            get friends() {
                return this.users.filter((user) => user.isFriend);
            },
            currentProfile: null,
            isProfileUpdating: false,
            isProfileCreating: false,
            profiles: [],
            isProfilesLoading: true,
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

        this.isProfilesLoading = false;
        this.isProfileUpdating = false;
        this.isProfileCreating = false;
    }));
    createProfile = action((profile) => {
        this.isProfileCreating = true;
        api.createProfile(profile)
            .then(() => this.getProfiles())
    });
    updateProfile = action((profile, id) => {
        this.isProfileUpdating = true;
        api.updateProfile(profile, id)
            .then(() => this.getProfiles())
    });
    getProfile = action(() => api.getProfile().then((profile) => this.profile = profile));
    deleteProfile = action(() => api.deleteProfile());

    setFilterTerm = action((term) => this.filterTerm= term);

    getAllUsers = action(() => api.getUsers().then((users) => {
        this.isUsersLoading = false;
        this.users = users;
    }));
    getAllChannels = action(() => api.getChannels().then((channels) => {
        this.channels = channels;
        this.isChannelsLoading = false;
    }));

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
