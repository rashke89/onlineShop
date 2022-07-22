import React, {useRef, useState} from 'react';
import SubscribeService from "../../services/subscribeService";
import "./subscribe.scss"

function Subscribe({bgUrl, titleText, titleTextBefore, titleTextAfter}) {
    const [subscribeEmail, setSubscribeEmail] = useState("");
    const [responseMsg, setResponseMsg] = useState("");
    const [errMsg, setErrMsg] = useState("");
    const inputEmail = useRef();

    const style = {
        background: `linear-gradient(rgba(0,0,0, 0.8), rgba(0,0,0, 0.8)), url(${bgUrl})`,
        backgroundSize: "cover"
    }

    const handleOnInput = (e) => {
        setSubscribeEmail(e.target.value)
    }

    const signUpSubscribe = (e) => {
        e.preventDefault()
        let regexTest = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
        if (!regexTest.test(subscribeEmail)) {
            setErrMsg("You must input valid E-mail address")
            inputEmail.current.focus()
        } else {
            SubscribeService.addToSubscribeList(subscribeEmail)
                .then(res => {
                    setResponseMsg(res.data);
                })
            setSubscribeEmail("")
            setErrMsg("")
        }
    }

    const formLayout = () => {
        return <form onSubmit={signUpSubscribe}>
            <input ref={inputEmail} type="text" placeholder="Your Email Address" onInput={handleOnInput}
                   value={subscribeEmail}/>
            <button>sign up</button>
        </form>
    }
    const responseMsgLayout = () => {
        return <p className="subscribe-response">{responseMsg}</p>
    }

    return (
        <section className="subscribe subscribe-wrapper" style={style}>
            <div className="container">
                <p className="subscribe-title-before">{titleTextBefore}</p>
                <h2 className="subscribe-title">{titleText}</h2>
                <p className="subscribe-title-after">{titleTextAfter}</p>
                {responseMsg ? responseMsgLayout() : formLayout()}
                {errMsg && <p className="subscribe-error">{errMsg}</p>}
            </div>
        </section>
    );
}

export default Subscribe;