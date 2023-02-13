import React from "react";
import {MdShoppingBasket,MdDelete}from 'react-icons/md'
import{motion} from 'framer-motion'
import { useStateValue } from "@/Context/StateProvider";
import axios from "axios";
import { headers } from "@/next.config";
export default function Cart() {
   

  const [{cart,token},dispatch]=useStateValue()
  
 
  const [showModal, setShowModal] = React.useState(false);
  const deleteitem=(id)=>{
    const newcart=cart && cart.filter((item)=>(
      item._id!=id
      
    ))
    axios.put('https://etshop-server.onrender.com/api/removefromCart', { cartItem:newcart },
    {headers:{"authorization":token?token:'',
    "Access-Control-Allow-Origin":'*'}})
    .then((res)=>{
       dispatch({
        type:'addcart',
        cart:res.data.message.value.cartItem
      })
    })
    .catch((err)=>{
      console.log(err)
    })
      
     
    

  }
  let subtOt=0
  let vat=0
  let Total=0
  const callculateTotal=(item)=>{
    subtOt=subtOt+item.price
    vat=vat+(0.15*item.price)
    Total=subtOt+vat

  }
 
  const fetchCart=()=>{
    setShowModal(true)
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
  return (
   <div className="">
    <motion.div whileTap={{scale:1.2}} className="relative  cursor-pointer" onClick={fetchCart}>
     <MdShoppingBasket className=" w-5 h-5 md:w-10 md:h-7 "> </MdShoppingBasket>
       <div className="flex bg-black rounded-full justify-center items-center w-5 h-4  absolute left-1 -top-3 md:-top-4 md:left-5 text-xl text-white">
       <p className="  ">{cart && cart.length}</p>
        </div>
     </motion.div>
      {showModal ? (
        <div>
         
         <div
            className="justify-center items-center flex overflow-x-hidden fixed inset-0 z-50 outline-none focus:outline-none "
          >
            <div className="relative w-[90%] md:w-full my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-1 border-b border-solid border-slate-200 rounded-t">
                 
                  <div className="relative p-6 flex-auto">
                    {cart && cart.map((item)=>(
                      
                      
                      <div key={item._id} className='w-100 h-20 flex items-center justify-between'>
                        {callculateTotal(item)}
                        
                        <img className="w-10 h-10 md:w-20 md:h-20" src={item.productPicture} alt=''></img>
                        <select className=" w-[30%] md:w-[10%] border-gray-400 border-2" >
                        <option value={'1'}>1</option>
                        <option value={'2'}>2</option>
                        <option value={'3'}>3</option>
                        <option value={'4'}>4</option>
                        <option value={'5'}></option>
                        </select>
                        <p>{item.price}ETB</p>
                        <div onClick={()=>{deleteitem(item._id)}} className="text-red flex item-center items-center cursor-pointer pl-1">
                          <MdDelete className="w-6 h-6"></MdDelete>
                        </div>

                      </div>

                    ))}
                     <div className="w-full  ">
                    <div className="w-full flex justify-between">
                      <p>Sub total</p>
                      <p>{subtOt}</p>
                    </div>
                    <div className="w-full flex justify-between text-sm md:text-md ">
                      <p>Vat(15%)</p>
                      <p>{vat}</p>
                    </div>
                    <div className="w-full flex justify-between ">
                      <p>total</p>
                      <p>{Total}</p>
                    </div>
                  </div>
                  </div>
                 
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    order
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>

        </div>
      ) : null}
   </div>
  );
}
