import axios from "axios";

class CommentService {
    static getComments(productId) {
        return axios.get(`/shop/product/comments/${productId}`);
    }

    static addComment(body) {
        return axios.post("/shop/product/comments", body)
    }

    static getAllComments() {
        return axios.get('/api/admin/all-comments')
    }

    static deleteCommentById(id) {
        return axios.delete(`/api/admin/all-comments${id}`)
    }
    static commentStatusUpdate(body) {
        return axios.put("/api/admin/all-comments", body);
    }
}

export default CommentService;