import axios from "axios";
class AuthService{

    static login(body){
      return axios.post("/api/login", body);//promise
    }
}

export default AuthService;