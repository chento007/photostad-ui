'use client'
import Skeleton from "@/components/loading/Skeleton";
import SettingNavMenu from "@/components/profile/SettingNavMenu";
import Forbidden from "@/components/util/Forbidden";
import Unauthorized from "@/components/util/Unauthorized";
import { useGetUserQuery } from "@/store/features/user/userApiSlice";
import React from "react";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function Layout({ children }) {
  const {data:user, isFetching} = useGetUserQuery()

  if(isFetching) return <Skeleton />
  if(!user) return <Unauthorized/>
  
  return (
    <div className="bg-[whitesmoke] dark:bg-[#1e1e1e]">
      <div className="flex w-full lg:w-[1140px]  justify-center gap-0 md:gap-4 mx-auto py-5 ">
        <SettingNavMenu />
        <ToastContainer />
        
        {children}
      </div>
    </div>
  );
}
