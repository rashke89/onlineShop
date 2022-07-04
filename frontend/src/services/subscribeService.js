import axios from "axios";


class SubscribeService {
    static addToSubscribeList(email,host) {
        return axios.put(`/api/subscribe/addToList`, {email: email, host:host})
    }

    static removeFromSubscribeList(body) {
        return axios.post(`/api/subscribe/unsubscribe`, body)
    }

    static getAll() {
        return axios.get(`/api/subscribe/getAll`)
    }
}

export default SubscribeService