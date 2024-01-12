
import React from 'react'




import Image from 'next/image'
import  { useCallback } from 'react'
import {BsBookmark, BsEnvelope, BsTwitter} from "react-icons/bs"
import {BiHomeCircle} from "react-icons/bi"
import {BiHash,BiUser} from "react-icons/bi"
import {BsBell} from "react-icons/bs"
import FeedCard from '@/components/FeedCard'
import { CredentialResponse, GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google'
import  toast,{ Toaster } from 'react-hot-toast';
import { graphqlClient } from '@/clients/api'
import {  getCurrentUserQuery, verifyUserGoogleToken } from '@/graphql/query/user'
import {
  QueryClient,
  QueryClientProvider,
  useQueries,
  useQueryClient,

} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { userCurrentUser } from '@/hooks'


// "https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes.png"
const Front:React.FC = () => {

  const {user} = userCurrentUser();
  const queryClient = useQueryClient();
  
  

  interface  TwitterSideBitton
  {
    tittle:string,
    icon:React.ReactNode
  }
  const SidebarMenuItems: TwitterSideBitton[]=[
    {
    tittle:"Home",
    icon:<BiHomeCircle/>
    },
    {
      tittle:"Explore",
      icon:<BiHash/>
    },
    
    {
      tittle:"Notifications",
      icon:<BsBell/>
    },
    {
      tittle:"Mesaages",
      icon:<BsEnvelope/>
    },
    {
      tittle:"Bookmarks",
      icon:<BsBookmark/>
    },
    {
      tittle:"Profile",
      icon:<BiUser/>
    }

  ]
  const handleLoginWithGoogle =useCallback(async(cred:CredentialResponse)=>{
    
   
    const googleToken = cred.credential
    
    

    if(!googleToken) return toast.error("Something went wrong");

     const {verifyGoogleToken} = await graphqlClient.request(
      verifyUserGoogleToken,{token:googleToken}
     );
     toast.success("Verified Success");

     
     
     if(verifyGoogleToken){
       window.localStorage.setItem('token',verifyGoogleToken);
       queryClient.invalidateQueries({ queryKey: ['current-user'] });
       
      
      }
     
  },[queryClient])
  
  return (
    <div >
        <div className='grid grid-cols-12 h-screen w-screen px-56'>

<div className="col-span-3  ml-10 px-2 pt-2">
 <div className='flex  items-center justify-center rounded-full w-fit text-2xl h-fit text-twitter-blue hover:bg-twitter-gray   p-2  cursor-pointer transition-all'>
<BsTwitter  />

</div>
<div className=' mt-4  '>
 <ul>
   {SidebarMenuItems.map((items)=>(
 
     <li className='flex font-serif  items-center gap-3 hover:bg-twitter-gray rounded-full px-3 py-2 w-fit cursor-pointer mt-2'>
       <span className='text-[1.3em]' >{items.icon}</span>
       <span  className='text-[1.3em]'>{items.tittle}</span>
   
     </li>
     
   )
   )
   }
 </ul>
 <div className='mt-8  px-4'>
 <button className=' bg-[#1d9bf0]   py-3 rounded-full  w-full text-white text-lg text-bold'>Tweet</button>
 </div>
</div>
</div>
<div className='col-span-5 overflow-scroll no-scrollbar border-r-[1px] border-l-[1px] border-twitter-border'>
        <FeedCard/>
        <FeedCard/>
        <FeedCard/>
        <FeedCard/>
        <FeedCard/>
        <FeedCard/>
        <FeedCard/>
        <FeedCard/>
        <FeedCard/>
        <FeedCard/>
        <FeedCard/>

  </div>
 <div className='col-span-3 p-5 '>
{!user&&
    <div className=' p-5 bg-[#F7F9F9] rounded-lg'>
     <h1 className=' my-2 text-2xl font-bold  text-[#0F1419]'>Join Twitter today.</h1>
   <GoogleLogin   onSuccess={handleLoginWithGoogle} />
   </div>

}
 </div>

</div>


</div>
    
    
  )
}

export default Front