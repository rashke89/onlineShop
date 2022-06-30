import axios from "axios";

class ShopService {
    static getAds() {
        return axios.get('/shop/products');
    }

    static getAdById(adId) {
        return axios.get(`/shop/product/${adId}`);
    }
    static getTopRatedProduct(num){
        return axios.get("/api/top-products/" + num)
    }
    static getFilteredAds(price) {
        return axios.get(`/api/filteredAds/${price}`);
    }
    static getSearchedAds(searchTerm) {
        return axios.get(`/api/product/search/${searchTerm}`)
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
}

export default ShopService;
