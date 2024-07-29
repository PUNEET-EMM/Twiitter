import { Tweet } from '@/gql/graphql';
import React from 'react';
import { AiOutlineHeart } from 'react-icons/ai';
import { BiMessageRounded, BiUpload } from 'react-icons/bi';
import { BsThreeDots } from 'react-icons/bs';
import { FaRetweet } from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';

interface FeedCardProps {
  data: Tweet;
}

const Feed: React.FC<FeedCardProps> = ({ data }) => {
  return (
    <div className="flex flex-col border-b border-gray-600 p-4 hover:bg-gray-800 transition-colors">
      <div className="flex">
        {/* Avatar column */}
        <div className="w-11 h-11 bg-slate-400 rounded-full mx-2 flex-none">
          {data.author?.profileImageUrl && (
            <Image
              className="rounded-full object-cover"
              src={data.author.profileImageUrl}
              width={50}
              height={50}
              alt={`${data.author.firstName} ${data.author.lastName}'s profile picture`}
            />
          )}
        </div>
        {/* Side Tweet Flex col */}
        <div className="flex flex-col flex-grow ml-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1 w-full">
              <Link href={`/user/${data.author?.id}`} legacyBehavior>
                <a className="font-bold text-white">
                  {/* User Name */}
                  {data.author?.firstName} {data.author?.lastName}
                </a>
              </Link>
              <div className="text-gray-500">@{data.author?.username}</div>
              <div className="text-gray-500">• 3min</div>
            </div>
            <div>
              <BsThreeDots className="text-gray-500" />
            </div>
          </div>
          {/* Tweet Text */}
          <div className="text-white mt-2 cursor-pointer hover:bg-white/5 transition-all rounded-lg p-2">
            {data.content}
          </div>
          {data.imageUrl && (
            <div className="mt-2 rounded-lg overflow-hidden">
              <Image src={data.imageUrl} width={550} height={400} alt="tweet image" />
            </div>
          )}
          <div className="flex items-center justify-around mt-2 w-full text-gray-500">
            <div className="flex items-center space-x-2 cursor-pointer hover:text-blue-400">
              <BiMessageRounded className="w-5 h-5" />
              <span className="text-sm">Comment</span>
            </div>
            <div className="flex items-center space-x-2 cursor-pointer hover:text-green-400">
              <FaRetweet className="w-5 h-5" />
              <span className="text-sm">Retweet</span>
            </div>
            <div className="flex items-center space-x-2 cursor-pointer hover:text-pink-400">
              <AiOutlineHeart className="w-5 h-5" />
              <span className="text-sm">Like</span>
            </div>
            <div className="flex items-center space-x-2 cursor-pointer hover:text-blue-400">
              <BiUpload className="w-5 h-5" />
              <span className="text-sm">Share</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feed;

