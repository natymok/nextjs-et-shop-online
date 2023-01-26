import React from 'react'
import { useRef } from 'react'
import { useEffect } from 'react'
import { useStateValue } from '@/Context/StateProvider'
import {MdShoppingBasket,MdChevronRight,MdChevronLeft}from 'react-icons/md'
import { useRouter } from 'next/router'
import axios from 'axios'
import { motion } from 'framer-motion'

function Slider({top,product}) {
   
  useEffect(() => {
    
    scroll(1585)
    
    
  }, [])
  
  

  let initialpage=0
  const router=useRouter()
  
  const [{token,catagories,cart},dispatch]=useStateValue()
    
    const divref=useRef(null)
    const scroll=(scrolloffset)=>{
      divref.current.scrollLeft+=scrolloffset
    }
      
     
    const nextpage=()=>{
       initialpage=initialpage+1
      axiosinstance.get('/getProduct', {
        params: {
          p: initialpage,
    }})
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
    const addcart=(_product,quantity,price,productPicture)=>{
      let cartItem={product:_product,quantity:quantity,price:price,productPicture:productPicture}
      if(!token)
      {
        router.push('/Signin')
      }
      else{
      axios.post('https://etshop-server.onrender.com/api/addTocart',{cartItem:cartItem},
      {headers:{"authorization":token?token:'',
      "Access-Control-Allow-Origin":'*'}})
      .then((res)=>{
        
        dispatch({
          type:'addcart',
          cart:res.data.cart.cartItem
        })
      })

      .catch((err)=>{
        console.log(err)
      })
      }


    }
    const searchByCatagory=(catagory)=>{
      axiosinstance.get('/search/products',
     
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
       console.log('something went wrong')
     })

    }
  
   
  return (
    <div  className='w-full'>
      <MdChevronLeft   onClick={()=>{scroll(-1585)}} className={`w-8 h-8 md:w-20 md:h-20 absolute top-[${top}px] z-50 left-[0%] cursor-pointer`}></MdChevronLeft>
      <MdChevronRight  onClick={()=>{scroll(1585)}} className={` w-8 h-8 md:w-20 md:h-20 absolute top-[${top}px] z-50 right-[0%] cursor-pointer`}></MdChevronRight>
          <div ref={divref} onMouseLeave={()=>{scroll(1585)}} className='flex justify-start  flex-nowrap scroll-smooth overflow-x-scroll scrollbar-none  w-[full]    gap-2  '>
  
         {product && product.map((item)=>(
            <div  key={item._id} className='bg-white border-2 border-gray-300 flex  justify-between items-center min-w-[150px] md:min-w-[310px] max-w-[200px] md:max-w-[310px] w-[79%] md:w-[310px] rounded-sm '>
               {item.productPicture && item.productPicture.map((pic)=>(
                    
                <div key={pic._id} className='flex flex-col justify-between w-[350px]  h-[250px] md:h-[350px] items-center p-1 md:p-3  '>
                             
                 <img  src={pic.img} className='w-[90%] md:w-[60%]'/>
                 <p className='m-1 md:m-3 font-serif font-sm  md:font-medium'>{item.Description}</p>
                 <div className='flex justify-between w-full items-center'>
                  <p className=' font-thin font-serif text-sm'>BUY NOW</p>
                  <p className='font-sm md:font-medium font-serif'>{item.price}ETB</p>
                  </div>
                  <div className=' flex flex-col md:flex-row items-center w-full justify-between  '>
                   <div className='flex'>
                   <p className='bg-gray-500 rounded-sm py-1 px-4 text-white'>Qty</p>
                    <select className=' border-2 border-gray-200 px-3'>
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                    </select>
                   </div>
                    <div className='border-1 border-gray-300 bg-orange-400 hover:bg-orange-600 text-white font-serif flex p-1 w-[95%] md:w-[50%] md:p-2 cursor-pointer' onClick={()=>{addcart(item._id,item.quantity,item.price,item.productPicture[0].img)}}>
                      <MdShoppingBasket></MdShoppingBasket>
                      <motion.p whileTap={{scale:1.3}} onClick={()=>{addcart(item._id,item.quantity,item.price,pic.img)}}>Add to Cart</motion.p>
                    </div>
                  </div>
                 
                 

                </div>
                        
                     
                     
                    
               ))}
               
              
               
               

            </div>
          ))}
         
         </div>
        
    </div>
  )
}

export default Slider