"use client";

import React, { useState, useCallback, ChangeEvent, FormEvent } from "react";
import Image from "next/image";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useCreateTweet } from "@/hooks/useCreateTweet";
import { graphqlClient } from "@/clients/api";
import { getSignedURLForTweetQuery } from "@/graphql/query/tweet";
import axios from "axios";
import toast from "react-hot-toast";
import { BiImage } from "react-icons/bi";
import Feed from "./Layout/Feed";
import { Tweet } from "@/gql/graphql";
import { useGetAllTweets } from "@/hooks/useGetAllTweets";

const MainComponent = () => {
  const { user } = useCurrentUser();
  const { mutateAsync } = useCreateTweet();
  const { tweets = [] } = useGetAllTweets();
  const [content, setContent] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");

  const handleInputChangeFile = useCallback(async (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    const file: File | null | undefined = event.target.files?.[0];
    if (!file) return;

    try {
      toast.loading("Uploading", { id: "2" });
      const { getSignedURLForTweet } = await graphqlClient.request(getSignedURLForTweetQuery, {
        imageName: file.name,
        imageType: file.type,
      });

      await axios.put(getSignedURLForTweet, file, {
        headers: { "Content-Type": file.type },
      });

      toast.success("Upload Completed", { id: "2" });
      const url = new URL(getSignedURLForTweet);
      const myFilePath = `${url.origin}${url.pathname}`;
      setImageUrl(myFilePath);
    } catch (error) {
      toast.error("Upload failed");
      console.error("Upload error:", error);
    }
  }, []);

  const handleSelectImage = useCallback(() => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.addEventListener("change", handleInputChangeFile);
    input.click();
  }, [handleInputChangeFile]);

  const handleCreateTweet = useCallback(async (event: FormEvent) => {
    event.preventDefault();

    try {
      await mutateAsync({
        imageUrl,
        content,
      });

      setContent("");
      setImageUrl("");
      toast.success("Tweet created successfully");
    } catch (error) {
      toast.error("Failed to create tweet");
      console.error("Tweet creation error:", error);
    }
  }, [content, mutateAsync, imageUrl]);

  return (
    <main className="flex w-[55%] vs:max-laptop:flex-auto h-full min-h-screen flex-col border-l-[0.5px] border-r-[0.5px] border-gray-600">
      <h1 className="text-xl font-bold p-6 backdrop-blur bg-black/10 sticky top-0">Home</h1>
      <div className="border-t-[0.5px] px-4 border-b-[0.5px] flex items-stretch py-6 space-x-2 border-gray-600 relative">
        <div className="w-11 h-11 bg-slate-400 rounded-full flex-none">
          {user?.profileImageUrl && <Image src={user.profileImageUrl} alt="image" width={800} height={800} />}
        </div>
        <form className="flex flex-col w-full h-full" onSubmit={handleCreateTweet}>
          <input
            value={content}
            onChange={(e) => setContent(e.target.value)}
            type="text"
            name="tweet"
            className="w-full h-full text-2xl placeholder:text-gray-600 bg-transparent border-b-[0.5px] border-gray-600 p-4 outline-none border-none"
            placeholder="What's happening?"
          />
          {imageUrl && <Image src={imageUrl} alt="image" width={800} height={800} />}
          <div className="w-full justify-between items-center flex mt-2">
            <BiImage onClick={handleSelectImage} className="text-xl cursor-pointer" />
            <button type="submit" className="bg-[#1d9bf0] text-white font-semibold text-sm py-2 px-4 rounded-full">
              Tweet
            </button>
          </div>
        </form>
      </div>
      {tweets.map((tweet) => tweet && <Feed key={tweet.id} data={tweet as Tweet} />)}
    </main>
  );
};

export default MainComponent;

  