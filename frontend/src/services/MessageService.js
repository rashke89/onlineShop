import axios from "axios";

class MessageService {

    static sendMessage(message) {
        return axios.post('/send-message', message);
    }
}

export default MessageService;