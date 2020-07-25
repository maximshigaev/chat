import axios from 'axios';

class Api {
    constructor() {
        this.request.interceptors.response.use(
            (response) => response.data,
            (error) => Promise.reject(error)
        );
    }

    request = axios.create({
        baseURL: 'http://localhost:3001',
        headers: {"Content-type": "application/json; charset=UTF-8"}
    });

    getUsers = () => this.request.get(`/users`);
    getProfile = () => this.request.get(`/profile`);
    createProfile = (profile) => this.request.post(`/profile`, profile);

    createFriend = (friend) => this.request.post(`/users`, friend);
    deleteFriend = (id) => this.request.put(`/users/${id}`);

    getChannels = () => this.request.get(`/channels`);
    createChannel = (channel) => this.request.post(`/channels`, channel);
    updateChannel = (channel) => this.request.put(`/channels/${channel.id}`, channel);
    deleteChannel = (id) => this.request.delete(`/channels/${id}`);

    getCurrentMessages = (id) => this.request.get(`/channels/${id}/messages`);
    createMessage = (message, id) => this.request.post(`/channels/${id}/messages`, message);
}

const api = new Api();

export {api};
