import Header from '@/Components/Header/Header'
import { useStateValue } from '@/Context/StateProvider'
import { useEffect } from 'react'
import React from 'react'
import {AnimatePresence}from 'framer-motion'
import Home from '@/Components/Home/Home'
import axios from 'axios'
function index({products}) {

  
  
    
  return (
    <div className='bg-gray-900 w-full h-10'>
     <AnimatePresence>
     <>
     <Header> </Header>
      <Home products={products}></Home>
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