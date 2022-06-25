import axios from "axios";

class AuthService{

    // private - inside class
    // public - outside class
    //static - without instances
    static login(body){
        console.log('body >', body);
        //axios promise
        return axios.post('api/login', body);
    }



}
export default AuthService;