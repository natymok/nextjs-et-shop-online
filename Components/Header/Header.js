import React from 'react'
import {MdMenu,MdFastfood}from 'react-icons/md'
import {HiHome}from 'react-icons/hi'
import Link from 'next/link'
import { useStateValue } from '@/Context/StateProvider'
import Cart from '../Cart/cart'
import axios from 'axios'
import { motion } from 'framer-motion'
function Header() {

  const [{token,catagories},dispatch]=useStateValue()
  let selectedCatagory='' 
  const setcat=async (e)=>{
    selectedCatagory=e.target.value
    return selectedCatagory

  }
  const calltwoFunction=async (e)=>{
    const catagoryy= await setcat(e)
    searchByCatagory(catagoryy)  
}
const searchByCatagory=(catagory)=>{
  axios.get('https://etshop-server.onrender.com/api/search/products',
 
  {
     params: {
      catagory: catagory
     }
   } 
  
  
 )
 .then((res)=>{
   if(res.status == '200')
   {  
      dispatch({
       type:'getProduct',
       product:res.data.message
      })
   }
 })
 .catch((err)=>{
   console.log(err)
 })

}
const signOut=()=>{
  localStorage.clear()
  dispatch({
      type:'signin',
      token:null
  })
}
const search=()=>{
  axios.get('https://etshop-server.onrender.com/api/search/products',
  
  {
     params: {
       name: product
     }
   } 
  
  
 )
 .then((res)=>{
   if(res.status == '200')
   {
      dispatch({
       type:'getProduct',
       product:res.data.message
      })
   }
 })
 .catch((err)=>{
   console.log(err)
 })
 }
 const toogle=(()=>{
  const menu=document.getElementById('ul')
  if( menu.style.display=='flex')
       { menu.style.display='none'}

  else{
      menu.style.display='flex'
  }


})
  return (
    <div className='full '>
      <nav className='bg-orange-400 w-full h-[180px] md:h-[150px]   items-center'>
       <div className=' flex items-center justify-start md:justify-between  '>
       <div className='flex items-center w-full md:w-[50%]'>
        
        <div className='p-2 md:p-4 w-[10%] hidden md:block '>
          <MdFastfood className='w-[30px] h-[25px] md:w-[40px] md:h-[50px] cursor-pointer'></MdFastfood>
          <p className='text-black text-sm w-[5%] md:text-md'>@Etshop</p>
          </div>
          <div className=' flex w-full ml-[8%] md:ml-[5%] mt-10 '>
            <input className='p-1 md:p-2 rounded-md min-w-[20px] w-[70%] md:w-full' placeholder='search product'></input>
            <div className='flex items-center w-[25%] ml-[1%]'>
            <button className='bg-white text-sm md:text-lg p-1 md:p2 rounded-md md:w-[85%] w-[85%]  font-serif '>Search</button>
           
            </div>
          </div>
        
        <div>

        </div>

        </div>
        <div className='md:flex items-center hidden  justify-end w-[40%]'>
          <Link className='font-serif font-bold' href={'/'}>Home</Link>
          <select onChange={(e)=>{calltwoFunction(e)}} className='bg-orange-400 rounded-md'>
                <option>Browse by Catagory</option>
                    {catagories && catagories.map((cat)=>(
                        
                        <option key={cat._id} value={cat._id}>{cat.name}</option>
                    ))}
                </select>
            {!token && (<Link href={'/Signup'} className='px-2 font-serif font-bold'>Register</Link>)}
            { !token && (<Link href={'/Signin'} className='px-2 font-serif font-bold'>Signin</Link>)}
            {token && (<button onClick={()=>{signOut()}}>signOut</button>)}
            {token && (<Cart></Cart>)}

        </div>
       </div>
     <div className='md:hidden'>
         
     <div className='flex ml-[8%] pt-4'>
     <MdMenu onClick={toogle} className='w-[30px] h-[30px] md:hidden cursor-pointer'></MdMenu>
     <HiHome className='w-[30px] h-[30px]  md:hidden cursor-pointer'></HiHome>
     {token && (<Cart></Cart>)} 
       
     </div>

     </div>
     <div   className=' md:hidden bg-orange-400 '>
            <ul id='ul' className='hidden flex-row flex-wrap gap-1 text-[0.rem] font-serif font-semibold'>
            <motion.div className='cursor-pointer' whileTap={{scale:1.2}}>
                  Home
                </motion.div>
                <select onChange={(e)=>{calltwoFunction(e)}} className='bg-orange-400 rounded-md'>
                <option>Browse by Catagory</option>
                    {catagories && catagories.map((cat)=>(
                        
                        <option key={cat._id} value={cat._id}>{cat.name}</option>
                    ))}
                </select>
                <Link  className='  text-[1rem]' href='/Signup'>Register</Link>
                {!token && (<Link className='  text-[1rem]' href='/Signin'>Signin</Link>)}
                 {token && (<button className='' onClick={signOut}>signOut</button>)}
            </ul>
        </div>
      </nav>
        </div>
    
  )
}

export default Header