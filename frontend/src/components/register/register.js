import React, {useState} from "react";
import "./register.css"
import "animate.css"
import AuthService from "../../services/AuthService";


const Register = ({isLogin}) => {

    const [userObj,setUserObj]=useState({
        firstName:"",
        lastName:"",
        address:"",
        city:"",
        email:"",
        username:"",
        password: ""

    });
    const [isFormValid, setIsFormValid]=useState(true);
    const [isApiFinish, setIsApiFinish]=useState(false)
    const [isApiError, setIsApiError]=useState(false)

    //collect data from input fields
    const handleInputChange=(event)=>{
        let copyUserObj={...userObj};
        copyUserObj[event.target.name]=event.target.value;
        setUserObj(copyUserObj);
    }
    //switch to login form
    const loginForm = () => {
        isLogin(true)
    };
    //onSubmit form
    const onSubmitForm = (event) => {
        event.preventDefault();
    //validation
        if(!userObj.firstName || !userObj.lastName || !userObj.email || !userObj.email.includes("@") || !userObj.username || !userObj.password){
          setIsFormValid(false)
            return;
        }
        setIsFormValid(true);

        //api call
        AuthService.register(userObj)
            .then((response)=>{
                if(response.status===200){
                    setIsApiFinish(true);
                    setIsApiError(false);
                }
            } )
            //error handle
            .catch((error)=>{
                if(error){
                    setIsApiError(true);
                }

            } )


    };
    return (

        <div className="form-box-R animate__animated animate__fadeIn animate__fast">
            <div className="button-box">
                <div id="btn-R"></div>
                <button type="button" className="toggle-btn" onClick={loginForm}>Login</button>
                <button type="button" className="toggle-btn">Register</button>
            </div>
            <div className="register-form">
                <form className="input-group-custom" onSubmit={(event) => {
                    onSubmitForm(event)
                }}>
                    <input type="text" className='input-field' name="firstName" placeholder="*First name" onChange={(event)=>{handleInputChange(event)}}/>
                    <input type="text" className='input-field' name="lastName" placeholder="*Last name" onChange={(event)=>{handleInputChange(event)}}/>
                    <input type="text" className='input-field' name="email" placeholder="*Email" onChange={(event)=>{handleInputChange(event)}}/>
                    <input type="text" className='input-field' name="username" placeholder="*Username" onChange={(event)=>{handleInputChange(event)}}/>
                    <input type="password" className='input-field' name="password" placeholder="*Password" onChange={(event)=>{handleInputChange(event)}}/>
                    <input type="text" className='input-field' name="address" placeholder="Address" onChange={(event)=>{handleInputChange(event)}}/>
                    <input type="text" className='input-field' name="city" placeholder="City" onChange={(event)=>{handleInputChange(event)}}/>
                    <label htmlFor="gender">Gender:</label>
                    <div className="gender">
                        <select id="genderSelect">
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </div>
                    <button type="submit" className="submit-btn">Register</button>
                    {!isFormValid? <p className="isFormValid animate__shakeX animate__animated animate__fast">Field with * are required</p>:null}
                    {isApiFinish? <p className="apiFinish animate__shakeX animate__animated animate__fast">Successfully registered</p>: null}
                    {isApiError? <p className="apiError animate__shakeX animate__animated animate__fast">API ERROR. Try again</p>:null}
                </form>

            </div>
        </div>
    )
}

export default Register;