import axios from "axios";

class AdminService{
    static numbersInfo(){
        return axios.get("api/admin/numbers-info")
    }
}

export default AdminService;