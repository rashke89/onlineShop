import axios from "axios";

class MessageService {

    static sendMessage(message) {
        return axios.post('/api/send-message', message)
    }
    static getAllMessages(){
        return axios.get('/api/admin/all-messages')
    }
    static deleteMessage(id){
        return axios.delete(`/api/admin/delete-msg/${id}`)
    }
}

export default MessageService;