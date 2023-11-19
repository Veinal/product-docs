import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, TextField } from '@mui/material';

import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import { Label } from '@mui/icons-material';
import Axios from 'axios';
import { useState } from 'react';


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

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

// const rows = [
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//   createData('Eclair', 262, 16.0, 24, 6.0),
//   createData('Cupcake', 305, 3.7, 67, 4.3),
//   createData('Gingerbread', 356, 16.0, 49, 3.9),
// ];

export default function CustomizedTables() {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [cat,setCat]=React.useState()

    const [getCat,setGetCat]=React.useState([])
    const [count,setCount]=useState(0)


    const handleChange=(e)=>{
       setCat({...cat,[e.target.name]:e.target.value}) 
    }

    const handleSubmit=(e)=>{
        e.preventDefault()

        Axios.post('http://localhost:7000/api/category/insert',cat)
        .then((result)=>{
            console.log(result.data);
            setCount((prev)=>prev+1)
        }).catch((err)=>{
            console.log(err);
        })

        handleClose()
    }

    React.useEffect(()=>{
        Axios.get('http://localhost:7000/api/category/view')
        .then((res)=>{
            console.log('res',res.data);
            setGetCat(res.data)
        })
        .catch((err)=>{
            alert(err);
        });
    },[count])
    
  return (
    <div>
        <div style={{display:'flex',justifyContent:'center',marginRight:'260px'}}>
            <Button onClick={handleOpen} variant='contained'>ADD CATEGORY</Button> 
        </div>
        <div  style={{display:'flex',justifyContent:'center'}}>
            <TableContainer component={Paper} style={{display:'flex',justifyContent:'center',alignItems:'center',width:400}}>
              <Table sx={{ minWidth: 300 }}  aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Sl no.</StyledTableCell>
                    <StyledTableCell >Name</StyledTableCell>
                    <StyledTableCell >Status</StyledTableCell>
                    
                  </TableRow>
                </TableHead>
                <TableBody>
                  {getCat?.map((i,index) => (
                    <StyledTableRow key={i.name}>
                      <StyledTableCell>{index+1}</StyledTableCell>
                      <StyledTableCell >{i.name}</StyledTableCell>
                      <StyledTableCell >{i.status}</StyledTableCell>
                      
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
        </div>

        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                <div>
                    <Card variant='outlined' sx={{ minWidth: 275 }}>
                        <CardContent>
                            <h3>Add Category info:</h3>
                            <br />
                            <Typography>Name:<TextField name='name' onChange={(e)=>handleChange(e)} type='text' size='small'></TextField></Typography><br />
                            <Typography>Status:<TextField name='status' onChange={(e)=>handleChange(e)} type='text' size='small'></TextField></Typography> <br />
                            <Button onClick={handleSubmit} variant='contained' color='success' style={{marginLeft:'60%'}}>Insert</Button>
                        </CardContent>
                        
                    </Card>
                </div>
                </Box>
            </Modal>
        </div>
    </div>
  );
}