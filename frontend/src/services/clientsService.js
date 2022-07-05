import axios from "axios";

class ClientsService{

    static getClients(){
        return axios.get('/api/home');
    }
}

export default ClientsService;