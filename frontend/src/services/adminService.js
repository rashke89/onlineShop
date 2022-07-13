import axios from "axios";

class AdminService{
    static getStats(){
        return axios.get("api/admin/stats")
    }
}

export default AdminService;