import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { getProducts } from './../../Redux/ProductsSlice';
import Loading from '../Loading/Loading';
import { Link } from 'react-router-dom';
import { addToCart } from './../../Redux/AddToCartSlice';
import { toast } from 'react-hot-toast';
import loading2 from '../../images/loading2.gif'

export default function Products() {
    const [isLoading, setisLoading] = useState(false)
    const [isLoading2, setisLoading2] = useState(false)
    const [products, setProducts] = useState([])
    const dispatch = useDispatch()

    async function getData() {
        setisLoading(true)
        const data = await dispatch(getProducts())
        setProducts(data?.payload?.data)
        setisLoading(false)
    }

    async function addProduct(productId) {
        setisLoading2(true)
        const data = await dispatch(addToCart(productId))
        setisLoading2(false)
        if (data?.payload?.status === 'success') {
            toast.success(data?.payload?.message, { duration: 2000 })
        }
        else {
            toast.error('Ops Something Went Wrong Please Sign in and try Again')
        }
    }

    useEffect(() => {
        getData()
    }, [])


    return <>
        {isLoading ? <Loading /> : <section>
            <div className="container-fluid">
                <div className="row">
                    {products?.map((el, index) => {
                        return <div key={index} className="col-md-4 col-lg-3 col-xl-2 my-3 prodiv">
                            <div>
                                <div className='shadow rounded-3 contdiv w-100 overflow-hidden'>
                                    <Link className='text-decoration-none' to={`/prodetails/${el._id}`}>
                                        <div className='d-flex justify-content-between'>
                                            <div>
                                                <img src={el.brand.image} className='w-25' alt="" />
                                            </div>
                                            {el.priceAfterDiscount ? <div className='bg-danger text-white p-2'>Sale</div> : ''}
                                        </div>
                                        <div>
                                            <h6 className='zononblackcolor text-center'>{el.subcategory[0].name}</h6>
                                            <img src={el.imageCover} className='w-100' alt="products" />
                                            <h6 className='zonyellowcolor text-center'>{el.title.split(' ').slice(0, 2).join(' ')}</h6>
                                            <p className='zononblackcolor text-center'>{el.description.split('').slice(0, 30).join('')}</p>
                                        </div>
                                        <div className='d-flex justify-content-between'>
                                            <div className='ps-3'>{el.priceAfterDiscount ? <div><span className='text-success text-decoration-line-through'>{el.price}</span> <span className='text-success'>{el.priceAfterDiscount} EGP</span></div> : <span className='text-success'>{el.price} EGP</span>}</div>
                                            <p className='pe-3'><i className="fa-solid fa-star zonyellowcolor"></i> <span className='zonoffblackcolor'>{el.ratingsAverage}</span></p>
                                        </div>
                                    </Link>
                                    {isLoading2 ? <div className='loadwidth addbtn mx-auto'><input type="image" src={loading2} className='w-100 rounded-3 text-center' /></div> : <div className='w-75 mb-1 mx-auto'><button onClick={() => { addProduct(el._id) }} className='btn addbtn zonyellowbg btn-warning zonoffblackcolor w-100'>+ Add</button></div>}
                                </div>
                            </div>
                        </div>
                    })}
                </div>
            </div>
        </section >}
    </>
}
