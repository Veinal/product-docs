import React, { useState } from 'react'
import Axios from 'axios'

export default function Image() {

    const [images,setImages]=useState({
        image1:[],
        name:""
    })

    const  HandleChange=(e)=>{
        setImages({...images,[e.target.name]:e.target.value})
    }

    const HandleFileChange=(e,index)=>{
        const image = [...images.image1]
        image[index]=e.target.files[0]
        setImages({...images,image1:image})

        // console.log(image,1234);

    }
    // console.log(images,'image');

    const handleSubmit=()=>{
        const data = new FormData();
        images.image1.map((item)=>{
            data.append("image",item)

        });
        data.append("name",images.name)
        Axios.post("http://localhost:7000/api/images/insert",data)
        .then((response)=>{
            console.log(response.data);

        })
        .catch((error)=>{
            console.log(error);
        })
    }

  return (
    <div>
        <div style={{display:'flex',flexDirection:'column',maxWidth:500}}>
            <input type="text" name="name" onChange={(e)=>HandleChange(e)} />
            <input type="file" name="image1" onChange={(e)=>HandleFileChange(e,0)}  />
            <input type="file" name="image2" onChange={(e)=>HandleFileChange(e,1)} />
            <input type="file" name="image3" onChange={(e)=>HandleFileChange(e,2)} />
            <input type="file" name="image4" onChange={(e)=>HandleFileChange(e,3)} />
            <button className='btn btn-success' onClick={handleSubmit}>submit</button>
        </div>
    </div>
  )
}
