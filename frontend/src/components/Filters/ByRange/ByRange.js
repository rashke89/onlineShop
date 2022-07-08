import React, { useEffect, useState } from 'react';

function ByRange({ allAds, setAllAds, constAds }) {

    const [filterValue, setFilterValue] = useState('');
    const [maxPrice, setMaxPrice] = useState(0);

    const handleInputRange = (e) => {
        let price = e.target.value;
        setFilterValue(price);

        let sortedAds = [...allAds];
        if (parseInt(price) !== 0) {
            sortedAds = constAds.filter(item => item.price < parseInt(price));
            setAllAds(sortedAds);
        } else {
            setAllAds(constAds);
        }
    }

    // TODO: MAX PRICE NE RADI KAKO TREBA
    useEffect(() => {
            let allPrices = [];
            for (let i = 0; i < constAds.length; i++) {
                if (constAds[i].price > 0) {
                    allPrices.push(constAds[i].price);
                } 
            }
            console.log('AREJ SVIH CENA', allPrices); 
            let highestPrice = Math.max(...allPrices);
            // console.log(highestPrice);
            setMaxPrice(highestPrice); 

    }, [maxPrice]);

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>

            <label htmlFor="priceRange" className="form-label">Price: {filterValue > 0 ? '$' + filterValue : null} </label>
            {maxPrice && <input onInput={e => handleInputRange(e)} type="range" className="form-range" defaultValue="0" min="0" max={maxPrice} step="1" id="priceRange" />}
            {console.log('NAJVECA CENA', maxPrice)}

        </div>
    )
}

export default ByRange
