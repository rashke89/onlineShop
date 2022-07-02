import axios from "axios";

class PaymentService{

static initPayment(body){
    return axios.post('/api/payment/init-payment',body)
}

}

export default PaymentService