import React from 'react'
import Slider from '../HorizontaSlider.js/Slider'
import { useStateValue } from '@/Context/StateProvider'
import Bulletin from '../Bulletin/Bulletin'
import banks  from '../../img/bank.jpg'
import banner  from '../../img/banner.jpeg'
import logo from '../../img/logo.webp'
import axios from 'axios'
import { useEffect } from 'react'
function Home({products}) {
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
    <div className='bg-gray-200 w-full'>
         <p className='mx-auto -z-10 font-serif font-semibold'>ከ 2,500 ብር በላይ ይገብዩና እቃዎን በነፃ በ አ.አ ያሉበት ድረስ እናድርስልዎ Free delivery in A.A for purchases of ETB 2,500 and above</p>
         
         <Bulletin img1='https://media.licdn.com/dms/image/C5612AQHMXM39Gi-BOQ/article-cover_image-shrink_423_752/0/1532150222629?e=1680134400&v=beta&t=F1d63MM1ORKSNf2izcgyjFFTuAqhxtAFH_v9MdSH8Oc' img2='https://zameenblog.s3.amazonaws.com/blog/wp-content/uploads/2019/04/cover-image-33-1024x444.jpg' className=''></Bulletin>
         <Slider top='600' product={product}></Slider>
         <h1 className='text-serif font-bold text-2xl'>Food & Beverages</h1>
      <Slider top='1000' product={product && product.filter((pro)=>(
      pro.catagory=='63942a52a3bb313ede4f8597'

  ))}></Slider>   
      <h1 className='text-serif font-bold text-2xl'>Electronics</h1>
      <Slider top='1600' product={product&& product.filter((pro)=>(
      pro.catagory=='639429c9a3bb313ede4f8592'

  ))}></Slider>
         
        </div>
  )
}

export default Home