"use client"
import React, { useState,useMemo } from 'react';
import Link from 'next/link';
import { BiHash, BiHomeCircle, BiUser } from 'react-icons/bi';
import { BsBell, BsBookmark, BsEnvelope, BsTwitter } from 'react-icons/bs';
import Profile from './Layout/Profile';
import { useCurrentUser } from '@/hooks/useCurrentUser';

interface TwitterSideButton {
  tittle: string;
  icon: React.ReactNode;
  link: string;
}



const LeftSideBar = () => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);


  const {user} = useCurrentUser();

  const SidebarMenuItems: TwitterSideButton[]= useMemo(()=>[
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
      link:`/user/${user?.id}`
    }
  
  ],[user?.id])

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsDropdownVisible(false);
    window.location.reload();
  };

  return (
    <section className="w-[23%] vs:max-laptop:w-[10%] sticky top-0 xl:flex flex-col items-stretch h-screen">
      <div className="flex flex-col items-stretch h-full space-y-4 mt-4">
        <div className="hover:bg-twitter-gray text-2xl transition duration-200 flex items-center justify-start rounded-3xl w-fit h-fit py-2 px-6 vs:max-laptop:px-2">
          <BsTwitter />
        </div>

        {SidebarMenuItems.map((item) => (
          <Link
            className="hover:bg-twitter-gray text-2xl transition duration-200 flex items-center justify-start w-fit h-fit space-x-4 rounded-3xl py-2 px-6 vs:max-laptop:px-2"
            href={item.link}
            key={item.tittle}
          >
            <div>{item.icon}</div>
            {item.tittle !== "Twitter" && <div className="vs:max-laptop:hidden">{item.tittle}</div>}
          </Link>
        ))}

        <button className="vs:max-laptop:hidden rounded-full m-4 bg-[#1d9bf0] p-4 text-2xl text-center hover:bg-opacity-70 transition duration-200">
          Tweet
        </button>
      </div>

      <Profile isDropdownVisible={isDropdownVisible} setIsDropdownVisible={setIsDropdownVisible} />

      {isDropdownVisible && (
        <div className="absolute bottom-20 left-4 bg-gray-300 text-white shadow-lg rounded-md p-2 w-48">
          <button
            onClick={handleLogout}
            className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 rounded-md transition duration-200"
          >
            Logout
          </button>
        </div>
      )}
    </section>
  );
};

export default LeftSideBar;

