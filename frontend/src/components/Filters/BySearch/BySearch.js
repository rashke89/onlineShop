import React, { useState, useEffect } from 'react';

function BySearch({ allAds, setAllAds, constAds }) {

    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        if (searchTerm !== '') {
            let sortedAds = [...allAds]
            sortedAds = constAds.filter(item => item.title.toLowerCase().includes(searchTerm.toLowerCase()) || item.description.toLowerCase().includes(searchTerm.toLowerCase()));
            setAllAds(sortedAds);
        } else {
            setAllAds(constAds);
        }
    }, [searchTerm])

    return (
        <>
            <form className="d-flex me-4 ms-4 search h-100" role="search">
                <div className="input-group">
                    <input className="form-control" type="search" placeholder="Search" aria-label="Search" onChange={e => setSearchTerm(e.target.value)} />
                </div>
            </form>
        </>
    )
}

export default BySearch;
