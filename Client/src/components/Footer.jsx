import React from 'react'

import instagram1 from "../assets/instagram-1.jpg"
import instagram2 from "../assets/instagram-2.jpg"
import instagram3 from "../assets/instagram-3.jpg"
import instagram4 from "../assets/instagram-4.jpg"
import instagram5 from "../assets/instagram-5.jpg"
import instagram6 from "../assets/instagram-6.jpg"


const Footer = () => {
    return (
        <>
            <footer className='section__container footer__container'>
                <div className='footer__col'>
                    <h4>CONTACT INFO</h4>
                    <p> <span><i className="ri-map-pin-2-fill"></i></span>123, London Bridge Street ,london</p>
                    <p><span><i className="ri-mail-fill"></i></span>support@lebaba.com</p>
                    <p><span><i className="ri-cellphone-fill"></i></span>(+012) 3456 789</p>
                </div>

                <div className='footer__col'>
                    <h4>COMPANY</h4>
                    <a href="/">Home</a>
                    <a href="/">About Us</a>
                    <a href="/">Work With US</a>
                    <a href="/">Our Blogs</a>
                    <a href="/">terms & Condition</a>
                </div>

                <div className='footer__col'>
                    <h4>USEFUL LINK</h4>
                    <a href="/">Help</a>
                    <a href="/">Track Your Orders</a>
                    <a href="/">Men</a>
                    <a href="/">Women</a>
                    <a href="/">Dresses</a>
                </div>

                <div className='footer__col'>
                    <h4>INSTAGRAM</h4>
                    <div className='instagram__grid'>
                    <img src={instagram1} alt="image" />
                    <img src={instagram2} alt="image" />
                    <img src={instagram3} alt="image" />
                    <img src={instagram4} alt="image" />
                    <img src={instagram5} alt="image" />
                    <img src={instagram6} alt="image" />
                    </div>
                </div>
            </footer>
            <div className='footer__bar'>
                Copyright @ 2025 by Smart World. All right reserved.
            </div>

        </>
    )
}

export default Footer