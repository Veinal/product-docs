import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
// import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate,Link } from 'react-router-dom'
import {useState,useEffect} from 'react'
import Axios from 'axios';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignUp() {
  const navigate=useNavigate()
  const [reg,setReg]=useState()

  const RegisterChange=(e)=>{
    setReg({...reg,[e.target.name]:e.target.value})
  }  

  const ImageChange=(e)=>{
    // console.log(e,'e');
    setReg({...reg,[e.target.name]:e.target.files[0]})

  }
  const [selectedRole,setSelectedRole]=useState()
  
  const HandleRole=(e)=>{
    setSelectedRole(e.target.value)
  }
  console.log(reg,'reg');

  const HandleSubmit=async(e)=>{
    e.preventDefault()

    const Data = new FormData();
    Data.append("name",reg.name)
    Data.append("email",reg.email)
    Data.append("password",reg.password)
    Data.append("image",reg.image) 
    Data.append("role",selectedRole) 

    Axios.post('http://localhost:7000/api/newregister/register',Data)
    .then((result)=>{
      console.log(result.data);
    }).catch((err)=>{
      console.log(err);
    })

    // Axios.post('http://localhost:7000/api/newregister/register',reg)
    // .then((result)=>{
    //   console.log(result.data);
    // }).catch((err)=>{
    //   console.log(err);
    // })

    await navigate('/')
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate  sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} >
                <TextField
                  autoComplete="given-name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  autoFocus 
                  onChange={(e)=>RegisterChange(e)}
                />
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={(e)=>RegisterChange(e)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={(e)=>RegisterChange(e)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id='image'
                  label="Image"
                  type='file'
                  name='image'
                  onChange={(e)=>ImageChange(e)}
                />
              </Grid>
              <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Role</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  // value={age}
                  name='role'
                  label="Role"
                  onChange={(e)=>HandleRole(e)}
                >
                  <MenuItem value="seller">Seller</MenuItem>
                  <MenuItem value="buyer">Buyer</MenuItem>
                  
                </Select>
              </FormControl>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={HandleSubmit}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to='/login'>
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        
      </Container>
    </ThemeProvider>
  );
}