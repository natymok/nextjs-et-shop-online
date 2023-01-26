import React from 'react'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import {motion}from 'framer-motion'
import { useStateValue } from '@/Context/StateProvider'
import axios from 'axios'
function Signin() {
  const history=useRouter()
const[{token,catagories,products},dispatch]=useStateValue()
const [email,setEmail]=useState('')
const [password,setPassword]=useState('')
const [errors,setErrors]=useState('')
const [message,setMessage]=useState('')
const form={email:email,password:password}
const signin=()=>{
  
      axios.post('https://etshop-server.onrender.com/api/signin',{email:email,password:password})
      .then((res)=>{
        if(res.status=='200')
        {
          localStorage.setItem('user',res.data.Accesstoken)
         
         dispatch({
            type:'signin',
             token:res.data.Accesstoken
      })
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
         setMessage(res.data.message)
     
          history.push('/')
        }
      })
      .catch((err)=>{
        setErrors(err.response.data.error)
        setTimeout(()=>{
          setErrors('')

        },2000)
      })


}
  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
    <div className="relative py-3 sm:max-w-xl sm:mx-auto">
      <div
        className="absolute inset-0 bg-gradient-to-r from-blue-300 to-pink-700 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl">
      </div>
      <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
        <div className="max-w-md mx-auto">
          <div>
            <Link href='/Signup' className="text-md">dont have account?</Link>
          </div>
          <div className="divide-y divide-gray-200">
            <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
              <div className="relative">
                <input autoComplete="off" id="email" name="email" type="text" className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Email address" onChange={(e)=>{setEmail(e.target.value)}} />
                <label htmlFor="email" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Email Address</label>
              </div>
              <div className="relative">
                <input autoComplete="off" id="password" name="password" type="password" className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Password"  onChange={(e)=>{setPassword(e.target.value)}}/>
                <label htmlFor="password" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Password</label>
              </div>
              <div className="relative">
                <motion.button onClick={()=>{signin()}} whileTap={{scale:1.3}} className="bg-pink-500 text-white rounded-md px-2 py-1">Signin</motion.button>
              </div>
              <Link href='/' className="text-md">back to home</Link>
              {errors && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                  <span className="block sm:inline">{errors}</span>
                  <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
           <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
           </span>
</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Signin