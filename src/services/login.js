import axios from 'axios';
const baseUrl = '/api/login';

const login = async (payload) => {
    try {
        const response = await axios.post(baseUrl, payload);
        return response.data;
    } catch {
        return {};
    }
};

export default { login };
