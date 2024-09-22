import { apiUrls } from "../app.constants";
import { ApiService } from "./api";

export default class OrdersService {
    static async createOrder(data) {
        return ApiService.post(apiUrls.orders, data);
    }

    static async acceptOrder(id, data = {}) {
        return ApiService.get(`${apiUrls.orders}/${id}`);
    }

    static async getAllOrders() {
        return ApiService.get(apiUrls.orders);
    }
}