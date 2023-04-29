import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { getCategoriesSlider } from './../../Redux/CategorySliderSlice';
import Slider from "react-slick";

export default function CategorySlider() {
    const [Category, setCategory] = useState([])

    const dispatch = useDispatch()

    async function getData() {
        let data = await dispatch(getCategoriesSlider())
        setCategory(data?.payload?.data);
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
        <section className='shadow'>
            <div className="container-fluid">
                <Slider {...settings}>
                    {Category?.map((el, index) => {
                        return <div key={index} className='bg-light pt-2'>
                            <img src={el.image} className='w-100 px-3 rounded-5' height={200} alt="" />
                            <h1 className='text-center zononblackcolor'>{el.name}</h1>
                        </div>
                    })}
                </Slider>
            </div>
        </section >

    </>
}
