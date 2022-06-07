import '../App.css';
import React from 'react';

function Heading() {
    let currentName = 'Andrija';
    const [stateValue, stateFunction] = React.useState('');
    const changeH1 = (e) => {
        console.log(e.target.value);
        stateFunction(e.target.value);
    }

    // * OVO MI NE RADI, NE ZNAM ZASTO
    // ! ovov
    // ? sada a
    // todo dasdasdsa
    // \\ New comment
    if (stateValue !== '') {
        currentName = false;
    }

    return (
        <div className='heading'>
            <h1>{currentName || stateValue}</h1>
            <p className='heading-text'>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
            <label htmlFor="">Input</label>
            <input type="text" onChange={changeH1}/>
        </div>
    );
}

export default Heading;