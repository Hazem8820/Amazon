import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import Loading from './../Loading/Loading';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import emptylist from '../../images/empty_wishlist.png'
import { getLoggedUserWishlist } from '../../Redux/getLoggedUserWishlist';
import { removeItemFromWishlist } from '../../Redux/removeItemFromWishlistSlice';
import { addToCart } from './../../Redux/AddToCartSlice';

export default function Wishlist() {

    const [Wishlist, setWishlist] = useState([])
    const [isloading, setisloading] = useState(false)

    const dispatch = useDispatch()

    async function getLoggedWishlist() {
        setisloading(true)
        const data = await dispatch(getLoggedUserWishlist())
        setWishlist(data?.payload?.data);
        setisloading(false)
    }

    async function removeProduct(productId) {
        setisloading(true)
        const data = await dispatch(removeItemFromWishlist(productId))
        setisloading(false)
        if (data?.payload?.status === 'success') {
            toast.success('Product Successfully Removed From Your Wishlist')
        }
        else {
            toast.error('Ops Something Went Wrong Please Try Again')
        }
    }

    async function addProduct(productId) {
        setisloading(true)
        const data = await dispatch(addToCart(productId))
        setisloading(false)
        if (data?.payload?.status === 'success') {
            toast.success(data.payload.message, { duration: 2000 })
        }
        else {
            toast.error('Ops Something Went Wrong Please Sign in and try Again')
        }
    }

    useEffect(() => {
        getLoggedWishlist()
    }, [])

    return <>
        {isloading ? <Loading /> : <section>
            <div className='col-xxl-12 zononblackkbg shadow-lg p-1 text-center'><Link className='linkhover texthover p-1 text-light text-decoration-none' to={'/wishlist'}><span><i className="fa-sharp fa-solid fa-clipboard-list"></i></span> Wishlist</Link></div>
            <div className="container">
                <div className="row">
                    <div className="col-xl-12">
                        <div className='d-flex justify-content-between'>
                            <h1 className='zonblackcolor'><span><i className="fa-sharp fa-solid fa-clipboard-list"></i></span> Wishlist</h1>
                        </div>
                        <div className='w-100 line bg-secondary rounded-3 mt-2'></div>
                        {Wishlist.length == 0 ? <>
                            <div className='w-50 mx-auto'><img src={emptylist} className='w-100' alt="" /></div>
                            <div className='text-center zononblackcolor'><h2>Your Wishlist is Empty</h2></div>
                        </> :
                            <div>{Wishlist?.map((el, index) => {
                                return <div key={index}> <div className='d-flex justify-content-between'>
                                    <div className='row'>
                                        <div className='w-25 pe-1 col-sm-12 col-lg-5'>
                                            <img src={el?.imageCover} className='w-100 rounded-3' alt="logo" />
                                        </div>
                                        <div className='col-sm-12 col-lg-7'>
                                            <img src={el?.brand?.image} className='w-25' alt="brandlogo" />
                                            <div><span className='mt-5 zononblackcolor pe-1'>Brand:</span><span>{el?.brand?.name}</span></div>
                                            <div className='d-flex'><span className='pe-1 zononblackcolor'>Category:</span><p className='text-primary'>{el?.category?.name}</p></div>
                                            <h6>{el?.title}</h6>
                                            <span className='text-success'>In Stock</span>
                                            <div><p className='pe-3 zononblackcolor'>Rating: <i className="fa-solid fa-star zonyellowcolor"></i> <span className='zonoffblackcolor'>{el?.ratingsAverage}</span></p></div>
                                            <div className='d-flex'>
                                                <div>
                                                    <button onClick={() => { addProduct(el?.id) }} className='zonblackcolor zonyellowbg btn btn-warning'>
                                                        + Add to Cart
                                                    </button>
                                                </div>
                                                <div>
                                                    <button onClick={() => { removeProduct(el?.id) }} className='zonblackcolor btn'>
                                                        <span className='text-danger'>
                                                            <i className="fa-regular fa-trash-can"></i>
                                                        </span>
                                                        Remove
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <p className='zononblackcolor fs-3'>Price:{el?.price}<span className='text-success ps-1'>EGP</span></p>
                                    </div>
                                </div>
                                    <div className='w-100 line bg-secondary rounded-3 mt-2'></div>
                                </div>
                            })}</div>}
                    </div >
                </div>
            </div>
        </section >}
    </>
}
