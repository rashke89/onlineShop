import axios from "axios";

class AuthService {
    static login(body) {
        return axios.post("/api/login", body)
    }

    static isLogged = () => {
        if (localStorage.hasOwnProperty("user")) {
            return true
        } else {
            return false
        }
    }

    static register(body) {
        console.log("Auth serv", body)
        return axios.post("/api/register", body)
    }

    static completeRegistration(body) {
        return axios.post("/api/complete-registration", body)
    }
    static completeRegistration(body) {
        return axios.post("/api/complete-registration", body)
    }
}

export default AuthService
