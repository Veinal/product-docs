import { Button } from '@mui/material'
import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
    const Del=()=>{
        localStorage.removeItem("Token")

    }

    const [adminData,setAdminData]= useState('')

    useEffect(()=>{
        const adData=JSON.parse(localStorage.getItem("Admin"))
        console.log(adData,'ad');
        setAdminData(adData)
    },[])
    console.log(adminData.image,'add');

    // const [adminImage,setAdminImage]=useState('')

    // useEffect(()=>{
    //     Axios.get("http://localhost:7000/api/newregister/view")
    //     .then((res)=>{
    //         console.log('res',res.data);
    //         setAdminImage(res.data)
    //     })
    //     .catch((err)=>{
    //         alert(err);
    //     })
    // },[])
    // console.log(adminImage[0].image,123);
  return (
    <div>
        <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
            <button
            className="navbar-toggler"
            type="button"
            data-mdb-toggle="collapse"
            data-mdb-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
            >
            <i className="fas fa-bars"></i>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <a className="navbar-brand mt-2 mt-lg-0" href="#">
                {/* <img
                src="https://mdbcdn.b-cdn.net/img/logo/mdb-transaprent-noshadows.webp"
                height="15"
                alt="MDB Logo"
                loading="lazy"
                /> */}
            </a>
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                <Link to='/'><a className="nav-link" href="#">Home</a></Link>
                </li>
                <li className="nav-item">
                {/* <a className="nav-link" href="#">Team</a> */}
                </li>
                <li className="nav-item">
                {/* <a className="nav-link" href="#">Projects</a> */}
                </li>
            </ul>
            <img src={`url(${adminData.image})`} alt="" />
            </div>

            <div className="d-flex align-items-center">
            {/* <a className="text-reset me-3" href="#">
                <i className="fas fa-shopping-cart"></i>
            </a> */}

            {/* <Link to='/register'>login</Link> */}
            <div className="dropdown">
                <a
                className="dropdown-toggle d-flex align-items-center hidden-arrow"
                href="#"
                id="navbarDropdownMenuAvatar"
                role="button"
                data-mdb-toggle="dropdown"
                aria-expanded="false"
                >
                <img
                    src={adminData.image}
                    className="rounded-circle"
                    height="25"
                    alt={adminData.name}
                    // loading="lazy"
                />
                </a>
                <ul
                className="dropdown-menu dropdown-menu-end"
                aria-labelledby="navbarDropdownMenuAvatar"
                >
                <li>
                    <a className="dropdown-item" href="#">My profile</a>
                </li>
                <li>
                    <a className="dropdown-item" href="#">Settings</a>
                </li>
                <li>
                    {/* <a className="dropdown-item" href="#">Logout</a> */}
                    <Button onClick={()=>Del()}>logout</Button>
                </li>
                </ul>
            </div>
            </div>
            <div style={{display:'flex',gap:4,marginLeft:5}}>
                <Link to='/register'><Button variant='contained' color='primary'>REGISTER</Button></Link><br />
                <Link to='/login'><Button variant='contained' color='success'>LOGIN</Button></Link>
            </div>
        </div>
        </nav>
        </div>
    </div>
  )
}
