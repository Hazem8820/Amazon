import React, { useState } from 'react'
import logo2 from '../../images/R.png.png'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import loading from '../../images/amazon.gif'
export default function ResetPassword({ saveUserData }) {

    const navigate = useNavigate()
    const [errors, setErrors] = useState('')
    const [isLoading, setLoading] = useState(false)

    const validationSchema = Yup.object({
        email: Yup.string().required('Email is Rquired').email('Email Must be Valid'),
        newPassword: Yup.string().required('Password is Rquired')
    })

    async function handelResetPassword(values) {
        setLoading(true)
        const { data } = await axios.put('https://route-ecommerce.onrender.com/api/v1/auth/resetPassword', values).catch((error) => {
            setLoading(false)
            setErrors(error?.response?.data?.message);
        })
        if (data.token) {
            navigate('/login')
        }
    }

    const formik = useFormik({
        initialValues: {
            email: '',
            newPassword: '',
        },
        validationSchema,
        onSubmit: handelResetPassword
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
                                        <h2>Reset Password</h2>
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
                                <div className="col-sm-12">
                                    <div>
                                        <div className="form-floating">
                                            <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="password" className="form-control form-border" value={formik.values.newPassword} name='newPassword' id="newPassword"
                                                placeholder="newPassword" />
                                            <label htmlFor="newPassword">
                                                <div className="text-secondary">
                                                    <h5 className="fs-6 mt-1 text-secondary">Enter Your New Password</h5>
                                                </div>
                                            </label>
                                        </div>
                                        {formik.errors.newPassword && formik.touched.newPassword ? <div className="alert alert-danger mt-1">{formik.errors.newPassword}</div> : null}
                                    </div>
                                </div>
                                {errors ? <div className='alert alert-danger text-center my-3'>{errors}</div> : null}
                                {isLoading ? <div className='w-25 mx-auto'><input type="image" src={loading} className='w-100 rounded-3 text-center' /></div> : <button type='submit' disabled={!(formik.isValid && formik.dirty)} className='zonyellowbg zonoffblackcolor w-100 btn btn-warning my-3'>Reset Password</button>}
                                <div className='w-100'><p className='text-center'>By continuing, you agree to Amazon's <span className='text-primary'>Conditions of Use</span> and <span className='text-primary'>Privacy Notice</span>.</p></div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>
}

