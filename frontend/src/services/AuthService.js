import axios from 'axios';

class AuthService {
	static login(body) {
		return axios.post("/api/login", body);
	}
	static register(body) {
		console.log(body);
		return axios.post("/api/register", body);
	}
	static completeRegistration(body) {
		return axios.post("/api/complete-registration", body);
	}
}

export default AuthService;