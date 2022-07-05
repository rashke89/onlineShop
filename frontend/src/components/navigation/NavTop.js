import './nav-top.scss';

import {
    FaPhoneAlt,
    FaMailBulk,
    FaAngleDown,
    FaLaptopHouse,
    FaSearch,
    FaShoppingCart
  } from "react-icons/fa";

function NavTop(){

    return (
        <section className='nav-bar-wrapper'>
            
            <article className='nav-bar-info container'>

                <div className='info-phone'>
                    <a href='/'> <FaPhoneAlt/> &nbsp; <span>Phone: </span> (+1) 123 - 456 - 7890 </a>
                </div>
                
                <div className='info-email-currency'>
                    <div className='email'>
                        <a href='/'> <FaMailBulk/> &nbsp; <span> Email: </span> Info@Ourdomain.Com </a>
                    </div>
                    <div className='currency'> 
                        <p>Currency : USD <FaAngleDown/> </p>
                    </div>
                </div>

                <div className='info-account'>
                    <p>MY ACCOUNT <FaAngleDown/> </p>
                </div>

            </article>
            <hr className='line' />



            <article className='nav-bar-middle container'>


                <div className='middle-logo'>
                    <a href="/">
                        <span> <FaLaptopHouse/> </span>
                        <span>furn</span>
                        <span>home</span>
                    </a>
                </div>

                <div className='middle-search-cart'>

                    <div className='middle-cat'>
                        <a href='/'> Category <FaAngleDown/> </a>
                    </div>

                    <div className='middle-search'>
                        <input type='search' placeholder='Search...' />
                        <a href='/'> <FaSearch/> </a>
                    </div>

                    <div className='middle-cart'>
                        <a href='/'>
                            <FaShoppingCart/>
                        </a>
                    </div>

                </div>

            </article>

        </section>
    )

}

export default NavTop;