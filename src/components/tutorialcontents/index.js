"use client";
import { useGetTutorialQuery, useGetTutorialUUIDQuery } from "@/store/features/tutorial/tutorialApiSlice";
import React, { useState } from "react";
import CardTutorial from "./components/CardTutorial";
import Loading from "../loading/Loading";

const TutorialContent = () => {

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [previous, setPrevious] = useState(false);
  const [next, setNext] = useState(true);
  const { data: tutorials, isSuccess, isLoading, isError } = useGetTutorialQuery({ page: page, perPage: limit, name: "" });

  const viewImagePrefix = "https://photostad-api.istad.co/files/";
  const handleClickChangePage = (page) => {
    setPage(page);
  }
  return (
    isLoading ? <>
      <Loading />
    </> :
      <>
        <div className="gap-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-center">        {isSuccess &&
          tutorials?.data?.list.map((tutorial, index) => (
            <>
              <CardTutorial
                key={index}
                uuid={tutorial?.uuid}
                name={tutorial?.name}
                slug={tutorial?.slug}
                thumbnail={`${viewImagePrefix}${tutorial.thumbnail.name}`}
              />
            </>
          ))}

        </div>
        <nav aria-label="Page navigation example" className="mt-5">
          <ul class="flex items-center -space-x-px h-8 text-sm">
            <li>
              <button
                disabled={!tutorials?.data?.hasPreviousPage}
                onClick={() => handleClickChangePage(tutorials?.data?.prePage)} class="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                <span class="sr-only">Previous</span>
                <svg class="w-2.5 h-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4" />
                </svg>
              </button>
            </li>
            {
              tutorials?.data?.navigatepageNums.map((item, index) => (
                <li key={index}>
                  <button onClick={() => handleClickChangePage(item)} class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                    {item}
                  </button>
                </li>
              ))
            }

            <li>
              <button
              
                disabled={!tutorials?.data?.hasNextPage}
                onClick={() => handleClickChangePage(tutorials?.data?.nextPage)} class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                <span class="sr-only">Next</span>
                <svg class="w-2.5 h-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4" />
                </svg>
              </button>
            </li>
          </ul>
        </nav>
      </>

  );
};

export default TutorialContent;
