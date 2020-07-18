import axios from 'axios';

class Api {
    request = axios.create({
        baseURL: 'http://localhost:3000',
        headers: {"Content-type": "application/json; charset=UTF-8"}
    });

    getUser = (id) => this.request.get(`/users/${id}`);

    getFriends = () => this.request.get(`/users?isFriend=true`);
    createFriend = (friend) => this.request.post(`/users`, friend);
    deleteFriend = (friend, id) => this.request.put(`/users/${id}`, friend);

    getChannels = () => this.request.get(`/channels`);
    getChannel = (id) => this.request.get(`/channels/${id}`);
    createChannel = (channel) => this.request.post(`/channels`, channel);
    updateChannel = (channel, id) => this.request.put(`/channels/${id}`, channel);
    deleteChannel = (id) => this.request.delete(`/channels/${id}`);

    getChannelMessages = (channelId) => this.request.get(`/messages?channelId=${channelId}`);
    createMessage = (message) => this.request.post(`/messages`, message);
}

const api = new Api();

export {api};
