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

    static getAdById(adId) {
        return axios.get(`/api/products/${adId}`);
    }

    static getTopRatedProduct(num){
        return axios.get("/api/top-products/" + num);
    }
}

export default ShopService;
