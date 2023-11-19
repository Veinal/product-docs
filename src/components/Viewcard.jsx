import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
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
export default function MediaCard(props) {
    // console.log(seluser,11111)
    console.log(props.seluser,111)
   
  return (
    <>
    <Card sx={style}>
        {/* <img width={'200px'} src="https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg" alt="" /> */}
        
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          user details
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <img src={props.seluser.image} alt="no image found" style={{width:100}} />
          <h2><label><b><u>Product:</u></b></label>{props.seluser.product}</h2>
          <h2><label><b><u>Quantity:</u></b></label>{props.seluser.quantity}</h2>
          <h2><label><b><u>Price:</u></b></label>{props.seluser.price}</h2>
          <h2><label><b><u>Description:</u></b></label>{props.seluser.description}</h2>
          <Button onClick={props.handleClose} variant='contained' color='inherit'>Close</Button>
        </Typography>
      </CardContent>
      
    </Card>

    
</>
  );
}
