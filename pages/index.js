import Header from '@/Components/Header/Header'
import { useStateValue } from '@/Context/StateProvider'
import { useEffect } from 'react'
import React from 'react'
import {AnimatePresence}from 'framer-motion'
import Home from '@/Components/Home/Home'
import axios from 'axios'
function index({products}) {
  const [{product,token},dispatch]=useStateValue()
  
    useEffect(()=>{
      const token= localStorage.getItem('user') !== 'undefined'? localStorage.getItem('user'):null

      dispatch({
        type:'getProduct',
        product:products
       })
       dispatch({
        type:'signin',
         token:token
  })
  if(token){
    axios.get('https://etshop-server.onrender.com/api/getcart',{headers:{"authorization":token?token:'',
    "Access-Control-Allow-Origin":'*'}})
    .then((res)=>{
      dispatch({
        type:'addcart',
        cart:res.data.message[0].cartItem
      })
    })
    .catch((err)=>{
      console.log(err)
    })
  }
  axios.get('https://etshop-server.onrender.com/api/getCatagories')
    .then((res)=>{
      if(res.status == '200')
      {
         dispatch({
          type:'getcatagory',
          catagory:res.data.catagories
         })
      }
    })
    .catch((err)=>{
      console.log(err)
    })
    },[])
    
  return (
    <div className='bg-gray-900 w-full h-10'>
     <AnimatePresence>
     <>
     <Header> </Header>
      <Home></Home>
     </>
     </AnimatePresence>
    </div>
  )
}
export async function getStaticProps(){
  const res=await fetch('https://etshop-server.onrender.com/api/getProduct')
  const products =await res.json()
  return {
    props:{
      products:products.message

    }
  }
}


export default index