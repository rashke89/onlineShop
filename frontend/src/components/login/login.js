import {useState} from "react";
import "./login.css"
import "animate.css"
import fb from "./img/fb.png"
import ig from "./img/ig.png"
import tw from "./img/tw.png"
import AuthService from "../../services/AuthService";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {setUser} from "../../redux/userSlice";


const Login = ({isLogin}) => {

    const dispatch=useDispatch();
    const navigate=useNavigate();

    const [userInfo, setUserInfo] = useState({
        username: "",
        password: ""
    })

    const [isFormValid, setIsFormValid] = useState(true)
    const [apiError, setApiError]=useState(false)
    const [isUserFound, setIsUserFound]=useState(true)

    //show Register form
    const loginForm=()=>{isLogin(false)}

    //collect data form input fields
    const handleInputChange = (e) => {
        let user = {...userInfo};
        user[e.target.name] = e.target.value
        setUserInfo(user);

    }

    const onSubmitForm = (event) => {
        event.preventDefault();

            //username and password validation
        if (!userInfo.username || !userInfo.password) {
            setIsFormValid(false)
            return
        }
        setIsFormValid(true)

        //api call
        AuthService.login(userInfo)
            .then((response)=>{
                if(response && response.status===200){
                    console.log(response.data);
                    setApiError(false);
                    if(response.data==="User not found." || response.data==null){
                        setIsUserFound(false)
                    }else{
                        setIsUserFound(true)
                    localStorage.setItem("user", JSON.stringify(response.data))
                    dispatch(setUser(response.data))
                    navigate("/")
                    }
                }
            })
            //error handling
            .catch((error)=>{
                console.log(error);
                setApiError(true)
            } )



    }
    return (

        <div className="form-box-L animate__animated animate__fadeIn animate__fast">
            <div className="button-box">
                <div id="btn-L"></div>
                <button type="button" className="toggle-btn">Login</button>
                <button type="button" className="toggle-btn" onClick={loginForm}>Register</button>
            </div>

            <div className="login-form">
                <form className="input-group-custom" onSubmit={event => {
                    onSubmitForm(event)
                }}>
                    <input type="text" className='input-field' placeholder="Username" name="username"
                           onChange={(event) => {
                               handleInputChange(event)
                           }}/>
                    <input type="password" className='input-field' placeholder="Password" name="password"
                           onChange={handleInputChange}/>
                    <button type="submit" className="submit-btn">Login</button>
                    {!isFormValid ?
                        <p className="isFormValidError animate__shakeX animate__animated animate__fast">Username and password are required</p>
                        : null}
                    {apiError ? <p className="apiError animate__shakeX animate__animated animate__fast">API Error. Please try later.</p>
                    : null}
                    {!isUserFound ? <p className="apiError animate__shakeX animate__animated animate__fast">User not found. Please register.</p>
                    : null}
                    <div className="social-icons">
                        <div><a href="https://facebook.com"><img src={fb} alt="Facebook"/></a></div>
                        <div><a href="https://twitter.com"> <img src={tw} alt="Twitter"/></a></div>
                        <div><a href="https://instagram.com"> <img src={ig} alt="Instagram"/></a></div>


                    </div>

                </form>
            </div>
        </div>


    )
}

export default Login;