import axios from 'axios';

const Token = localStorage.getItem('token')

const AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    // set any default headers here
    'Content-Type': 'application/json',
    'authorization': `Bearer ${Token}`
  },
});

export default AxiosInstance;
