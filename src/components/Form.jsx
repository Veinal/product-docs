import React, { useState,useEffect } from 'react'
import { Button } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import Axios from 'axios'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';

export default function Form({setCount}) {

    const navigate=useNavigate()

    const [form,setForm]=useState()
    const [images,setImages]=useState({
        imageIndx:[],
        name:""
    })

    const Name=(e)=>{
        console.log({[e.target.name]:e.target.value  })
        setForm({...form,[e.target.name]:e.target.value})
    }

    const HandleImage =(e,index)=>{
        const imageVar = [...images.imageIndx]
        imageVar[index]=e.target.files[0]
        setImages({...images,imageIndx:imageVar})
    }
    console.log(form,'fr');
    console.log(images,'img1');

    const [user,setUser]=useState("")

    useEffect(()=>{
        if(localStorage.getItem("Token")===null){
            navigate('/login')
        }else{
            setUser(JSON.parse(localStorage.getItem("Token")))
        }
    },[])

    const [getCate,setGetCate]=useState([])
    const [selectedCate,setSelectedCate]=useState()

    useEffect(()=>{
        Axios.get('http://localhost:7000/api/category/view')
        .then((res)=>{
            console.log('res',res.data);
            setGetCate(res.data)
        })
        .catch((err)=>{
            alert(err);
        });
    },[])
    // console.log(getCate,'getCate');
    const handleCategory = (e)=>{
        setSelectedCate(e.target.value);
    }
    
    const handleSubmit = async (e)=>{
        e.preventDefault();
        console.log(form)

        const Data1=new FormData();
        Data1.append("product",form.product)
        Data1.append("category",selectedCate)
        Data1.append("quantity",form.quantity)
        Data1.append("price",form.price)
        Data1.append("description",form.description)
        // Data1.append("image",form.image)
        images.imageIndx.map((item)=>{
            Data1.append("image",item)
        })

        Axios.post('http://localhost:7000/api/newproduct/insert',Data1,{headers:{"Token":user}})
        .then((result)=>{
            console.log(result.data);
            setCount((prev)=>prev+1)
        }).catch((err)=>{
            console.log(err);
        });

        navigate('/table')

    }

    
    
  return (
    <div>
        <div style={{border:"2px solid black",width:450,marginLeft:350,padding:10}}>
            <h1 style={{display:'flex',justifyContent:'center'}}><b>BUY PRODUCT</b></h1> <hr />
            <div style={{display:'inline-grid',gridTemplateColumns:'repeat(2,1fr)', gap: '10px',justifyContent:'center',alignItems:'center',marginLeft:'25px' }}>
                <strong>Product:</strong><input type="text" name='product' onChange={(e)=>Name(e)} placeholder='Enter product name'/>
                <strong>Quantity:</strong><input type="number" name='quantity' onChange={(e)=>Name(e)} placeholder='Enter quantity'/>
                <strong>Price:</strong><input type="number" name='price' onChange={(e)=>Name(e)} placeholder='Enter price'/>
                <strong>Description:</strong><input type="text" name='description' onChange={(e)=>Name(e)} placeholder='Description'/>
                {/* <strong>Image:</strong><input type='file' name='image' onChange={(e)=>HandleImage(e)} placeholder='Enter image'/> */}
                <strong>Image1:</strong><input type='file' name='image1' onChange={(e)=>HandleImage(e,0)} placeholder='Enter image'/>
                <strong>Image2:</strong><input type='file' name='image2' onChange={(e)=>HandleImage(e,1)} placeholder='Enter image'/>
                <strong>Image3:</strong><input type='file' name='image3' onChange={(e)=>HandleImage(e,2)} placeholder='Enter image'/>
                <strong>Image4:</strong><input type='file' name='image4' onChange={(e)=>HandleImage(e,3)} placeholder='Enter image'/>
                <strong>Category:</strong>
                <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Category:</InputLabel>
                        <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        // value={age}
                        name="category"
                        label="Category"
                        onChange={(e)=>handleCategory(e)}
                        >
                        {getCate?.map((item)=>{
                            return(<MenuItem value={item._id}>{item.name}</MenuItem>)
                        })}                       
                        </Select>
                    </FormControl>
                </Box>
               
            </div>
            <div style={{display:'flex',justifyContent:'center',marginTop:'50px',gap:10}}>
                <Button variant="contained" color='success' type='submit' onClick={handleSubmit}>BUY</Button>
                    <Link to='/table'><Button variant="contained" color='secondary' >View Tables</Button></Link>
            </div>
        </div>
    </div>
  )
}
