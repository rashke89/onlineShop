import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "./clients.scss";
import {useEffect, useState} from "react";
import ClientsService from "../../services/clientsService";

function ClientsWord() {
    const [clients, setClients] = useState([]);

    useEffect(() => {
        ClientsService.getClients()
            .then(res => {
                if (res.status === 200) {
                    setClients(res.data);
                }
            })
            .catch(err => {
                console.log(err);
            })
    }, []);

    const settings = {
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 3,
        arrows: false,
        dots: true,
        responsive: [{
            breakpoint: 1024,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                infinite: true
            }

        }, {
            breakpoint: 600,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                dots: true
            }
        }]
    };

    return (
        <>
            {clients.length > 0 &&<div className="testimonial-box">
                <div className="clients-header">
                    <h3>Words from clients</h3>
                </div>
                <Slider {...settings}>
                    {clients.map((client, index) => {
                        return <div className="col-md-12" key={index}>
                            <div className="testimonial-content">
                                <p>{client.text}</p>
                                <h3>{client.name}</h3>
                                <h5>Happy customer</h5>
                            </div>
                            <div className="testimonial-author">
                                <i><img src={client.image} alt=""/> </i>
                            </div>
                        </div>
                    })}
                </Slider>
            </div>}
        </>
    )
}

export default ClientsWord;