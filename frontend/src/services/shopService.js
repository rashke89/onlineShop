import axios from "axios";

class ShopService {
    static getAds(paginationObject) {
        return axios.get(`/shop/products/${paginationObject?.itemsPerPage}/${paginationObject?.currentPage}`);
    }
    static setRatingStars(body) {
        return axios.put('/shop/products/set-rating', body);
    }
      static getRandomAds(masonryAds) {
        return axios.get(`/api/home/${masonryAds}`);
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
        return axios.get(`/product/my-adds`)
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

    static ordered(order) {
        return axios.post('/api/ordered', order);
    }

    static getRandomSliderAds(numberAds) {
        return axios.get(`/api/home/slider/${numberAds}`);
    }
    static getRating(id){
        return axios.get(`/shop/products/get-rating/${id}`);
    }

    static reset(id){
        return axios.put('/shop/product/reset', id)
    }

    // static delete(id){
    //     return axios.put('/shop/product/delete', id)
    // }
}

export default ShopService;
