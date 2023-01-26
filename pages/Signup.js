import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useStateValue } from '@/Context/StateProvider'
import axios from 'axios'


function Signup() {
  const [{token,catagories,product},dispatch]=useStateValue()
  const history=useRouter()
  const [errors,setErrors]=useState('')
  const [message,setMessage]=useState('')
  const [firstName,setFirstName]=useState('')
  const [lastName,setLastName]=useState('')
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const user={firstName:firstName,lastName:lastName,email:email,password:password}
  const signup=()=>{
  axios.post('https://etshop-server.onrender.com/api/signup',{...user})
  .then((res)=>{
    if(res){
        setMessage('user Created succesfully')
        setTimeout(()=>{
          history.push('/Signin')

        },1000)
      
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
    
    <div className="w-full md:w-96 md:max-w-full mx-auto">
    <div className="p-6 border border-gray-300 sm:rounded-md">
      <form >
      <label className="block mb-6">
          <span className="text-gray-700">First Name</span>
          <input
            onChange={(e)=>{setFirstName(e.target.value)}}
            name="password"
            type="password"
            className="
              block
              w-full
              mt-1
              border-gray-300
              border-2
              rounded-md
              shadow-sm
              focus:border-indigo-300
              focus:ring
              focus:ring-indigo-200
              focus:ring-opacity-50
            "
           
            
            required
          />
        </label>
        <label className="block mb-6">
          <span className="text-gray-700">Last Name</span>
          <input
          onChange={(e)=>{setLastName(e.target.value)}}
            name="password"
            type="password"
            className="
              block
              w-full
              mt-1
              border-gray-300
              rounded-md
              border-2
              shadow-sm
              focus:border-indigo-300
              focus:ring
              focus:ring-indigo-200
              focus:ring-opacity-50
            "
            required
          />
        </label>
        <label className="block mb-6">
          <span className="text-gray-700">Email address</span>
          <input
          onChange={(e)=>{setEmail(e.target.value)}}
            name="email"
            type="email"
            className="
              block
              w-full
              mt-1
              border-gray-300
              rounded-md
              shadow-sm
              focus:border-indigo-300
              focus:ring
              focus:ring-indigo-200
              focus:ring-opacity-50
            "
            placeholder="naty@example.com"
            required
          />
        </label>
        <label className="block mb-6">
          <span className="text-gray-700">Password</span>
          <input
          onChange={(e)=>{setPassword(e.target.value)}}
            name="password"
            type="password"
            className="
              block
              w-full
              mt-1
              border-gray-300
              rounded-md
              shadow-sm
              focus:border-indigo-300
              focus:ring
              focus:ring-indigo-200
              focus:ring-opacity-50
            "
            minLength="6"
            placeholder="(must be 6+ chars)"
            required
          />
        </label>
        <div className="mb-6">
          <div className="mt-2">
            <div>
              <label className="inline-flex items-center">
                <input
                  name="tos"
                  value="yes"
                  type="checkbox"
                  className="
                    text-indigo-600
                    border-gray-300
                    rounded
                    shadow-sm
                    focus:border-indigo-300
                    focus:ring
                    focus:ring-offset-0
                    focus:ring-indigo-200
                    focus:ring-opacity-50
                  "
                  required
                />
                <span className="ml-2">I agree with the Terms and policy</span>
              </label>
            </div>
          </div>
        </div>
        <div className="mb-6">
          <button 
           onClick={()=>{signup()}}
          type='button'
        
            className= " h-10 px-5 text-indigo-100 bg-pink-700  rounded-lg transition-colors duration-150 focus:shadow-outline hover:bg-indigo-800">
            
          
            Sign Up
          </button>
        </div>
        <div>
          <div className="mt-2 text-green-700 text-right text-lg">
        
            <Link href="/Signin" className="hover:underline text-lg text-pink-500"
              >already have account</Link>
          </div>
          <Link href="/" className="hover:underline text-lg text-pink-500"
              >back to home</Link>
                 {errors && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                  <span className="block sm:inline">{errors}</span>
                  <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
           <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
           </span>
</div>}
        </div>
      </form>
    
    </div>
  </div>
  )
}

export default Signup