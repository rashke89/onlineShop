import axios from "axios";

class ShopService {
    static getAds() {
        return axios.get('https://fakestoreapi.com/products');
    }
}

export default ShopService;
