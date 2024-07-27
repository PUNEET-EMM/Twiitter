"use client"
import { graphqlClient } from '@/clients/api'
import Feed from '@/components/Layout/Feed'
import LeftSideBar from '@/components/LeftSideBar'

import RightSection from '@/components/RightSection'
import { Tweet, User } from '@/gql/graphql'
import { UnfollowUserMutation, followUserMutation } from '@/graphql/mutation/user'
import { getUserByIdQuery } from '@/graphql/query/user'
import { userCurrentUser } from '@/hooks'
import { useGetAllTweets } from '@/hooks/tweets'
import { useQueryClient } from '@tanstack/react-query'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { BsArrowLeftShort } from 'react-icons/bs'

export default  function Profile({params,searchParamas}:any)  {
  const {user} = userCurrentUser();
  const queryClient = useQueryClient();
  // const data = GetUser(params.id)
  // console.log(data);
  const [userData, setUserData] = useState<User>();
 
  const handleFollowerUser = useCallback(async()=>{
    if(!userData) return;
    await graphqlClient.request(followUserMutation,{to:userData?.id})
    queryClient.invalidateQueries({ queryKey: ['current-user'] });
    window.location.reload();

  },[userData?.id,queryClient])
  const handleUnFollowUser =useCallback(async()=>{
    if(!userData) return;
    await graphqlClient.request(UnfollowUserMutation,{to:userData?.id})
    queryClient.invalidateQueries({ queryKey: ['current-user'] });
    window.location.reload();

  },[userData?.id,queryClient])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await GetUser(params.id);
        if (data === "notFound") {
          console.log("User not found");
        } else {
          setUserData(data.getUserById as User);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, [params.id]);

  const amIFollowing = useMemo(()=>{
    if(!userData) return false
    return(
      (user?.following?.findIndex((el)=>el?.id===userData?.id)??-1)<0
    )
    
  },[user?.following,userData?.id])




















  const {tweets=[]} =useGetAllTweets();

  return (
    <div className="w-full h-full flex justify-center items-center relative bg-black text-white">
    <div className="xl:max-w-[70vw] w-full h-full flex relative">
      <LeftSideBar/>

      <main className="flex w-[55%]   vs:max-laptop:flex-auto    h-full min-h-screen    flex-col border-l-[0.5px] border-r-[0.5px] border-gray-600  ">



      
       <div className='flex items-center backdrop-blur bg-black/10 sticky top-0'>
       
       <BsArrowLeftShort className="text-5xl p-1"/>

       <div className='p-1'>
        <h1 className="text-lg font-bold ">{userData?.firstName}</h1>
       <h1 className="text-sm text-gray-500"> {userData?.tweets?.length} Tweets</h1>

      </div>
      </div>
       
   

    <div >
      <img  className ="w-full h-40" src="data:image/jpeg;base64,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" alt="Profile" />
    </div>

    {/* Avatar */}

    <div className="w-44 h-44 absolute  border -2  ml-4 top-36 border-white bg-slate-400 rounded-full flex-none">
    <img
      className="w-44 h-43 rounded-full"
      src={userData?.profileImageUrl  ?? "https://placekitten.com/200/200"} 
      alt="Profile"
    />
          
      </div>



     

   <div className='text-right p-3 m-4s '>
    
    {
      user?.id!=userData?.id&& (<>
      {amIFollowing?(<button onClick={handleFollowerUser} className='border-2   px-6 py-1 rounded-full border-white'>Follow</button>):(<button  onClick={handleUnFollowUser} className='border-2   px-6 py-1 rounded-full border-white'>Unfollow</button>)
      }
      </>)   

    }




   </div>
   {
    user?.id==userData?.id&& <div className='text-right p-3 m-4s '><button  className='border-2   px-6 py-1 rounded-full border-white'>Edit Profile</button></div>
     
   }
    

   <div className='mt-14 ml-5 mb-2'>
    <h1 className='font-bold text-xl'>{userData?.firstName}</h1>
    <h1>@{userData?.id}</h1>
    <div className='flex gap-8 '>
    <h1 > {userData?.followers?.length} followers</h1>
    <h1> {userData?.following?.length} following</h1>

   </div>
   </div>
   

<div className='border-t-[0.5px]  border-gray-600 '>
   {userData?.tweets?.map((tweet)=>
  <Feed key={tweet?.id}  data ={tweet as Tweet}/>
  )}

   </div>
   

  
     </main>
      
      <RightSection/>
    </div>
  </div>

  )
}
async  function GetUser(id :string){
  if (!id) return "notFound"
  const res = await graphqlClient.request(getUserByIdQuery, {id} );
  if (!res?.getUserById) return "notFound";
  return  res;


}

