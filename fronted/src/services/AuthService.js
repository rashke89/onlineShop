import axios from "axios";

class AuthService {

    // private - inside class
    // public - outside class
    // static -
    static login(body) {
        console.log('body >', body);
        // axios promise
        return axios.post('/api/login', body);
    }

    static register(body) {
        return axios.post('/api/register', body);
    }
}

export default AuthService;
