import React, { useEffect } from 'react'
import { useRef } from 'react'
function Bulletin({img1,img2}) {
  useEffect(()=>{
    scroll(1600)

  },[])
  setTimeout(() => {
    scroll(-1600)
    
  }, 5000);
  
  const Bulletienref=useRef(null)
  const scroll=(offset)=>{
    
    Bulletienref.current &&(
        Bulletienref.current.scrollLeft+=offset
    )
    
  }
  return (
    <div   onMouseLeave={()=>{scroll(1600)}} onMouseEnter={()=>{scroll(-1600)}} ref={Bulletienref} className=' w-[100%] h-[250px] gap-[150px] hidden md:flex md:flex-nowrap md:overflow-x-scroll md:scrollbar-none scroll-smooth   object-cover py-5 px-[190px] rounded-lg'>
          <img  className='w-[1000px] object-cover' src={img1}/>
          <img  className='w-[1000px] object-cover' src={img2}/>
      
      
      </div>
  )
}

export default Bulletin