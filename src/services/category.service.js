import { api } from "./api.service";

class CategoryService {
    constructor() {
        this.path = "/category";
    }
    
    async createCategory(newCategory) {
        return (await api.post(this.path, newCategory)).data;
    }
    async getCategories() {
        return (await api.get(this.path)).data;
    }
    async deleteCategory(id) {
        return (await api.delete(`${this.path}/${id}`)).data;
    }
    async updateCategory(id, category) {
        return (await api.patch(`${this.path}/${id}`, category)).data;
    }
}

export default new CategoryService();