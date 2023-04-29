import React, { useState } from 'react'
import logo2 from '../../images/R.png.png'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import loading from '../../images/amazon.gif'
export default function Login({ saveUserData }) {

    const navigate = useNavigate()
    const [errors, setErrors] = useState('')
    const [message, setmessage] = useState('')
    const [isLoading, setLoading] = useState(false)

    function reset() {
        setmessage(' ')
    }

    const validationSchema = Yup.object({
        email: Yup.string().required('Email is Rquired').email('Email Must be Valid'),
    })

    const validationSchemaCode = Yup.object({
        resetCode: Yup.string().required('Code is Required').max(6, 'It Must be Maxmum 6 Numbers'),
    })

    async function handelLogin(values) {
        setLoading(true)
        const { data } = await axios.post('https://route-ecommerce.onrender.com/api/v1/auth/forgotPasswords', values).catch((error) => {
            setLoading(false)
            setErrors(error?.response?.data?.message)
        })
        setLoading(false)
        setmessage(data?.message);
    }

    async function handelCode(values) {
        setLoading(true)
        const { data } = await axios.post('https://route-ecommerce.onrender.com/api/v1/auth/verifyResetCode', { "resetCode": String(values.resetCode) }).catch((error) => {
            setLoading(false)
            setErrors(error?.response?.data?.message);
        })
        setLoading(false)
        if (data?.status === 'Success') {
            navigate('/resetPassword')
        }
    }

    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema,
        onSubmit: handelLogin
    })

    const formikCode = useFormik({
        initialValues: {
            resetCode: '',
        },
        validationSchema: validationSchemaCode,
        onSubmit: handelCode
    })

    return <>
        <div>
            {message.length >= 1 ? <section className='bg-light'>
                <div className='d-flex justify-content-center align-items-center'>
                    <div className='w-50 bg-white rounded-3 my-5 shadow'>
                        <div className='w-25 my-3 mx-auto'><img src={logo2} className='w-100 text-center' alt="amazon logo2" /></div>
                        <div className="container">
                            <div className="row">
                                <form onSubmit={formikCode.handleSubmit}>
                                    <div className="col-sm-12 my-2">
                                        <div>
                                            <h2>Type Your Code Here</h2>
                                            <div className="form-floating">
                                                <input onBlur={formikCode.handleBlur} onChange={formikCode.handleChange} onInput={() => { reset() }} type="number" className="form-control form-border" value={formikCode.values.resetCode} name='resetCode' id="resetCode"
                                                    placeholder="resetCode" />
                                                <label htmlFor="resetCode">
                                                    <div className="text-secondary">
                                                        <h5 className="fs-6 mt-1 text-secondary">Enter Your Code</h5>
                                                    </div>
                                                </label>
                                            </div>
                                            {formikCode.errors.resetCode && formikCode.touched.resetCode ? <div className="alert alert-danger mt-1">{formikCode.errors.resetCode}</div> : null}
                                        </div>
                                    </div>
                                    {errors ? <div className='alert alert-danger text-center my-3'>{errors}</div> : null}
                                    {message.length > 1 ? <div className='alert alert-success text-center my-3'>{message}</div> : null}
                                    {isLoading ? <div className='w-25 mx-auto'><input type="image" src={loading} className='w-100 rounded-3 text-center' /></div> : <button type='submit' disabled={!(formikCode.isValid && formikCode.dirty)} className='zonyellowbg zonoffblackcolor w-100 btn btn-warning my-3'>Submit</button>}
                                    <div className='w-100'><p className='text-center'>By continuing, you agree to Amazon's <span className='text-primary'>Conditions of Use</span> and <span className='text-primary'>Privacy Notice</span>.</p></div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section> : <section className='bg-light'>
                <div className='d-flex justify-content-center align-items-center'>
                    <div className='w-50 bg-white rounded-3 my-5 shadow'>
                        <div className='w-25 my-3 mx-auto'><img src={logo2} className='w-100 text-center' alt="amazon logo2" /></div>
                        <div className="container">
                            <div className="row">
                                <form onSubmit={formik.handleSubmit}>
                                    <div className="col-sm-12 my-2">
                                        <div>
                                            <h2>Forgot Password?</h2>
                                            <div className="form-floating">
                                                <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="Email" className="form-control form-border" value={formik.values.email} name='email' id="email"
                                                    placeholder="email" />
                                                <label htmlFor="email">
                                                    <div className="text-secondary">
                                                        <h5 className="fs-6 mt-1 text-secondary">Enter Your Email</h5>
                                                    </div>
                                                </label>
                                            </div>
                                            {formik.errors.email && formik.touched.email ? <div className="alert alert-danger mt-1">{formik.errors.email}</div> : null}
                                        </div>
                                    </div>
                                    {errors ? <div className='alert alert-danger text-center my-3'>{errors}</div> : null}
                                    {isLoading ? <div className='w-25 mx-auto'><input type="image" src={loading} className='w-100 rounded-3 text-center' /></div> : <button type='submit' disabled={!(formik.isValid && formik.dirty)} className='zonyellowbg zonoffblackcolor w-100 btn btn-warning my-3'>Send</button>}
                                    <div className='w-100'><p className='text-center'>By continuing, you agree to Amazon's <span className='text-primary'>Conditions of Use</span> and <span className='text-primary'>Privacy Notice</span>.</p></div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>}
        </div>
    </>
}
