import axios from 'axios';
const instance = axios.create({
    baseURL: 'http://localhost:8082/auth/',
    timeout: 5000,
    headers: {'X-Custom-Header': 'foobar'}
  });

  export default instance;