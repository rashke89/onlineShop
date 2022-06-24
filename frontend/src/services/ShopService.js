import axios from "axios";

class ShopService{
    static getProducts(){
        return axios.get('https://raw.githubusercontent.com/Alkibijad/webShop_fake_db/main/products.json')
    }
    static getProduct(productId){
       return axios.get(`https://fakestoreapi.com/products/${productId}`)
    }
    static addMyProduct(body){
        return axios.post("/product/addMyProduct", body)
    }
    static getMyProducts(userId) {
        return axios.get(`/product/getMyProducts/${userId}`)
    }
    static getMyProduct(myProductId){
        return axios.get(`/product/getMyProduct/${myProductId}`)
    }
    static deleteMyProduct(myProductId){
        return axios.delete(`/product/delete/${myProductId}`)

    }

    static saveMyProduct(body, myProductId){
        return axios.put(`/product/save/${myProductId}`, body)
    }
}


export default ShopService;