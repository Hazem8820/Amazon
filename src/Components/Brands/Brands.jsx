import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { getBrands } from '../../Redux/BrandsSlice'
import Loading from '../Loading/Loading'
import { Link } from 'react-router-dom';
export default function Brands() {

    const [Brands, setBrands] = useState([])
    const [isLoading, setisLoading] = useState(false)

    const dispatch = useDispatch()

    async function getData() {
        setisLoading(true)
        const data = await dispatch(getBrands())
        setBrands(data?.payload?.data)
        setisLoading(false)
    }

    useEffect(() => {
        getData()
    }, [])



    return <>
        {isLoading ? <Loading /> : <section>
            <div className="container-fluid">
                <div className="row">
                    {Brands.map((el, index) => {
                        return <div key={index} className="col-md-4 col-lg-3 col-xl-2 my-3 prodiv">
                            <Link className='text-decoration-none' to={`/brandDetails/${el._id}`}>
                                <div className='zononblackkbg shadow rounded-3 contdiv w-100 overflow-hidden'>
                                    <img src={el.image} className='w-100' alt="products" />
                                    <h6 className='zonyellowcolor text-center'>{el.name}</h6>
                                </div>
                            </Link>
                        </div>
                    })}
                </div>
            </div>
        </section>}
    </>
}
