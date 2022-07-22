import React, {useEffect, useState} from 'react';
import HeaderProduct from "../../components/HeaderProduct/HeaderProduct";
import SubscribeService from "../../services/subscribeService";
import {useNavigate, useParams} from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import "./unsubscribe.scss"

const productInfo = {
    title: "Unsubscribe",
    imgUrl: "https://quantumalgorithms.ca/sites/default/files/2021-06/Subscribe%20BG.jpg"
}

function UnsubscribePage() {
    const params = useParams()
    const navigate = useNavigate()
    const [responseInfo, setResponseInfo] = useState({});
    const [isFinished, setIsFinished] = useState(false);

    useEffect(() => {
        SubscribeService.removeFromSubscribeList({subscribeId: params.id})
            .then(res => {
                setResponseInfo(res.data)
            })
            .catch((err) => {
                setResponseInfo({msg: err})
            })
            .finally(() => {
                setTimeout(() => {
                    setIsFinished(true)
                }, 2000)

                setTimeout(() => {
                    navigate("/")
                }, 8000)
            })
    }, [])

    return (
        <div className="unsubscribe-wrapper">
            <HeaderProduct productInfo={productInfo}/>
            <div className="container py-5 text-center">
                {isFinished ? <h2>{responseInfo.msg}</h2> : <Loader/>}
            </div>
        </div>
    );
}

export default UnsubscribePage;