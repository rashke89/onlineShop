import axios from "axios";


class SubscribeService {
    static addToSubscribeList(email) {
        return axios.put(`/api/subscribe/addToList`, {email: email})
    }

    static removeFromSubscribeList(body) {
        return axios.post(`/api/subscribe/unsubscribe`, body)
    }

    static deleteSubscription(id){
        return axios.delete(`/api/subscribe/delete/${id}`)
    }

    static getAll() {
        return axios.get(`/api/subscribe/getAll`)
    }
}

export default SubscribeService