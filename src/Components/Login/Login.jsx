import React, { useState } from 'react'
import logo2 from '../../images/R.png.png'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import loading from '../../images/amazon.gif'
export default function Login({ saveUserData }) {

    const navigate = useNavigate()
    const [errors, setErrors] = useState('')
    const [isLoading, setLoading] = useState(false)

    const validationSchema = Yup.object({
        email: Yup.string().required('Email is Rquired').email('Email Must be Valid'),
        password: Yup.string().required('Password is Rquired')
    })

    async function handelLogin(values) {
        setLoading(true)
        const { data } = await axios.post('https://route-ecommerce.onrender.com/api/v1/auth/signin', values).catch((error) => {
            setLoading(false)
            setErrors(error?.response?.data?.message);
        })

        if (data?.message === 'success') {
            localStorage.setItem('userToken', data?.token)
            saveUserData()
            setLoading(false)
            navigate('/')
        }
    }

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
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
                                        <h2>Sign in</h2>
                                        <label htmlFor="email" className='ms-2'>Email</label>
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
                                        <label htmlFor="password" className='ms-2'>Password</label>
                                        <div className="form-floating">
                                            <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="password" className="form-control form-border" value={formik.values.password} name='password' id="password"
                                                placeholder="password" />
                                            <label htmlFor="password">
                                                <div className="text-secondary">
                                                    <h5 className="fs-6 mt-1 text-secondary">Enter Your Password</h5>
                                                </div>
                                            </label>
                                        </div>
                                        {formik.errors.password && formik.touched.password ? <div className="alert alert-danger mt-1">{formik.errors.password}</div> : null}
                                    </div>
                                </div>
                                {errors ? <div className='alert alert-danger text-center my-3'>{errors}</div> : null}
                                {isLoading ? <div className='w-25 mx-auto'><input type="image" src={loading} className='w-100 rounded-3 text-center' /></div> : <button type='submit' disabled={!(formik.isValid && formik.dirty)} className='zonyellowbg zonoffblackcolor w-100 btn btn-warning my-3'>Sign in</button>}
                                <div className='w-100'><p className='text-center'>By continuing, you agree to Amazon's <span className='text-primary'>Conditions of Use</span> and <span className='text-primary'>Privacy Notice</span>.</p></div>
                            </form>
                            <div className='col-sm-12 d-flex justify-content-center mb-3'><Link to={'/forgotPassword'} className='text-decoration-none text-primary'>Forgot Your Password?</Link></div>
                            <div className='d-flex justify-content-center align-items-center col-sm-12 gap-3'>
                                <div className='line bg-secondary'></div>
                                <div className='text-secondary fa-2x'><h6>New to Amazon?</h6></div>
                                <div className='line bg-secondary'></div>
                            </div>
                            <div className='col-sm-12'><Link to={'/register'} className='text-decoration-none'><button className='w-100 mb-4 mx-auto btn btn-secondary'>Creat Your Amazon Account</button></Link></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>
}
