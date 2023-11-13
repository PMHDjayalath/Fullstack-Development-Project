import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import Badge from "react-bootstrap/Badge";
import { useCart } from './ContextReducer';
import Modal from '../Model';
import Cart from '../screens/Cart';
export default function Navbar(props) {

    const [cartView, setCartView] = useState(false)
    localStorage.setItem('temp', "first")
    let navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('token')

        navigate("/login")
    }

    const loadCart = () => {
        setCartView(true)
    }

    const items = useCart();
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-warning position-sticky"
                style={{ boxShadow: "0px 10px 20px black", filter: 'blur(20)', position: "fixed", zIndex: "10", width: "100%" }}>
                <div className="container-fluid">
                <img src="https://cdn-icons-png.flaticon.com/128/562/562678.png" class="custom-size" alt="" data-edit="false" data-editor="field" data-field="src[Image Path]; title[Image Title]; alt[Image Alternate Text]" />

                    <Link className="navbar-brand fs-1 text-black" to="/">FoodCone</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
                            <li className="nav-item">
                                <Link className="nav-link fs-5 mx-2 active" aria-current="page" to="/">Home</Link> 
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link fs-5 mx-2 active text-black" aria-current="page" to="/reviews">Customer Reviews</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link fs-5 mx-2 active text-black" aria-current="page" to="/chatapp">Chat With Our Shop</Link>
                            </li>
                            {(localStorage.getItem("token")) ?
                                <li className="nav-item">
                                    <Link className="nav-link fs-5 mx-2 active text-black" aria-current="page" to="/myorder" >My Orders</Link>
                                </li>
                                 : ""}
                        </ul>
                        {(!localStorage.getItem("token")) ?
                            <form className="d-flex">
                                <Link className="btn bg-white text-warning mx-1 " to="/login">Login</Link>
                                <Link className="btn bg-white text-warning mx-1" to="/signup">Signup</Link>
                            </form> :
                            <div>

                                <div className="btn bg-white text-warning mx-2 " onClick={loadCart}>
                                My Cart 
                                    <Badge className="bg-dark">
                                    {items.length} 
                                    </Badge>
                                    
                                </div>

                                {cartView ? <Modal onClose={() => setCartView(false)}><Cart></Cart></Modal> : ""}

                                <button onClick={handleLogout} className="btn bg-white text-warning" >Logout</button></div>}
                    </div>
                </div>
            </nav>
        </div>
    )
}