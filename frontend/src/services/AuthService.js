import axios from "axios";

class AuthService{


    static login(body){
        //axios promise
        return axios.post("/api/login", body)
    }
}

export default AuthService;