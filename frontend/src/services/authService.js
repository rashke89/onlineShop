import axios from "axios";

class AuthService {
    static login(body) {
        return axios.post("/api/user/login", body)
    }

    static register(body) {
        return axios.post("/api/user/register", body)
    }

    static getAllUsers() {
        return axios.get("/api/user/get-all-users")
    }
    static completeRegistration(body) {
        return axios.post("/api/user/complete-registration", body)
    }
    static userUpdate(body){
        return axios.put("api/user/user-profile",body);
    }
    static isUserLoggedIn() {
        return localStorage.hasOwnProperty('user');
    }
}

export default AuthService
