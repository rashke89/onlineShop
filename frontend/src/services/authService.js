import axios from "axios";

class AuthService {
    static login(body) {
        return axios.post("/api/login", body)
    }

    static register(body) {
        console.log("Auth serv", body)
        return axios.post("/api/register", body)
    }

    static completeRegistration(body) {
        return axios.post("/api/complete-registration", body)
    }


    static getAllUsers() {
        return axios.get("/api/users")
    }
}

export default AuthService