import { apiUrls } from "../app.constants";
import { ApiService } from "./api";

export default class UserService {
    // static async addBook(data) {
    //     return ApiService.post(apiUrls.addBook, data);
    // }

    static async updateUser(id, data) {
        return ApiService.post(`${apiUrls.updateUser}/${id}`, data);
    }

    static async getAllUsers() {
        return ApiService.get(apiUrls.users);
    }

    static async deleteUser(id) {
        return ApiService.delete(`${apiUrls.deleteUser}/${id}`);
    }

    static async currentUser() {
        return ApiService.get(apiUrls.profile);
    }
}