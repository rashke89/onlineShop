import OrderProcess from "../../components/Order/OrderProcess";

function Order() {
    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h1>Order process</h1>
                        <OrderProcess/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Order;
