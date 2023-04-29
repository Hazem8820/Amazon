import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { getLoggedUserCart } from './../../Redux/getLoggedUserCartSlice';
import Loading from './../Loading/Loading';
import { removeItemFromCart } from './../../Redux/removeItemSlice';
import { toast } from 'react-hot-toast';
import { updateDataCartQuantity } from '../../Redux/updateCartQuantitiy';
import { Link } from 'react-router-dom';
import emptycart from '../../images/empty-cart.webp'
import { addToWishList } from './../../Redux/addToWishListSlice';

export default function Cart() {

    const [Cart, setCart] = useState([])
    const [id, setCartId] = useState([])
    const [TotalPrice, setTotalPrice] = useState([])
    const [isloading, setisloading] = useState(false)

    const dispatch = useDispatch()

    async function getLoggedCart() {
        setisloading(true)
        const data = await dispatch(getLoggedUserCart())
        setCart(data?.payload?.data?.products)
        setCartId(data?.payload?.data?._id);
        setisloading(false)
        setTotalPrice(data);
    }
    async function removeProduct(productId) {
        setisloading(true)
        const data = await dispatch(removeItemFromCart(productId))
        setCart(data?.payload?.data?.products);
        setTotalPrice(data)
        setisloading(false)
        if (data?.payload?.status === 'success') {
            toast.success('Product Successfully Removed From Your Cart')
        }
        else {
            toast.error('Ops Something Went Wrong Please Try Again')
        }
    }

    async function updateProduct([productId, count]) {
        setisloading(true)
        const data = await dispatch(updateDataCartQuantity([productId, count]))
        setCart(data?.payload?.data?.products);
        setTotalPrice(data)
        setisloading(false)
        if (data?.payload?.status === 'success') {
            toast.success('Quantity Successfully Updated')
        }
        else {
            toast.error('Ops Something Went Wrong Please Try Again')
        }
    }

    async function addProduct(productId) {
        setisloading(true)
        const data = await dispatch(addToWishList(productId))
        setisloading(false)
        if (data?.payload?.status === 'success') {
            toast.success(data.payload.message, { duration: 2000 })
        }
        else {
            toast.error('Ops Something Went Wrong Please Sign in and try Again')
        }
    }

    useEffect(() => {
        getLoggedCart()
    }, [])

    return <>
        {isloading ? <Loading /> : <section>
            <div className='col-xxl-12 zononblackkbg shadow-lg p-1 text-center'><Link className='linkhover texthover p-1 text-light text-decoration-none' to={'/wishlist'}><span><i className="fa-sharp fa-solid fa-clipboard-list"></i></span> Wishlist</Link></div>
            <div className="container">
                <div className="row">
                    <div className="col-xl-12">
                        <div className='d-flex justify-content-between'>
                            <h1 className='zonblackcolor'>Shopping Cart</h1>
                            <p className='fs-3'>Total Price: <span>{TotalPrice.payload?.data?.totalCartPrice}</span><span className='text-success ps-1'>EGP</span></p>
                        </div>
                        <div className='w-100 line bg-secondary rounded-3 mt-2'></div>
                        {Cart?.length === 0 ? <>
                            <div><img src={emptycart} className='w-100' alt="" /></div>
                            <div className='text-center zononblackcolor'><h2>Your Cart is Empty</h2></div>
                        </> :
                            <div>{Cart?.map((el) => {
                                return <div key={el._id}> <div className='d-flex justify-content-between'>
                                    <div className='row'>
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
                                            <div className='d-flex'>
                                                <div className='d-flex w-25 me-auto'>
                                                    <input onChange={(e) => { updateProduct([el.product.id, e.target.value]) }} type="number" defaultValue={el.count} className='form-control' placeholder='Count...' />
                                                </div>
                                                <div className='d-flex ps-1'>
                                                    <button onClick={() => { removeProduct(el.product.id) }} className='zononblackcolor btn me-2'>
                                                        <span className='text-danger pe-1'>
                                                            <i className="fa-regular fa-trash-can"></i>
                                                        </span>
                                                        Remove
                                                    </button>
                                                    <button onClick={() => { addProduct(el.product.id) }} className='zononblackcolor btn'>
                                                        <span><i className="fa-sharp fa-solid fa-clipboard-list pe-1"></i></span>
                                                        Add to Wishlist?
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <p className='zononblackcolor fs-3'>Price:{el.price}<span className='text-success ps-1'>EGP</span></p>
                                    </div>
                                </div>
                                    <div className='w-100 line bg-secondary rounded-3 mt-2'></div>
                                </div>
                            })}</div>}
                    </div >
                </div>
            </div>
            {Cart?.length === 0 ? null : <div className='d-flex justify-content-around'>
                <div className='w-25 py-5 mx-auto'><Link className='text-decoration-none text-white' to={`/CheckoutCash/${id}`}><button className='btn w-100 btn-success'><span><i className="fa-solid fa-money-bill-wave"></i></span> Cash</button></Link></div>
                <div className='w-25 py-5 mx-auto'><Link className='text-decoration-none zononblackcolor' to={`/CheckoutVisa/${id}`}><button className='zonyellowbg btn w-100 btn-warning'><i className="fa-brands fa-cc-visa"></i> Online Payment</button></Link></div>
            </div>}
        </section >}
    </>
}
