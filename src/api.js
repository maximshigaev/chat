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
    updateUser = (user, id) => this.request.put(`/users/${id}`, user);
    createUser = (user) => this.request.post(`/users`, user);

    getChannels = () => this.request.get(`/channels`);
    createChannel = (channel) => this.request.post(`/channels`, channel);
    deleteChannel = (id) => this.request.delete(`/channels/${id}`);
    updateChannel = (channel, id) => this.request.put(`/channels/${id}`, channel);
    
    getCurrentMessages = (id) => this.request.get(`/channels/${id}/messages`);
    createMessage = (message, id) => this.request.post(`/channels/${id}/messages`, message);
}

const api = new Api();

export {api};
