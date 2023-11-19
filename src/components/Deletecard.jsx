import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Axios from 'axios';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

export default function MediaCard({handleClose2,seluser,get1,setGet,setCount}) {
    // console.log(seluser,11111)
    console.log(seluser.name,111)
    console.log(get1,222)
    // console.log(setGet,111)

    const Del =async(item)=>{
      Axios.delete(`http://localhost:7000/api/newproduct/delete/${seluser._id}`)  
      .then((res)=>{
        console.log('res',res.data);
        setCount((prev)=>!prev);
        // await handleClose2
      })
      .catch((err)=>{
        console.log(err);
      })
      await handleClose2();
    }
   
  return (
    <>
    <Card sx={style}>
        <img width={'200px'} src="https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg" alt="" />
        
      
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          do you want to delete {seluser.product} ?
        </Typography>
        <Typography variant="body2" color="text.secondary">
          
          <Button onClick={()=>Del(seluser)} variant='contained' color='error' >Delete</Button>
          <Button onClick={handleClose2} variant='contained' color='inherit'>Close</Button>
        </Typography>
      </CardContent>
      
    </Card>

    
</>
  );
}
