"use client";

import UnreadReqDataTable from "@/components/DataTable/UnreadDataTable";
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
        <div className="text-sm mb-3 breadcrumbs">
          <ul className="font-extralight text-light dark:text-white">
            <li>
              <Link
                className="text-black dark:text-white"
                href={"/admin/dashboard"}
              >
                Admin
              </Link>
            </li>
            <li>
              <Link href={"/admin/dashboard/tutorialmanagement"}>
                Tutorial Management
              </Link>
            </li>
            <li>
              <Link
                className="text-black dark:text-white"
                href={"/admin/dashboard/tutorialmanagement/unread"}
              >
                Unread
              </Link>
            </li>
          </ul>
        </div>
      </div>
      {/* end of header section */}

      <main>
        <BoxOfToal />
        <h1 className="font-semibold text-center text-[24px] my-14 dark:text-white">
          List of Requests Tutorial&#40;{" "}
          <span className="text-red-600">unread</span> &#41;{" "}
        </h1>
        {/* react data table component */}
        <UnreadReqDataTable />
      </main>
    </div>
  );
}
