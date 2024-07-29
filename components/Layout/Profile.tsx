"use client";

import { useCurrentUser } from '@/hooks/useCurrentUser';
import React from 'react';
import { BsThreeDots } from 'react-icons/bs';
import Image from 'next/image';

interface ProfileProps {
  isDropdownVisible: boolean;
  setIsDropdownVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const Profile: React.FC<ProfileProps> = ({ isDropdownVisible, setIsDropdownVisible }) => {
  const { user } = useCurrentUser();

  return (
    <div className="relative">
      <button
        onClick={() => setIsDropdownVisible((prev) => !prev)}
        className="rounded-full flex items-center space-x-2 bg-transparent p-4 text-center hover:bg-gray-200 transition duration-200 w-full justify-between"
      >
        <div className="flex items-center space-x-2">
          {user?.profileImageUrl && (
            <Image className="rounded-full" height={50} width={50} alt="user-image" src={user.profileImageUrl} />
          )}
          <div className="text-left text-sm">
            <div className="font-semibold">{user?.firstName}</div>
            <div className="text-gray-500">@{user?.lastName}</div>
          </div>
        </div>
        <BsThreeDots className="text-xl text-gray-500" />
      </button>
    </div>
  );
};

export default Profile;

