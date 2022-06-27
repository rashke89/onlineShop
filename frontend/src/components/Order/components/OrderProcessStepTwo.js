function OrderProcessStepTwo() {

    const handleSubmit = (e) => {
        e.preventDefault();
    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="firstName" className="form-label">First name</label>
                            <input type="text" className="form-control" id="firstName"/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="lastName" className="form-label">Last name</label>
                            <input type="text" className="form-control" id="lastName"/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="address" className="form-label">Address</label>
                            <input type="text" className="form-control" id="address"/>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label htmlFor="city" className="form-label">City</label>
                            <input type="text" className="form-control" id="city"/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="postCode" className="form-label">Post code</label>
                            <input type="text" className="form-control" id="postCode"/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="phoneNumber" className="form-label">Phone number</label>
                            <input type="text" className="form-control" id="phoneNumber"/>
                        </div>
                    </div>
                </div>

                <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="terms"/>
                    <label className="form-check-label" htmlFor="terms">Accept terms</label>
                </div>
                <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="conditions"/>
                    <label className="form-check-label" htmlFor="conditions">Accept conditions</label>
                </div>
            </form>

        </>
    )
}

export default OrderProcessStepTwo;
