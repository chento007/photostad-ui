'use client'

import { useGetAllReadedQuery, useGetAllRequestTutorialsQuery, useGetAllUnreadQuery } from "@/store/features/requestTutorial/requestTutorialApiSlice";
import Skeleton from "./Skeleton";
import React, { useState, useEffect } from "react";

export default function BoxOfToal() {

    // const { data: listReq, isLoading } = useGetAllRequestTutorialsQuery();

    const [perPage, setPerPage] = useState(1000000);
    const [currentPage, setCurrentPage] = useState(1);
    
    const {
      data: listReq,
      isLoading,
      error,
    } = useGetAllRequestTutorialsQuery({ page: currentPage, limit: perPage, isRead: true, isReadAll: true });


    const {data:readedReq,isLoading:isLoadingReaded} = useGetAllReadedQuery();
    const {data:unreadReq,isFetching} = useGetAllUnreadQuery();
    
    if(isLoading || isLoadingReaded || isFetching) return <Skeleton />
    
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* box 1 */}
          <div className="bg-white rounded-main shadow-sm dark:bg-secondary flex flex-col justify-center items-center h-[170px]">
            <h2 className="font-light text-light dark:text-white ">
              Total Requests
            </h2>
            <h2 className="font-black text-[40px] text-light dark:text-white ">
              {listReq?.data?.total || 0}
            </h2>
          </div>
          {/* box 2 */}
          <div className="bg-white rounded-main shadow-sm dark:bg-secondary flex flex-col justify-center items-center h-[170px]">
            <h2 className="font-light text-light dark:text-white ">Readed</h2>
            <h2 className="font-black text-[40px] text-light dark:text-white ">
              {readedReq?.data?.total}
            </h2>
          </div>
          {/* box 3 */}
          <div className="bg-white rounded-main shadow-sm dark:bg-secondary flex flex-col justify-center items-center h-[170px]">
            <h2 className="font-light text-light dark:text-white ">Unread</h2>
            <h2 className="font-black text-[40px] text-light dark:text-white ">
                {unreadReq?.data?.total}
            </h2>
          </div>
        </div>
  )
}