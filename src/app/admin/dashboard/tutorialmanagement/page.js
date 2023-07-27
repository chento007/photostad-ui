'use client'
import { TutorialDatatable } from "@/components/DataTable/TutorialDatatable";
import { useGetTutorialQuery } from "@/store/features/tutorial/tutorialApiSlice";
import Link from "next/link";
import React, { useState } from "react";

const Page = () => {

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [name, setName] = useState("");

  const { data: tutorials, isLoading, isSuccess } = useGetTutorialQuery({ page: page, perPage: limit, name: name });


  return (
    <>
      <div className={"w-full p-5 mx-auto db-bg h-full dark:bg-primary"}>
        <div className="db-bg dark:bg-primary sticky top-20 z-40">
          <h1
            className={
              "text-[32px] text-light dark:text-white font-semibold mb-5"
            }
          >
            Tutorial Management
          </h1>
          {/* breadcrumbs */}

          <div class="breadcrumbs font-extralight text-light dark:text-white">
            <ul>
              <li>
                <Link className="text-black dark:text-white" href={'/'}>Admin</Link>
              </li>
              <li>
                <a className="text-black dark:text-white">Tutorial Management</a>
              </li>
            </ul>
          </div>
        </div>
        <section>
          <div className="h-full xl:h-screen">
            {/* use with ckeditor run build error self is not define */}
            <TutorialDatatable />
          </div>
        </section>
      </div>
    </>
  );
};

export default Page;
