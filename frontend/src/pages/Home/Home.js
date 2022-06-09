import React from 'react';
import Users from "../Users/Users";
import Slider from "../../components/Slider/Slider";

function Home(props) {
    return (
        <div className="container">
            <h1>Home</h1>
            <Slider/>
            {/*<Users/>*/}
        </div>
    );
}

export default Home;