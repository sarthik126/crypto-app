import axios from "axios";
const VITE_SERVER_HOST = import.meta.env.VITE_SERVER_HOST;

const axiosInstance = axios.create({
  baseURL: VITE_SERVER_HOST,
});

export default axiosInstance;
