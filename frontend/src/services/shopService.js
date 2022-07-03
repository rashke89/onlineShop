import axios from "axios";

class ShopService {
    static getProducts(){
        return axios.get("/shop/products");
    }

    static getMyProducts(userId) {
        return axios.get(`/product/getMyProducts/${userId}`);
    }

    static addMyProduct(body){
        return axios.post("/product/addMyProduct", body)
    }

    static saveMyProduct(body, myProductId) {
        return axios.put(`/product/save/${myProductId}`, body);
    }

    static getMyProduct(myProductId) {
        return axios.get(`/product/getMyProduct/${myProductId}`);
    }

    static deleteMyProduct(myProductId) {
        return axios.delete(`/product/delete/${myProductId}`);
    }

    static getProductById(productId) {
        return axios.get(`/api/products/${productId}`);
    }

    static getTopRatedProduct(num){
        return axios.get("/api/top-products/" + num);
    }
}

export default ShopService;
