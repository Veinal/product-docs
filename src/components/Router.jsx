import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './Home'
import Table from './Table'
import Form from './Form'
import Edit from './Edit'
import Register from './Register'
import Login from './Login'
import Navbar from './Navbar'
import Category from './Category'
import { useState } from 'react'

export default function Router() {
  const [count,setCount]=useState(0)
  return (
    <div>
        <BrowserRouter>
        <Navbar/>

        <Routes>
            <Route exact path='/' element={<Home/>} />
            <Route exact path='/table' element={<Table count={count}/>}  />
            <Route exact path='/form' element={<Form setCount={setCount} />}/>
            <Route exact path='/edit/:id' element={<Edit/>}/>
            <Route exact path='/register' element={<Register/>}/>
            <Route exact path='/login' element={<Login/>}/>
            <Route exact path='/category' element={<Category/>}/>
            {/* <Route exact path='/navbar' element={<Navbar/>} /> */}
        </Routes>
        </BrowserRouter>
    </div>
  )
}
