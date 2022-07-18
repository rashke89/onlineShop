import axios from "axios";

class AdminService {
    static getStats() {
        return axios.get("api/admin/stats")
    }

    static addCategory(body) {
        return axios.post("api/admin/addCategory", body)
    }

    static getAllCategory() {
        return axios.get("api/admin/categories")
    }

    static deleteCategory(id) {
        return axios.delete("api/admin/category?id=" + id)
    }

    static updateCategory(body) {
        return axios.put("api/admin/category", body)
    }
}

export default AdminService;