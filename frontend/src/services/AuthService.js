import axios from 'axios';
import { localStorageConfig } from '../config/localStorageConfig';

class AuthService {

    static register(user){
        return axios.post('/api/user/register', user);
    }

    static login(user){
        return axios.post('/api/user/login', user);
    }

    static completeRegistration(id){
        return axios.post('/api/user/complete-registration', id)
    }

    static isUserLoggedIn(){
        return localStorage.getItem(localStorageConfig.USER);
    }
}

export default AuthService;