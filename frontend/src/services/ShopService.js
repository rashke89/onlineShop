import axios from "axios";

class ShopService{
    static getProducts(){
        return axios.get('https://raw.githubusercontent.com/Alkibijad/webShop_fake_db/main/products.json')
    }
    static getProduct(productId){
       return axios.get(`https://fakestoreapi.com/products/${productId}`)
    }
}


export default ShopService;