import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { getProductDetalis } from './../../Redux/ProdetailsSlice';
import { useParams } from 'react-router-dom';
import Slider from 'react-slick';
import Loading from './../Loading/Loading';
import { addToCart } from './../../Redux/AddToCartSlice';
import { toast } from 'react-hot-toast';
import loadingpp from '../../images/loading2.gif'

export default function ProDetails() {

    const { id } = useParams()
    const [loading, setloading] = useState(false)
    const [loading2, setloading2] = useState(false)
    const [proDetails, setproDetails] = useState([])
    const dispatch = useDispatch()

    async function getData() {
        setloading(true)
        const data = await dispatch(getProductDetalis(id))
        setproDetails(data?.payload?.data);
        setloading(false)
    }

    async function addProduct(productId) {
        setloading2(true)
        const data = await dispatch(addToCart(productId))
        setloading2(false)
        if (data?.payload?.status === 'success') {
            toast.success(data?.payload?.message, { duration: 2000 })
        }
        else {
            toast.error('Ops Something Went Wrong Please Try Again')
        }
    }

    useEffect(() => {
        getData()
    }, [])

    let settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
    };
    return <>
        {loading ? <Loading /> : <section>
            <div className="container">
                <div className="row">
                    <div className="col-sm-12 col-md-4 my-5">
                        <Slider {...settings}>
                            {proDetails.images?.map((el, index) => {
                                return <div key={index} className='py-2'>
                                    <img src={el} className='w-100' alt="prologo" />
                                </div>
                            })}
                        </Slider>
                    </div>
                    <div className="col-sm-12 col-md-8">
                        <div className='my-5 pt-5'>
                            <div className='w-25'><img src={proDetails?.brand?.image} className='w-50' alt="" /></div>
                            <div className='ms-2'>
                                <h2>{proDetails?.title}</h2>
                                <p>By <span className='text-primary'>{proDetails?.brand?.name}</span></p>
                                <div><p className='pe-3'>Rating: <i className="fa-solid fa-star zonyellowcolor"></i> <span className='zonoffblackcolor'>{proDetails?.ratingsAverage}</span></p></div>
                                <div className='d-flex'>
                                    <div className='zonoffblackbg w-25 text-center p-1 rounded-3'><span className='text-white'>Amazon's</span> <span className='zonyellowcolor'>Choice</span></div>
                                    <span className='ps-2'>for <span className='text-primary'>"{proDetails?.category?.name}"</span></span>
                                </div>
                                <div className='w-100 line bg-secondary mt-2'></div>
                                {proDetails.priceAfterDiscount ? <div className='bg-danger text-white w-25 mt-2 text-center rounded-1 p-2'>On Sale</div> : ''}
                                <div className='d-flex'><p className='zonoffblackcolor pe-1'>Price:</p> {proDetails.priceAfterDiscount ? <div><span className='text-success text-decoration-line-through'>{proDetails.price}</span> <span className='text-success'>{proDetails.priceAfterDiscount} EGP</span></div> : <span className='text-success'>{proDetails.price} EGP</span>}</div>
                                <div className='d-flex'>
                                    <p>Only</p>
                                    <span className='text-danger mx-1'>{proDetails.quantity}</span>
                                    <p>left</p>
                                </div>
                                <div><p className='fs-5'>{proDetails?.description}</p></div>
                                {loading2 ? <div className='w-25 mx-auto'><input type="image" src={loadingpp} className='w-100 rounded-3 text-center' /></div> : <button onClick={() => { addProduct(proDetails.id) }} className='w-100 zonblackcolor zonyellowbg btn btn-warning'>+ Add to Cart</button>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>}
    </>
}
