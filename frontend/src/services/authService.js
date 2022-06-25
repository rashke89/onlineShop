import axios from "axios";

class AuthService {
    static login(body) {
        return axios.post("/api/login", body)
    }

    static register(body) {
        return axios.post("/api/register", body)
    }

    static getAllUsers() {
        return axios.get("/api/users")
    }
    static completeRegistration(body) {
        return axios.post("/api/complete-registration", body)
    }
    static userUpdate(body){
        return axios.put("api/userProfile",body);
    }
}

export default AuthService
