import React from 'react'
import {Button} from '@mui/material'
import {useParams,useNavigate} from 'react-router-dom'
import { useState,useEffect } from 'react'
import Axios from 'axios'

export default function Updateform() {

    const params=useParams()
    const navigate=useNavigate()

    let userID=params.id;

    const [upd,setUpd]=useState([])
    const [disp,setDisp]=useState([])
    const [index,setIndex]=useState([])

    useEffect(()=>{
        Axios.get(`http://localhost:7000/api/newproduct/singleview/${userID}`)
        .then((res)=>{
            console.log('res',res.data);
            setDisp(res.data)
        })
        .catch((err)=>{
            alert(err);
        });

    },[])
    console.log(upd,'upd')
    console.log(disp,'disp')

    const handleChange=(e)=>{
      setDisp({...disp,[e.target.name]:e.target.value})
    }

    const handleSubmit=async()=>{
      // const updatedData=[...upd]
      // updatedData.splice(index,1,disp)
      // localStorage.setItem("Product",JSON.stringify(updatedData))

      Axios.put(`http://localhost:7000/api/newproduct/update/${userID}`,disp)  
      .then((res)=>{
        console.log('res',res.data);
      })
      .catch((err)=>{
        console.log(err);
      })
console.log(upd,"upd");
      await navigate('/table')
    }
  return (
    <div>
        <div align='center' style={{display:'inline-grid', gap: '10px',marginLeft:'40%' }}>
            <h1><b>UPDATE PRODUCT</b></h1>
            <input type="text" name='product' onChange={(e)=>handleChange(e)} value={disp?.product}  placeholder='Enter your Name'/>
            <input type="number" name='quantity' onChange={(e)=>handleChange(e)} value={disp?.quantity}  placeholder='Enter your Phone'/>
            <input type="number" name='price' onChange={(e)=>handleChange(e)} value={disp?.price} placeholder='Enter your Email'/>
            <input type="text" name='description' onChange={(e)=>handleChange(e)} value={disp?.description} placeholder='Enter your Password'/>
            {/* <input type='text' name='image' onChange={(e)=>handleChange(e)} value={disp?.image} placeholder='Enter image'/> */}
            <Button variant="contained" color='success' type='submit' onClick={handleSubmit}>Submit</Button>
        </div>
    </div>
  )
}
