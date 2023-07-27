"use client";
import LoadingSkeleton from "@/components/loading/LoadingSkeleton";
import { useGetTutorialByIdQuery } from "@/store/features/tutorial/tutorialApiSlice";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const Page = () => {
  const { id } = useParams();
  const [content, setContent] = useState();
  const { data, isLoading, error } = useGetTutorialByIdQuery(id);
  console.log(data?.data?.htmlContent, " data of tutorial");
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

  return (
    <div>
      <div
        id="html-content"
        className="w-7/12 mx-auto"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
};

export default Page;
