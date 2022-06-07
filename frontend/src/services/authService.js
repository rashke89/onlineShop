import axios from "axios";

class AuthService {
    static login(body) {
        return axios.post("/api/login", body)
    }

    static register(body) {
        return axios.post("/api/register", body)
    }
}

export default AuthService