import { Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import Image from './Image'

export default function Home() {

  const navv = useNavigate()
  const [check,setCheck]=useState()

  useEffect(()=>{
    if(localStorage.getItem("Token")===null){
      navv('/login')
    }
  })

  // useEffect(()=>{
  //   const abc = JSON.parse( localStorage.getItem("Token"))
  // setCheck(abc)

  // if(abc){
  //   navv('/')
  // }else{
  //   navv('/login')
  // }
  // },[])
  
  const [profile,setProfile]=useState()

  useEffect(()=>{
    let user = JSON.parse(localStorage.getItem("Admin"))
    setProfile(user)
  },[])

  return (
    <div>        
        <h3 align="center" style={{marginLeft:'-50px'}}><b><u>CHOOSE AN OPTION</u></b></h3> 
        <hr />
        <div style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center',gap:80}}>
        {profile?.role=="seller" &&
          (
            <Link to='/form'><Button variant='contained' color='success'>BUY</Button></Link>
          )
        }
          {/* {profile?.role=="buyer" &&
          ( */}
            <Link to='/table'><Button variant='contained' color='warning'>Table</Button></Link>
          {/* )
          } */}
        {profile?.role=="seller" && 
          (
            <Link to='/category'><Button variant='contained' color='secondary'>Categories</Button></Link>

          )
        }
        </div>
        {/* <Image/> */}
    </div>
  )
}
