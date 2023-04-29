import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { getcategoryDetails } from './../../Redux/CategoryDetailsSlice';
import { useParams } from 'react-router-dom';
import Loading from './../Loading/Loading';

export default function CategoryDetails() {

    const { id } = useParams()

    const [CategoriesDetails, setCategoriesDetails] = useState([])
    const [isLoading, setisLoading] = useState(false)

    const dispatch = useDispatch()

    async function getData() {
        setisLoading(true)
        const data = await dispatch(getcategoryDetails(id))
        setCategoriesDetails(data?.payload?.data);
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
                        <div className='text-center my-5 rounded-3 bg-light py-2 shadow-lg'>
                            <img src={CategoriesDetails.image} className='w-25 rounded-3' alt="" />
                            <h2>{CategoriesDetails.name}</h2>
                        </div>
                    </div>
                </div>
            </div>
        </section>}
    </>
}
