import axios from "axios";

class ShopService {
    static getAds() {
        return axios.get('/api/products');
    }

    static getAdById(adId) {
        return axios.get(`/api/products/${adId}`);
    }

    static getTopRatedProduct(num) {
        return axios.get("/api/top-products/" + num)
    }
}

export default ShopService;
