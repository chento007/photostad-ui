"use client";
import ListOfReqDataTable from "@/components/DataTable/ListOfReqDataTable";

import Link from "next/link";
import React from "react";

import BoxOfToal from "../util/BoxOfToal";

export default function Page() {
 
  
  return (
    <div className="w-full p-5 mx-auto db-bg h-full dark:bg-primary">
      {/* header section */}
      <div className="db-bg dark:bg-primary sticky top-20 z-40">
        <h1
          className={
            "text-[32px] text-light dark:text-white font-semibold mb-5"
          }
        >
          Tutorial Management
        </h1>
        {/* breadcrumbs */}
        <div className="text-sm breadcrumbs mb-3">
          <ul className="font-extralight text-light dark:text-white">
            <li>
              <Link className="text-black dark:text-white" href={"/admin/dashboard"}>Admin</Link>
            </li>
            <li>
              <Link className="text-black dark:text-white" href={"/admin/dashboard/tutorialmanagement"}>
                Tutorial Management
              </Link>
            </li>
            <li>
              <Link className="text-black dark:text-white" href={"/admin/dashboard/tutorialmanagement/listofrequest"}>
                List of Requests
              </Link>
            </li>
          </ul>
        </div>
      </div>
      {/* end of header section */}

      <main>
       <BoxOfToal />
        <h1 className="font-semibold text-center text-[24px]  my-14 dark:text-white">
          List of Requests Tutorial
        </h1>

        {/* react data table component */}
        <ListOfReqDataTable />
      </main>
    </div>
  );
}
