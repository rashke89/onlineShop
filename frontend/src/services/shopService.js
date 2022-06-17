import axios from "axios";

class ShopService {
    static getAds() {
        return axios.get('https://fakestoreapi.com/products');
    }

    static getAdById(adId) {
        return axios.get(`https://fakestoreapi.com/products/${adId}`);
    }
}

export default ShopService;
