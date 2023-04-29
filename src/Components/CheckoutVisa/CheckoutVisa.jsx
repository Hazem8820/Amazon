import React from 'react'
import { useNavigate, useParams, Navigate } from 'react-router-dom'
import loading from '../../images/amazon.gif'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import logo2 from '../../images/R.png.png'
import { useState } from 'react'
import { useDispatch } from 'react-redux';
import { visaPaymentData } from '../../Redux/visaPaymentSlice'
import { toast } from 'react-hot-toast'

export default function CheckoutVisa() {
    const id = useParams()
    const [isLoading, setLoading] = useState(false)
    const dispatch = useDispatch()

    const validationSchema = Yup.object({
        details: Yup.string().required('details is Rquired'),
        phone: Yup.string().required('Phone is Required').matches(/^01[0125][0-9]{8}$/, 'Phone Must be Egyption Number'),
        city: Yup.string().required('city is Rquired'),
    })

    async function handelLogin(values) {
        setLoading(true)
        const data = await dispatch(visaPaymentData([id, values]))
        setLoading(false)
        if (data?.payload?.status === 'success') {
            window.location.href = data?.payload?.session?.url
        }
        else {
            toast.error('Something Went Wrong Please Check Your Cart Again')
        }
    }

    const formik = useFormik({
        initialValues: {
            details: "",
            phone: "",
            city: "",
        },
        validationSchema,
        onSubmit: handelLogin
    })

    return <>
        <section className='bg-light'>
            <div className='d-flex justify-content-center align-items-center'>
                <div className='w-50 bg-white rounded-3 my-5 shadow'>
                    <div className='w-25 my-3 mx-auto'><img src={logo2} className='w-100 text-center' alt="amazon logo2" /></div>
                    <div className="container">
                        <div className="row">
                            <form onSubmit={formik.handleSubmit}>
                                <div className="col-sm-12 my-2">
                                    <div>
                                        <div className='d-flex justify-content-between'>
                                            <h2>Checkout Now</h2>
                                            <span className='text-primary fs-1'><i className="fa-brands fa-cc-visa"></i> <i className="fa-regular fa-credit-card"></i></span>
                                        </div>
                                        <label htmlFor="details" className='ms-2'>Details</label>
                                        <div className="form-floating">
                                            <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="details" className="form-control form-border" value={formik.values.details} name='details' id="details"
                                                placeholder="details" />
                                            <label htmlFor="details">
                                                <div className="text-secondary">
                                                    <h5 className="fs-6 mt-1 text-secondary">Enter Your Address Details</h5>
                                                </div>
                                            </label>
                                        </div>
                                        {formik.errors.details && formik.touched.details ? <div className="alert alert-danger mt-1">{formik.errors.details}</div> : null}
                                    </div>
                                </div>
                                <div className="col-sm-12">
                                    <div>
                                        <label htmlFor="phone" className='ms-2'>Phone</label>
                                        <div className="form-floating">
                                            <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="phone" className="form-control form-border" value={formik.values.phone} name='phone' id="phone"
                                                placeholder="phone" />
                                            <label htmlFor="phone">
                                                <div className="text-secondary">
                                                    <h5 className="fs-6 mt-1 text-secondary">Enter Your Phone</h5>
                                                </div>
                                            </label>
                                        </div>
                                        {formik.errors.phone && formik.touched.phone ? <div className="alert alert-danger mt-1">{formik.errors.phone}</div> : null}
                                    </div>
                                </div>
                                <div className="col-sm-12">
                                    <div>
                                        <label htmlFor="city" className='ms-2'>City</label>
                                        <div className="form-floating">
                                            <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="city" className="form-control form-border" value={formik.values.city} name='city' id="city"
                                                placeholder="city" />
                                            <label htmlFor="city">
                                                <div className="text-secondary">
                                                    <h5 className="fs-6 mt-1 text-secondary">Enter Your City</h5>
                                                </div>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                {isLoading ? <div className='w-25 mx-auto'><input type="image" src={loading} className='w-100 rounded-3 text-center' /></div> : <button type='submit' disabled={!(formik.isValid && formik.dirty)} className='zonyellowbg zonoffblackcolor w-100 btn btn-warning my-3'>Checkout</button>}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>
}
