
import React from 'react'
import Link from 'next/link';
import { useMemo} from 'react'
import { BiHash, BiHomeCircle, BiUser } from 'react-icons/bi';
import { BsBell, BsBookmark, BsEnvelope, BsThreeDots, BsTwitter } from 'react-icons/bs';
import Image from 'next/image'
import Profile from './Layout/Profile';


interface TwitterlayoutProps{
    children : React.ReactNode;
}
   
interface  TwitterSideBitton
{
  tittle:string,
  icon:React.ReactNode
  link:string
}









 
    const SidebarMenuItems: TwitterSideBitton[]= [
      
      {
      tittle:"Home",
      icon:<BiHomeCircle/>,
      link:'/'
      },
      {
        tittle:"Explore",
        icon:<BiHash/>,
        link:'/'
      },
      
      {
        tittle:"Notifications",
        icon:<BsBell/>,
        link:'/'
      },
      {
        tittle:"Mesaages",
        icon:<BsEnvelope/>,
        link:'/'
      },
      {
        tittle:"Bookmarks",
        icon:<BsBookmark/>,
        link:'/'
      },
   
    {
        tittle:"Profile",
        icon:<BiUser/>,
        link:`/`
      }
  
    ]


const LeftSideBar = () => {
  return (
    

    <section className="w-[23%] vs:max-laptop:w-[10%] sticky top-0 xl:flex flex-col items-stretch h-screen  ">
    <div className="flex flex-col items-stretch h-full space-y-4 mt-4">
<div className='hover:bg-twitter-gray  text-2xl transition duration-200 flex items-center justify-start  rounded-3xl w-fit h-fit  py-2 px-6 vs:max-laptop:px-2'>
    <BsTwitter  />
   

    </div>
  
  {SidebarMenuItems.map((item) => (
    <Link
      className="hover:bg-twitter-gray text-2xl transition duration-200 flex items-center justify-start w-fit h-fit space-x-4 rounded-3xl py-2 px-6  vs:max-laptop:px-2"
      href={item.link}
      key={item.tittle}
    >
      <div >
      {item.icon}
      </div>
      {item.tittle !== "Twitter" && <div  className='vs:max-laptop:hidden '>{item.tittle}</div>}
    </Link>
  ))}
  
   <button className=" vs:max-laptop:hidden  rounded-full m-4 bg-[#1d9bf0] p-4 text-2xl text-center hover:bg-opacity-70 transition duration-200">
          Tweet
   </button>
</div>



<Profile/>



</section>
  )
}

export default LeftSideBar
