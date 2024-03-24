import React from 'react'
import { AiOutlineHeart } from 'react-icons/ai';
import { BiMessageRounded, BiUpload } from 'react-icons/bi';
import { BsDot, BsThreeDots } from 'react-icons/bs';
import { FaRetweet } from 'react-icons/fa';
import Feed from './Layout/Feed';
import { Tweet } from '@/gql/graphql';
import { useGetAllTweets } from '@/hooks/tweets';

const MainComponent = () => {
  const {tweets=[]} =useGetAllTweets();

  return (
    <main className="flex w-[55%]   vs:max-laptop:flex-auto    h-full min-h-screen   flex-col border-l-[0.5px] border-r-[0.5px] border-gray-600  ">
    <h1 className="text-xl font-bold p-6 backdrop-blur bg-black/10 sticky top-0">
      Home
    </h1>
    <div className="border-t-[0.5px] px-4 border-b-[0.5px] flex items-stretch py-6 space-x-2 border-gray-600 relative">
      <div className="w-11 h-11 bg-slate-400 rounded-full flex-none"></div>
      <form  className="flex flex-col w-full h-full">
      <input
        type="text"
        name="tweet"
        className="w-full h-full text-2xl placeholder:text-gray-600 bg-transparent border-b-[0.5px] border-gray-600 p-4 outline-none border-none"
        placeholder="What's happening?"
      />
      <div className="w-full justify-between items-center flex">
        <div></div>
        <div className="w-full max-w-[100px]">
          <button
            type="submit"
            className="rounded-full bg-[#1d9bf0]  px-4 py-2 w-full text-lg text-center hover:bg-opacity-70 transition duration-200 font-bold"
          >
            Tweet
          </button>
          <button className="invisible" type="reset"></button>
        </div>
      </div>
    </form>
    </div>
    {tweets?.map(tweet=> tweet? <Feed key={tweet?.id}  data ={tweet as Tweet}/>:null)}





  






  </main>

  
  )
}

export default MainComponent

  