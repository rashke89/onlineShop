import axios from "axios";

class UserService {
    static getUserInfo = (username) => {
        return axios.get("/api/user/" + username)
    }

    static getAllUsers() {
        return axios.get("/api/users")
    }
    
}

export default UserService;