import axios from "axios";

class ShopService {
    static getProducts(){
        return axios.get("/shop/products");
    }

    static getMyAds(userId) {
        return axios.get(`/product/my-ads/${userId}`);
    }

    static getMyAd(myAdId) {
        return axios(`/product/getMyAd/${myAdId}`);
    }

    static saveMyAd(body, myAdId) {
        return axios(`/product/getMyAd/${myAdId}`);
    }

    static addProduct(body) {
        return axios.get("/product/addMyProduct", body);
    }

    static getAdById(adId) {
        return axios.get(`/api/products/${adId}`);
    }

    static getTopRatedProduct(num){
        return axios.get("/api/top-products/" + num);
    }
}

export default ShopService;
