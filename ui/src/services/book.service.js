import { apiUrls } from "../app.constants";
import { ApiService } from "./api";

export default class BookService {
    static async addBook(data) {
        return ApiService.post(apiUrls.addBook, data);
    }

    static async updateBook(id, data) {
        return ApiService.post(`${apiUrls.updateBook}/${id}`, data);
    }

    static async getAllBooks() {
        return ApiService.get(apiUrls.books);
    }

    static async deleteBook(id) {
        return ApiService.delete(`${apiUrls.deleteBook}/${id}`);
    }

    static async searchBook(query) {
        return ApiService.get(`${apiUrls.searchBook}?title=${query}`);
    }
}