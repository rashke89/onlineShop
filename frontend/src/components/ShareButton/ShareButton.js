import React from 'react';
import {
    FacebookShareButton,
    WhatsappShareButton,
    ViberShareButton,
    EmailShareButton,
    TwitterShareButton,
} from "react-share";
import {FacebookIcon, WhatsappIcon, ViberIcon, EmailIcon, TwitterIcon} from "react-share";
import "./share-button.scss"

function ShareButton({url, title, description, size, round = true}) {

    return (
        <div className="share-social-wrapper">
            <FacebookShareButton url={url} quote={title}>
                <FacebookIcon size={size} round={round}/>
            </FacebookShareButton>

            <WhatsappShareButton url={url} title={title} separator=" - ">
                <WhatsappIcon size={size} round={round}/>
            </WhatsappShareButton>

            <ViberShareButton url={url} title={title} separator=" - ">
                <ViberIcon size={size} round={round}/>
            </ViberShareButton>
            <EmailShareButton url={url} subject={title} body={description} separator=":: ">
                <EmailIcon size={size} round={round}/>
            </EmailShareButton>
            <TwitterShareButton url={url} title={title}>
                <TwitterIcon size={size} round={round}/>
            </TwitterShareButton>

        </div>
    );
}

export default ShareButton;