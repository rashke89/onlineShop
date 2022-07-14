import React, {useEffect, useState} from 'react';
import AuthService from "../../services/authService";
import {useDispatch, useSelector} from "react-redux";
import {showLoader} from "../../redux/loaderSlice";
import {setUser} from "../../redux/userSlice";
import "./changePasswordStyle.scss"

function ChangePassword({showModal}) {
    const {user} = useSelector(state => state.userStore)
    const [disabledBtn, setDisabledBtn] = useState(true);
    const [isValid, setIsValid] = useState(true);
    const [resMsg, setResMsg] = useState({});
    const dispatch = useDispatch()
    const [inputData, setInputData] = useState({
        oldPassword: "",
        newPassword: "",
        repeatPassword: "",
    });
    useEffect(() => {
        if (inputData.repeatPassword && inputData.oldPassword && inputData.newPassword) {
            setDisabledBtn(false)
        } else {
            setIsValid(true)
            setDisabledBtn(true)
        }
    }, [inputData]);

    const onInputHandler = (e) => {
        let copyInputData = {...inputData}
        copyInputData[e.target.name] = e.target.value
        setInputData(copyInputData)
    }

    const saveChanges = () => {
        if (inputData.repeatPassword === inputData.newPassword) {
            setIsValid(true)
            dispatch(showLoader(true))
            AuthService.changePassword({
                userId: user._id,
                oldPassword: inputData.oldPassword,
                newPassword: inputData.newPassword
            })
                .then(res => {
                        if (res.status !== 200) {
                            setIsValid(false)
                            setResMsg({err: res.data})
                        } else {
                            setResMsg({success: "Password is changed"})
                            dispatch(setUser(res.data))
                            localStorage.setItem("user", JSON.stringify(res.data))
                            showModal()
                        }
                    }
                )
                .catch((err) => {
                    setResMsg({err: err})

                })
                .finally(() => {
                    dispatch(showLoader(false))
                })
        } else {
            setIsValid(false)
            setResMsg({err: "New password and repeat password isn't match!"})
        }
    }

    return (<div className="change-password-wrapper modal-box">
        <div className="modal-box-dialog">
            <h3>Change password</h3>
            <label htmlFor="oldPassword">Old password (required)</label>
            <input id="oldPassword" className="form-control mb-3" type="password" placeholder="Old password"
                   name="oldPassword"
                   value={inputData.oldPassword}
                   onInput={onInputHandler}/>
            <label htmlFor="newPassword">New password (required)</label>
            <input id="newPassword" className="form-control mb-3" type="password"
                   placeholder="New password"
                   name="newPassword"
                   value={inputData.newPassword}
                   onInput={onInputHandler}/>
            <label htmlFor="repeatPassword">Repeat new password (required)</label>
            <input id="repeatPassword" className="form-control mb-3" type="password"
                   placeholder="Repeat new password"
                   name="repeatPassword"
                   value={inputData.repeatPassword}
                   onInput={onInputHandler}/>

            {isValid && resMsg.success ? <p className="text-center">{resMsg.success}</p> :
                <p className="text-center text-danger">{resMsg.err}</p>}

            <div className="d-flex justify-content-between w-100">
                <button type="button" className="btn" onClick={showModal}>Cancel</button>
                <button type="button" className="btn" onClick={saveChanges} disabled={disabledBtn}>Save changes</button>
            </div>

        </div>
    </div>)
}

export default ChangePassword;