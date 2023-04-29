import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { getAllOrdersData } from '../../Redux/getAllOrdersSlice'
import Loading from '../Loading/Loading'
import emptycart from '../../images/empty-cart.webp'

export default function Allorders({ userData }) {

    const dispatch = useDispatch()
    const [orders, setorders] = useState([])
    const [isloading, setisloading] = useState(false)

    async function getData(userId) {
        setisloading(true)
        const data = await dispatch(getAllOrdersData(userId))
        setorders(data?.payload);
        setisloading(false)
    }

    useEffect(() => {
        if (userData?.id !== null) {
            getData(userData?.id)
        }
    }, [])


    return <>
        {isloading ? <Loading /> : <section>
            <div className="container">
                <div className="row">
                    <div className="col-xl-12">
                        <div className='d-flex justify-content-between'>
                            <h1 className='zonblackcolor'><i className="fa-solid fa-truck-fast"></i> Your Orders</h1>
                        </div>
                        <div className='w-100 line bg-secondary rounded-5 mt-2'></div>
                        {orders == null ? <>
                            <div><img src={emptycart} className='w-100' alt="" /></div>
                            <div className='text-center zononblackcolor'><h2>Your Order List is Empty</h2></div>
                        </> :
                            <div>{orders?.map((el, index) => {
                                return <div key={index}>
                                    <div className=' rounded-3 shadow p-2 mt-1'>
                                        <div className='d-flex justify-content-center zonblackbg w-25 mx-auto rounded-3 p-1'><span className='zonyellowcolor'>Order Number {orders.indexOf(el) + 1}</span></div>
                                        {el?.cartItems?.map((el, index) => {
                                            return <div key={index}>
                                                <div className='d-flex my-1'>
                                                    <div className='w-25 pe-1 col-sm-12 col-lg-5'>
                                                        <img src={el.product.imageCover} className='w-100 rounded-3' alt="logo" />
                                                    </div>
                                                    <div className='col-sm-12 col-lg-7'>
                                                        <img src={el.product.brand.image} className='w-25' alt="brandlogo" />
                                                        <div><span className='mt-5 zononblackcolor pe-1'>Brand:</span><span>{el.product.brand.name}</span></div>
                                                        <div className='d-flex'><span className='pe-1 zononblackcolor'>Category:</span><p className='text-primary'>{el.product.category.name}</p></div>
                                                        <h6>{el.product.title}</h6>
                                                        <span className='text-success'>In Stock</span>
                                                        <div><p className='pe-3 zononblackcolor'>Rating: <i className="fa-solid fa-star zonyellowcolor"></i> <span className='zonoffblackcolor'>{el.product.ratingsAverage}</span></p></div>
                                                        <p className='zonblackcolor'>Price: <span className='text-success'>{el.price} EGP</span></p>
                                                        <div className='d-flex w-25 me-auto'>
                                                            <input type="text" disabled defaultValue={'Quantity:' + ' ' + el.count} className='form-control' placeholder='Count...' />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        })}
                                        <div>
                                            <div className='py-1 zonyellowbg text-center rounded-3'>
                                                <p className='zonoffblackbg rounded-2 text-light w-25 mx-auto'>Sir {el.user.name}</p>
                                                <p className='zonoffblackbg rounded-2 text-light w-50 mx-auto'>Details:</p>
                                                <p className='zonblackcolor pt-2'>Shipping Address: {el.shippingAddress.city + " " + el.shippingAddress.details}</p>
                                                <p className='zonblackcolor pt-2'>Phone: {el.shippingAddress.phone}</p>
                                                {el.paymentMethodType == "cash" ? <p className='fs-6'>Payment Method: {el.paymentMethodType}<span className='text-success ps-1'><i className="fa-solid fa-money-bills"></i></span></p> : <p className=' fs-6'>Payment Method: Visa{el.paymentMethodType}<span className='text-primary ps-1'><i className="fa-brands fa-cc-visa"></i></span></p>}
                                                <p className='fs-6'>Total Price: {el.totalOrderPrice}<span className='text-danger ps-1'>EGP</span></p>
                                                <p className='fs-6'>Shipping Price: {el.shippingPrice}<span className='text-danger ps-1'>EGP</span></p>
                                                <p className='fs-6'>Tax Price: {el.taxPrice}<span className='text-danger ps-1'>EGP</span></p>
                                                {el.isDelivered ? <div><p className='text-success'>Delivered</p></div> : <div><p className=''>Will Be Delivered in <span className='text-success'>2 days</span></p></div>}
                                                {el.paymentMethodType == "cash" ? <div><p className='text-danger'><i className="fa-solid fa-xmark"></i> Not Paid</p></div> : <div><p className='text-success'><i className="fa-solid fa-check"></i> Paid</p></div>}
                                            </div>
                                        </div>
                                    </div>
                                    <div className='w-100 line bg-secondary rounded-5 mt-2'></div>
                                </div>
                            })}</div>}
                    </div >
                </div>
            </div>
        </section >}
    </>
}
