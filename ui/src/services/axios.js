import axios from "axios";
import { apiBaseUrl } from "../app.constants";


const axiosInstance = axios.create({
    baseURL: `${apiBaseUrl}`,
    headers: {}
});

export default axiosInstance;
