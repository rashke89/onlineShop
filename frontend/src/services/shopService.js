import axios from "axios";

class ShopService {
    static getAds() {
        return axios.get('/shop/products');
    }
      static getRandomAds() {
        return axios.get('/api/home');
    }
    static getAdById(adId) {
        return axios.get(`/shop/product/${adId}`);
    }
    static getTopRatedProduct(num){
        return axios.get("/api/top-products/" + num)
    }
    static addProduct(body){
        return axios.post("/product/add/", body )
    }
    static getMyAds(userId) {
        return axios.get(`/product/my-adds/${userId}`)
    }
    static deleteMyAd(myAdId){
        return axios.delete(`/product/delete/${myAdId}`)

    }
    static getMyAd(myAdId){
        return axios.get(`/product/getMyAd/${myAdId}`)
    }

    static saveMyAd(body, myAdId){
        return axios.put(`/product/save/${myAdId}`, body)
    }

    static initPayment(body) {
        return axios.post('/api/payment/init-payment', body)
    }
}

export default ShopService;
