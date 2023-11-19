import React,{useState,useEffect} from 'react'
import { Button } from '@mui/material'
import Modal from '@mui/material/Modal';
import { Link, Navigate, useNavigate } from 'react-router-dom'
import Viewcard from './Viewcard'
import Deletecard from './Deletecard'
import Axios from 'axios';

export default function Table({count}) {
    const navigate=useNavigate()

    const [get1,setGet] = useState([])

    // const [user,setUser]=useState("")


    // const [count,setCount] = useState(true)
    useEffect(()=>{
        const user=JSON.parse(localStorage.getItem("Token"))
        Axios.get('http://localhost:7000/api/newproduct/view',{headers:{"Token":user}})
        .then((res)=>{
            console.log('res',res.data);
            setGet(res.data)
        })
        .catch((err)=>{
            alert(err);
        });
    },[count])

    console.log(get1,'get1');

    const [open, setOpen] = React.useState(false);
    const [selectedUser,setSelectedUser]=useState('')

    const handleOpen = (i) =>{
        setOpen(true);
        // console.log(i)
        setSelectedUser(i)
        console.log(selectedUser)
    } 
    const handleClose = () => setOpen(false);

    //Delete button

    const [close, setClose] = React.useState(false);

    const handleOpen2=(i) =>{ 
        setClose(true)
        setSelectedUser(i)
    }
    const handleClose2=() => setClose(false)
  return (
    <div>
        <div>
            <table className="table align-middle mb-0 bg-white">
                <thead className="bg-light" >
                <tr>
                    <th>Sl no.</th>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Description</th>
                    <th>Image</th>
                    <th>Category</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                    {get1?.map((i,index)=>{
                        return(
                            <>
                                <tr >
                                    <td>{index+1}</td>
                                    <td>{i.product}</td>
                                    <td>{i.quantity}</td>
                                    <td>{i.price}</td>
                                    <td>{i.description}</td>
                                    <td><img src={`http://localhost:7000/uploads/products/${i?.image}`} alt=" no image found"  style={{width:50}}/></td>
                                    <td>{i?.category_id?.name}</td>
                                    <td >
                                        <Button variant="contained" color='error' onClick={()=>handleOpen2(i)}>Delete</Button>
                                        <Link to={`/edit/${i._id}`}><Button variant="contained" color='primary' >Edit</Button></Link>
                                        <Button variant="contained" color='success' onClick={()=>handleOpen(i)}>View</Button>
                                    </td>
                                    
                                </tr>
                            </>
                        )
                    })}
                </tbody>
            </table>
        </div>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Viewcard seluser={selectedUser} handleClose={handleClose}/>                
        </Modal>

        <Modal
            open={close}
            onClose={handleClose2}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Deletecard handleClose2={handleClose2} seluser={selectedUser} get1={get1} setGet={setGet} />                
        </Modal>
    </div>
  )
}
