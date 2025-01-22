import axios from 'axios';

const API_URL = '/api/v1/cloud-credentials';

const getCredentialsById = (id) => {
    return axios.get(API_URL + '/' + id);
};

const getCredentials = () => {
    return axios.get(API_URL);
}

const updateCredentials = (credentials) => {
    return axios.put(API_URL + '/' + credentials.id, credentials);
};

const saveCredentials = (credentials) => {
    return axios.post(API_URL, credentials);
}

export default {
    getCredentials,
    updateCredentials,
    saveCredentials,
    getCredentialsById
};
