import axios from "axios";

class ContactService{
    static sendContactForm(body) {
        return axios.post("/api/contact", body);
    }
}
export default ContactService;