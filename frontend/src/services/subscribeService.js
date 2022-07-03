import axios from "axios";


class SubscribeService {
    static addToSubscribeList(email) {
        return axios.put(`/api/subscribe/addToList`, {email: email})
    }

    static removeFromSubscribeList(body) {
        return axios.delete(`/api/subscribe/unsubscribe`, body)
    }

    static getAll() {
        return axios.get(`/api/subscribe/getAll`)
    }
}

export default SubscribeService