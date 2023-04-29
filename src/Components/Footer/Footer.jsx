import React from 'react'
import { Link } from 'react-router-dom';
import logo from '../../images/kindpng_207045.png'
export default function Footer() {
    return <>
        <footer>
            <div className='zononblackkbg py-2 shadow-lg'>
                <div className="col-sm-12">
                    <div className='w-100'>
                        <Link className="nav-link text-light texthover text-center" to="/home">Back To Home</Link>
                    </div>
                </div>
            </div>
            <div className='zonoffblackbg border-bottom border-secondary shadow-lg'>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-3 text-light py-2">
                            <div>
                                <ul className='list-unstyled'>
                                    <li><h5>Get to Know Us</h5></li>
                                    <li className='fs-6'>About Amazon</li>
                                    <li>Careers</li>
                                    <li>Amazon Science</li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-sm-3 text-light py-2">
                            <div>
                                <ul className='list-unstyled'>
                                    <li><h5>Shop with Us</h5></li>
                                    <li>Your Account</li>
                                    <li>Your Orders</li>
                                    <li>Your Addresses</li>
                                    <li>Your Lists</li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-sm-3 text-light py-2">
                            <div>
                                <ul className='list-unstyled'>
                                    <li><h5>Make Money with Us</h5></li>
                                    <li>Protect and build your brand</li>
                                    <li>Advertise Your Products</li>
                                    <li>Sell on Amazon</li>
                                    <li>Fulfillment by Amazon</li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-sm-3 text-light py-2">
                            <div>
                                <ul className='list-unstyled'>
                                    <li><h5>Let Us Help You</h5></li>
                                    <li>Help</li>
                                    <li>Shipping & Delivery</li>
                                    <li>Returns & Replacements</li>
                                    <li >Amazon App Download</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='zonoffblackbg py-3 shadow-lg'>
                <div className="col-sm-12">
                    <div className='navwidth mx-auto py-2'>
                        <Link to="home"><img src={logo} className='w-100' alt="" /></Link>
                    </div>
                </div>
            </div>
            <div className='zonblackbg border-bottom border-secondary shadow-lg'>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-3 text-light py-2">
                            <div>
                                <ul className='list-unstyled'>
                                    <li><h6>Amazon Advertising</h6></li>
                                    <li className='text-secondary'>Find, attract, and</li>
                                    <li className='text-secondary'>engage customers</li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-sm-3 text-light py-2">
                            <div>
                                <ul className='list-unstyled'>
                                    <li><h6>Sell on Amazon.ae</h6></li>
                                    <li className='text-secondary'>Sell globally, start with UAE	</li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-sm-3 text-light py-2">
                            <div>
                                <ul className='list-unstyled'>
                                    <li><h6>Sell on Amazon.sa</h6></li>
                                    <li className='text-secondary'>Sell globally, start with Saudi Arabia</li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-sm-3 text-light py-2">
                            <div>
                                <ul className='list-unstyled'>
                                    <li><h6>Amazon Web Services</h6></li>
                                    <li className='text-secondary'>Scalable Cloud</li>
                                    <li className='text-secondary'>Computing Services</li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-sm-3 text-light py-2">
                            <div>
                                <ul className='list-unstyled'>
                                    <li><h6>Audible</h6></li>
                                    <li className='text-secondary'>Download</li>
                                    <li className='text-secondary'>Audio Books</li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-sm-3 text-light py-2">
                            <div>
                                <ul className='list-unstyled'>
                                    <li><h6>IMDb</h6></li>
                                    <li className='text-secondary'>Movies, TV</li>
                                    <li className='text-secondary'>& Celebrities</li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-sm-3 text-light py-2">
                            <div>
                                <ul className='list-unstyled'>
                                    <li><h6>Alexa</h6></li>
                                    <li className='text-secondary'>Actionable Analytics
                                        for the Web</li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-sm-3 text-light py-2">
                            <div>
                                <ul className='list-unstyled'>
                                    <li><h6>Book Depository</h6></li>
                                    <li className='text-secondary'>Books With Free</li>
                                    <li className='text-secondary'>Delivery Worldwide</li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-sm-12 text-light py-2">
                            <div>
                                <ul className='list-unstyled mx-auto'>
                                    <li className='text-center'><h6>Conditions of Use & Sale Privacy Notice Interest-Based Ads</h6></li>
                                    <li className='text-center'>©1996–2023, Amazon.com, Inc. or its affiliates</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    </>
}
