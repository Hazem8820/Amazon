import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import Slider from "react-slick";
import { getBrands } from '../../Redux/BrandsSlice';

export default function CategorySlider() {
    const [Brands, setBrands] = useState([])

    const dispatch = useDispatch()

    async function getData() {
        let data = await dispatch(getBrands())
        setBrands(data?.payload?.data);
    }

    useEffect(() => {
        getData()
    }, [])

    let settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 3,
        arrows: false,
        autoplay: true,
        speed: 2000,
        autoplaySpeed: 1000,
    };


    return <>
        <section>
            <div className="container-fluid">
                <Slider {...settings}>
                    {Brands?.map((el, index) => {
                        return <div key={index} className='pt-2'>
                            <img src={el.image} className='w-100 px-3 rounded-5' alt="brandlogo" />
                        </div>
                    })}
                </Slider>
            </div>
        </section >

    </>
}