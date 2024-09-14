import { apiUrls } from "../app.constants";
import { ApiService } from "./api";

export default class AuthService {
    static async login(data) {
        const { email, password } = data;
        return ApiService.post(apiUrls.login, { username: email, password });
    }

    static async signup(data) {
        return ApiService.post(apiUrls.signup, data);
    }
}