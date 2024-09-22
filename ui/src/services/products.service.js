import { apiUrls } from "../app.constants";
import { ApiService } from "./api";

export default class ProductsService {
    static async createProduct(data) {
        return ApiService.post(apiUrls.products, data);
    }

    static async getAllProducts() {
        return ApiService.get(apiUrls.products);
    }
}