import Axios from 'axios';

const api = Axios.create({
  baseURL: 'http://192.168.0.3:3333',
});

export default api;
