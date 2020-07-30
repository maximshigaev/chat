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

    getProfiles = () => this.request.get(`/profiles`);
    updateProfile = (profile, id) => this.request.put(`/profiles/${id}`, profile);
    createProfile = (profile) => this.request.post(`/profiles`, profile);

    updateFriend = (friend, id) => this.request.put(`/users/${id}`, friend);

    getChannels = () => this.request.get(`/channels`);
    createChannel = (channel) => this.request.post(`/channels`, channel);
    updateChannel = (channel) => this.request.put(`/channels/${channel.id}`, channel);
    deleteChannel = (id) => this.request.delete(`/channels/${id}`);

    getCurrentMessages = (id) => this.request.get(`/channels/${id}/messages`);
    createMessage = (message, id) => this.request.post(`/channels/${id}/messages`, message);
}

const api = new Api();

export {api};
