import axios from "axios";

class AuthService{


    static login(body){
        //axios promise
        return axios.post("/api/user/login", body)
    }
    static register(body){
        return axios.post("/api/user/register", body)
    }

    static completeRegistration(body){
        return axios.post("/api/user/complete-registration", body)
    }
//TEST todo DELETE
    static allUsersTEST(){
       return axios.get("/api/users")
    }

    static isUserLoggedIn(){
        return localStorage.hasOwnProperty('user')
    }

    }


export default AuthService;