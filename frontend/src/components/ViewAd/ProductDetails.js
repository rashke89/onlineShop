import {useState} from "react";

function ProductDetails() {
    const [isDescriptionActive, setIsDescriptionActive] = useState(true);
    const [isInformationActive, setIsInformationActive] = useState(false);
    const [isReviewsActive, setIsReviewsActive] = useState(false);


    const changeContent = (e) => {
        let element = e.target;
        if (element.value === "product-description") {
            setIsDescriptionActive(true);
            setIsInformationActive(false);
            setIsReviewsActive(false);
        }
        if (element.value === "product-information") {
            setIsDescriptionActive(false);
            setIsInformationActive(true);
            setIsReviewsActive(false);
        } else if (element.value === "product-reviews") {
            setIsDescriptionActive(false);
            setIsInformationActive(false);
            setIsReviewsActive(true);
        }
    }

    return <>
        <div className="col-md-12 product-details">
            <button value="product-description" className={`toggle-btn mx-2 ${isDescriptionActive && 'btn'}`} onClick={changeContent}>Product description</button>
            <button value="product-information" className={`toggle-btn mx-2 ${isInformationActive && 'btn'}`} onClick={changeContent}>More information</button>
            <button value="product-reviews" className={`toggle-btn mx-2 ${isReviewsActive && 'btn'}`} onClick={changeContent}>Reviews</button>
            <hr/>

            <div className="product-details-content">
                {isDescriptionActive &&
                    <p className="product-description">Could you be mine. Just two good ol' boys Never meanin' no harm.
                        Beats all you've ever saw been in
                        trouble with the law since the day they was born. Till the one day when the lady met this fellow
                        and
                        they knew it was much more than a hunch said Californ'y is the place you ought to be.

                        Hills that is. Swimmin' pools movie stars. Makin their way the only way they know how. That's
                        just a
                        little bit more than the law will allow. Got kind of tired packin' and unpackin' - town to town
                        and
                        up and down the dial. Space. The final frontier. These are the voyages of the Starship
                        Enterprise.,
                        You wanna be where you can see our troubles are all the same. You wanna be where everybody knows
                        Your name.</p>}
                {isInformationActive &&
                    <p className="product-information">The powerless in a world of criminals who operate above the law.
                        I have always wanted to have a neighbor just like you. I've always wanted to live in a
                        neighborhood with you. Come and dance on our floor. Take a step that is new. We've a loveable
                        space that needs your face threes com pany too one two three four five.
                    </p>}
                {isReviewsActive &&
                    <p className="product-reviews"><span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci asperiores at commodi corporis,
                    eligendi fugit ipsam nesciunt officia provident rem reprehenderit similique voluptates? Commodi dolor fuga
                    hic impedit, omnis qui.</span><span>Ad aliquid animi, asperiores aspernatur, cupiditate dignissimos distinctio
                    enim esse eum expedita facere impedit laudantium libero pariatur quae quam quas, quia quibusdam quidem rerum
                    similique ullam unde veniam vitae voluptatibus!</span><span>Adipisci autem ea eius eligendi iste omnis praesentium
                    quos reiciendis totam voluptates. At culpa cupiditate dolore dolorum facere harum, iure, neque non numquam optio
                    quia sequi soluta. Ipsam iure, possimus!</span>Adipisci asperiores dolores dolorum eius enim et
                        maxime,
                        nulla placeat quia reiciendis sequi tenetur vel velit? Aperiam illo laborum odit omnis quam, rem
                        ullam!
                    </p>}
            </div>
        </div>
    </>

}

export default ProductDetails;