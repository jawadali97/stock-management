import axios from "axios";
import { apiBaseUrl } from "../app.constants";

/**
 * Create axios instance with base url
 */
const axiosInstance = axios.create({
    baseURL: `${apiBaseUrl}`,
    headers: {}
});

export default axiosInstance;
