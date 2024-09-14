import { apiUrls } from "../app.constants";
import { ApiService } from "./api";

export default class RequestService {
    static async createRequest(data) {
        return ApiService.post(apiUrls.createRequest, data);
    }

    static async updateRequest(id, data) {
        return ApiService.post(`${apiUrls.updateRequest}/${id}`, data);
    }

    static async getAllRequests() {
        return ApiService.get(apiUrls.requests);
    }

    static async deleteRequest(id) {
        return ApiService.delete(`${apiUrls.deleteRequest}/${id}`);
    }

    static async getCurrentUserRequests() {
        return ApiService.get(apiUrls.userRequests);
    }
}