import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { getBrandDetails } from './../../Redux/BrandDetailsSlice';
import { useParams } from 'react-router-dom';
import Loading from './../Loading/Loading';

export default function BrandsDetails() {

    const { id } = useParams()

    const [isLoading, setisLoading] = useState(false)
    const [brands, setBrands] = useState([])
    const dispatch = useDispatch()

    async function getData() {
        setisLoading(true)
        const data = await dispatch(getBrandDetails(id))
        setBrands(data.payload?.data)
        setisLoading(false)
    }

    useEffect(() => {
        getData()
    }, [])

    return <>
        {isLoading ? <Loading /> : <section>
            <div className="container">
                <div className="row">
                    <div className="col-sm-12">
                        <div className='text-center my-5 rounded-3 bg-white py-1 shadow-lg'>
                            <img src={brands.image} className='w-50' alt="" />
                            <h2>{brands.name}</h2>
                        </div>
                    </div>
                </div>
            </div>
        </section>}
    </>
}
