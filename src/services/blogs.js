import axios from 'axios';
const baseUrl = '/api/blogs';

const getAll = () => {
    const request = axios.get(baseUrl);
    return request.then((response) => response.data);
};

const addBlog = (payload, token) => {
    const request = axios.post(baseUrl, payload, {
        headers: { Authorization: 'Bearer ' + token },
    });
    return request.then((response) => response.data);
};

const likeBlog = (payload, token) => {
    const request = axios.put(
        `${baseUrl}/${payload.id}`,
        { ...payload, likes: payload.likes + 1 },
        {
            headers: { Authorization: 'Bearer ' + token },
        }
    );
    return request.then((response) => response.data);
};

const deleteBlog = (id, token) => {
    const request = axios.delete(`${baseUrl}/${id}`, {
        headers: { Authorization: 'Bearer ' + token },
    });
    return request.then((response) => response.data);
};

export default { getAll, addBlog, likeBlog, deleteBlog };
