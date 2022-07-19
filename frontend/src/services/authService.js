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

    static deleteUserById(id) {
        return axios.delete(`/api/user/delete${id}`)
    }

    static completeRegistration(body) {
        return axios.post("/api/user/complete-registration", body)
    }

    static userUpdate(body) {
        return axios.put("api/user/user-profile", body);
    }

    static isUserLoggedIn() {
        return localStorage.hasOwnProperty('user');
    }

    static changePassword(body) {
        //TODO add this API Call on backend
        return axios.post("api/user/change-password", body);
    }

    static setVoting(body){
        return axios.put('/api/user/vote', body);
    }

    static getVoting(id){
        return axios.get(`/api/user/get-vote/${id}`)
    }
}

export default AuthService
