import React, { useEffect, useState } from 'react'
import { getCategoriesSlider } from './../../Redux/CategorySliderSlice';
import { useDispatch } from 'react-redux';
import Loading from '../Loading/Loading';
import { Link } from 'react-router-dom';

export default function Categories() {

    const [Categories, setCategories] = useState([])
    const [isLoading, setisLoading] = useState(false)

    const dispatch = useDispatch()

    async function getData() {
        setisLoading(true)
        const data = await dispatch(getCategoriesSlider())
        setCategories(data?.payload?.data);
        setisLoading(false)
    }

    useEffect(() => {
        getData()
    }, [])


    return <>
        {isLoading ? <Loading /> : <section>
            <div className="container-fluid">
                <div className="row">
                    {Categories.map((el, index) => {
                        return <div key={index} className="col-md-4 col-lg-3 col-xl-2 my-3 prodiv">
                            <Link className='text-decoration-none' to={`/categorydetails/${el._id}`}>
                                <div className='zononblackkbg shadow-lg rounded-3 contdiv w-100 overflow-hidden'>
                                    <img src={el.image} className='w-100' height={180} alt="products" />
                                    <h6 className='zonyellowcolor text-center'>{el.name.split('').slice(0, 30).join('')}</h6>
                                </div>
                            </Link>
                        </div>
                    })}
                </div>
            </div>
        </section>}
    </>
}
