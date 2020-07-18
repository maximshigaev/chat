import axios from 'axios';

class Api {
    request = axios.create({
        baseURL: 'http://localhost:3000',
        headers: {"Content-type": "application/json; charset=UTF-8"}
    });

    getUsers = () => this.request.get(`/users`);

    createFriend = (friend) => this.request.post(`/users`, friend);
    deleteFriend = (id) => this.request.put(`/users/${id}`);

    getChannels = () => this.request.get(`/channels`);
    createChannel = (channel) => this.request.post(`/channels`, channel);
    updateChannel = (channel) => this.request.put(`/channels/${channel.id}`, channel);
    deleteChannel = (id) => this.request.delete(`/channels/${id}`);

    getMessages = () => this.request.get(`/message`);
    createMessage = (message) => this.request.post(`/messages`, message);
}

const api = new Api();

export {api};
