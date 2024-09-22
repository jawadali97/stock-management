
import axiosInstance from "./axios";

/**
 * Api service class to define http methods with axios
 */
export class ApiService {
    static async get(url, params = {}) {
        try {
            const response = await axiosInstance.get(url, { params });
            return response;
        } catch (error) {
            return Promise.reject(error);
        }
    }

    static async post(url, data) {
        try {
            const response = await axiosInstance.post(url, data);
            return response;
        } catch (error) {
            return Promise.reject(error);
        }
    }

    static async put(url, id, data = {}) {
        try {
            const response = await axiosInstance.put(`${url}/${id}`, data);
            return response;
        } catch (error) {
            return Promise.reject(error);
        }
    }

    static async delete(url, id) {
        try {
            const response = await axiosInstance.delete(url);
            return response;
        } catch (error) {
            return Promise.reject(error);
        }
    }
}
