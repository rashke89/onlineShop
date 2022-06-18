import axios from "axios";

class MessageService {

    static sendMessage(message){
        return axios.post('/api/send-message', message)
    }
}

export default MessageService;