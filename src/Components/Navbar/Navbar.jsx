import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../../images/kindpng_207045.png'
import { getLoggedUserCart } from '../../Redux/getLoggedUserCartSlice';
import { useDispatch } from 'react-redux';

export default function Navbar({ userData, clearUserData }) {

    const [number, setNumber] = useState([])

    const userId = localStorage.getItem('userToken')

    const dispatch = useDispatch()

    async function getLoggedCart() {
        const cartItems = await dispatch(getLoggedUserCart())
        setNumber(cartItems?.payload)
    }

    useEffect(() => {
        if (userId && number) {
            getLoggedCart()
        }
    }, [userId, number])


    return <>
        <nav className="navbar navbar-expand-sm navbar-light py-3 zonblackbg">
            <div className="container-fluid">
                <div className='navwidth'><Link className="navbar-brand" to="home"><img src={logo} className='w-100' alt="amazon logo1" /></Link></div>
                <button className="navbar-toggler d-lg-none text-light" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavId" aria-controls="collapsibleNavId"
                    aria-expanded="false" aria-label="Toggle navigation">
                    <span className='zonyellowcolor'><i className="fa-solid fa-bars"></i></span>
                </button>
                <div className="collapse navbar-collapse" id="collapsibleNavId">
                    <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
                        {userData === null ? <>    <li className="nav-item">
                            <Link className="nav-link text-light texthover" to="Login"><span><i className="fa-solid fa-power-off"></i></span> Login</Link>
                        </li>
                            <li className="nav-item">
                                <Link className="nav-link text-light texthover" to="Register"><span><i className="fa-solid fa-file-signature"></i></span> Register</Link>
                            </li></> : <li onClick={clearUserData} className="nav-item">
                            <Link className="nav-link text-light texthover" to="logout"><i className="fa-solid fa-right-from-bracket"></i> Logout</Link>
                        </li>}
                    </ul>
                </div>
            </div>
        </nav>
        {userData === null ?
            <div className="container-fluid zonoffblackbg py-2 navbar-collapse" id='collapsibleNavId'>
                <div className="row">
                    <div className="col-sm-12 col-md-6">
                        <div className='d-flex justify-content-center ps-5'>
                            <div className='mx-3'><Link className="linkhover texthover p-1 text-decoration-none text-light" to="Home"><span><i className="fa-solid fa-house"></i></span> Home</Link></div>
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-6">
                        <div className='d-flex justify-content-center ps-5'>
                            <div className='mx-3'><Link className="linkhover texthover p-1 text-decoration-none text-light" to="About"><span><i className="fa-brands fa-amazon"></i></span> About<span className='ps-1'>Us</span></Link></div>
                        </div>
                    </div>
                </div>
            </div>
            : <div className="container-fluid zonoffblackbg py-2 navbar-collapse" id='collapsibleNavId'>
                <div className="row">
                    <div className="col-sm-12 col-md-4 col-lg-4 col-xxl-2">
                        <div className='d-flex justify-content-center ps-5'>
                            <div className='mx-3'><Link className="linkhover fs-5 texthover p-1 text-decoration-none text-light" to="Home"><span><i className="fa-solid fa-house"></i></span> Home</Link></div>
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-4 col-lg-4 col-xxl-2">
                        <div className='d-flex justify-content-center ps-5'>
                            <div className='mx-3'><Link className="linkhover fs-5 texthover p-1 text-decoration-none text-light" to="About"><span><i className="fa-brands fa-amazon"></i></span> About<span className='ps-1'>Us</span></Link></div>
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-4 col-lg-4 col-xxl-2">
                        <div className='d-flex justify-content-center ps-5'>
                            <div className='mx-3 position-relative'><Link className="linkhover fs-5 texthover p-1 text-decoration-none text-light" to="Cart"><span><i className="fa-solid fa-cart-shopping"></i></span><span className='badge smallfont zonblackcolor zonyellowbg position-absolute top-0 start-0'>{number?.numOfCartItems}</span> Cart</Link></div>
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-4 col-lg-4 col-xxl-2">
                        <div className='d-flex justify-content-center ps-5'>
                            <div className='mx-3'><Link className="linkhover fs-5 texthover p-1 text-decoration-none text-light" to="Products"><span><i className="fa-brands fa-product-hunt"></i></span> Products</Link></div>
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-4 col-lg-4 col-xxl-2">
                        <div className='d-flex justify-content-center ps-5'>
                            <div className='mx-3'><Link className="linkhover fs-5 texthover p-1 text-decoration-none text-light" to="Categories"><span><i className="fa-solid fa-boxes-stacked"></i></span> Categories</Link></div>
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-4 col-lg-4 col-xxl-2">
                        <div className='d-flex justify-content-center ps-5'>
                            <div className='mx-3'><Link className="linkhover fs-5 texthover p-1 text-decoration-none text-light" to="Brands"><span><i className="fa-solid fa-shop"></i></span> Brands</Link></div>
                        </div>
                    </div>
                </div>
            </div>}
    </>
}
