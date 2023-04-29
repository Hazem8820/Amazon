import React from 'react'
import Slider from "react-slick";
import slider1 from '../../images/Slider/slider1.jpg'
import slider2 from '../../images/Slider/slider2.jpg'
import slider3 from '../../images/Slider/slider3.jpg'
import slider4 from '../../images/Slider/slider4.jpg'
import slider5 from '../../images/Slider/slider5.jpg'
import slider6 from '../../images/Slider/slider6.jpg'
import slider7 from '../../images/Slider/slider7.jpg'
import slider8 from '../../images/Slider/slider8.jpg'
import slider9 from '../../images/Slider/slider9.jpg'
export default function MainSlider() {
    let settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
        speed: 2000,
        autoplaySpeed: 4000,
    };
    return <>
        <section>
            <div>
                <Slider {...settings}>
                    <div>
                        <img src={slider1} className='w-100' alt="" />
                    </div>
                    <div>
                        <img src={slider2} className='w-100' alt="" />
                    </div>
                    <div>
                        <img src={slider3} className='w-100' alt="" />
                    </div>
                    <div>
                        <img src={slider4} className='w-100' alt="" />
                    </div>
                    <div>
                        <img src={slider5} className='w-100' alt="" />
                    </div>
                    <div>
                        <img src={slider6} className='w-100' alt="" />
                    </div>
                    <div>
                        <img src={slider7} className='w-100' alt="" />
                    </div>
                    <div>
                        <img src={slider8} className='w-100' alt="" />
                    </div>
                    <div>
                        <img src={slider9} className='w-100' alt="" />
                    </div>
                </Slider>
            </div>
        </section>
    </>
}
