"use client";
import Custom from "@/app/not-found";
import LoadingSkeleton from "@/components/loading/LoadingSkeleton";
import PageNotFoundComponent from "@/components/util/404";
import { useGetTutorialByIdQuery, useGetTutorialByUUIDQuery } from "@/store/features/tutorial/tutorialApiSlice";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const Page = () => {

  const { id } = useParams();
  console.log("param : ", id);
  const [content, setContent] = useState();
  const { data, isLoading, error } = useGetTutorialByUUIDQuery(id);

  

  useEffect(() => {
    if (data) {
      setContent(data?.data?.htmlContent);
    }
  }, [data]);

  if (isLoading) {
    return (
      <LoadingSkeleton />
    );
  }
  
  if (error) {
    return (<>
      <PageNotFoundComponent />
    </>);
  }

  return (
    <div>
      <div
        id="html-content"
        className="w-full md:w-7/12 p-5 mx-auto"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
};

export default Page;
