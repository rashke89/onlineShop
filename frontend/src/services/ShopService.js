import axios from 'axios';

class ShopService {

    static getAds() {
        // return axios.get('https://api.storerestapi.com/products');
        return axios.get('https://dummyjson.com/products');
    }

    static getSingleProduct(id) {
        return axios.get(`https://dummyjson.com/products/${id}`);
    }

    static getPayment(body) {
        return axios.post('/api/payment/init-payment', body);
    }
}

export default ShopService;