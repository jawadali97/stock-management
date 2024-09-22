import { apiUrls } from "../app.constants";
import { ApiService } from "./api";

export default class MealsService {
    static async createMeal(data) {
        return ApiService.post(apiUrls.meals, data);
    }

    static async sellMeal(id) {
        return ApiService.get(`${apiUrls.sellMeal}/${id}`);
    }

    static async getAllMeals() {
        return ApiService.get(apiUrls.meals);
    }

    static async deleteMeal(id) {
        return ApiService.delete(`${apiUrls.meals}/${id}`);
    }
}