import React, { useState, useEffect } from 'react';

function BySelection({ allAds, setAllAds, constAds }) {

    const [selected, setSelected] = useState('default');

    // * FILTER BY SELECTION
    useEffect(() => {
        let sortedAds;
        
        if (selected === "default") {
            setAllAds(constAds);
        } else if (selected === "low-price") {
            sortedAds = [...allAds];
            sortedAds = sortedAds.sort((a, b) => a.price - b.price);
            setAllAds(sortedAds);

        } else if (selected === "high-price") {
            sortedAds = [...allAds];
            sortedAds = sortedAds.sort((a, b) => b.price - a.price);
            setAllAds(sortedAds);
        }
    }, [selected]);

    return (
        <>
            <select onChange={e => { setSelected(e.target.value) }} defaultValue="default" className="form-select" style={{ width: '150px', marginBottom: '20px' }} name="prices">
                <option value="default">Default</option>
                <option value="low-price">Low price</option>
                <option value="high-price">High price</option>
            </select>
        </>
    )
}

export default BySelection;
