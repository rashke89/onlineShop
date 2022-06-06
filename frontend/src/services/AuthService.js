import axios from "axios";
class AuthService {
  static login(body) {
    // promis
    return axios.post("/api/login", body);
  }
}

export default AuthService;
