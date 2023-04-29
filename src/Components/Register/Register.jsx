import React, { useEffect, useState } from 'react'
import logo2 from '../../images/R.png.png'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import loading from '../../images/amazon.gif'
export default function Register() {

    const navigate = useNavigate()

    const [errors, setErros] = useState('')

    const [isLoading, setLoading] = useState(false)

    async function handelRegister(values) {
        setLoading(true)
        const { data } = await axios.post('https://route-ecommerce.onrender.com/api/v1/auth/signup', values).catch((error) => {
            setLoading(false)
            setErros(error?.response?.data?.message)
        })
        if (!errors) {
            setLoading(false)
            navigate('/login')
        }
    }

    let validationSchema = Yup.object({
        name: Yup.string().required('Name is Required').min(3, 'Name Minmum Length must be 3 ').max(20, 'Name Maxmum Length must be 20 '),
        email: Yup.string().required('Email is Required').email('Email Must be Valid'),
        password: Yup.string().required('Password is Required').matches(/^[A-Z][a-z0-9]{5,20}$/, 'Password Must starts With Uppercase'),
        rePassword: Yup.string().required('rePassword is Required').oneOf([Yup.ref('password')], 'Password and RePassword Doesnt Match'),
        phone: Yup.string().required('Phone is Required').matches(/^01[0125][0-9]{8}$/, 'Phone Must be Egyption Number'),
    })

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            rePassword: '',
            phone: '',
        },
        validationSchema,
        onSubmit: handelRegister
    })


    return <>
        <section className='bg-light'>
            <div className='d-flex justify-content-center align-items-center'>
                <div className='w-50 bg-white rounded-3 my-5 shadow'>
                    <div className='w-25 my-3 mx-auto'><img src={logo2} className='w-100 text-center' alt="amazon logo2" /></div>
                    <div className="container">
                        <div className="row">
                            <form onSubmit={formik.handleSubmit}>
                                <div className="col-sm-12">
                                    <div>
                                        <h2>Create account</h2>
                                        {errors ? <div className='alert alert-danger text-center'>{errors}</div> : null}
                                        <label htmlFor="name" className='ms-2'>Your Name</label>
                                        <div className="form-floating">
                                            <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.name} type="text" className="form-control form-border" name='name' id="name"
                                                placeholder="Full Name" />
                                            <label htmlFor="name">
                                                <div className="text-secondary">
                                                    <h5 className="fs-6 mt-1 text-secondary">First And Last Name</h5>
                                                </div>
                                            </label>
                                        </div>
                                        {formik.errors.name && formik.touched.name ? <div className="alert alert-danger mt-1">{formik.errors.name}</div> : null}
                                    </div>
                                </div>
                                <div className="col-sm-12 my-2">
                                    <div>
                                        <label htmlFor="email" className='ms-2'>Email</label>
                                        <div className="form-floating">
                                            <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} type="Email" className="form-control form-border" name='email' id="email"
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
                                <div className="row my-2">
                                    <div className="col-sm-6">
                                        <div>
                                            <label htmlFor="password" className='ms-2'>Password</label>
                                            <div className="form-floating">
                                                <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} type="password" className="form-control form-border" name='password' id="password"
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
                                    <div className="col-sm-6">
                                        <div>
                                            <label htmlFor="rePassword" className='ms-2'>RePassword</label>
                                            <div className="form-floating">
                                                <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.rePassword} type="password" className="form-control form-border" name='rePassword' id="rePassword"
                                                    placeholder="rePassword" />
                                                <label htmlFor="rePassword">
                                                    <div className="text-secondary">
                                                        <h5 className="fs-6 mt-1 text-secondary">Repassword Please</h5>
                                                    </div>
                                                </label>
                                            </div>
                                            {formik.errors.rePassword && formik.touched.rePassword ? <div className="alert alert-danger mt-1">{formik.errors.rePassword}</div> : null}
                                        </div>
                                    </div>
                                    <div className="col-sm-12 my-2">
                                        <div>
                                            <label htmlFor="phone" className='ms-2'>Phone</label>
                                            <div className="form-floating">
                                                <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.phone} type="tel" className="form-control form-border" name='phone' id="phone"
                                                    placeholder="Phone" />
                                                <label htmlFor="phone">
                                                    <div className="text-secondary">
                                                        <h5 className="fs-6 mt-1 text-secondary">Enter Your Phone</h5>
                                                    </div>
                                                </label>
                                            </div>
                                            {formik.errors.phone && formik.touched.phone ? <div className="alert alert-danger mt-1">{formik.errors.phone}</div> : null}
                                        </div>
                                    </div>
                                </div>
                                {!isLoading ? <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='zonyellowbg zonoffblackcolor w-100 btn btn-warning my-3'>Sign Up</button> : <div className='w-25 mx-auto'><input type="image" src={loading} className='w-100 rounded-3 text-center' /></div>}
                                <div className='w-100'><p className='text-center'>By creating an account, you agree to Amazon's <span className='text-primary'>Conditions of Use</span> and <span className='text-primary'>Privacy Notice</span>.</p></div>
                                <div className='w-100'><p className='text-center'>Already have an account? <Link to={'/login'}><span className='text-primary'>Sign in <i className="fa-solid fa-caret-right"></i></span></Link> </p></div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>
}
