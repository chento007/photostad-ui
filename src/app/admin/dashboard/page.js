'use client'
import DashboardOverview from '@/components/admin-dashboard/DashboardOverview'
import { useGetAdminQuery } from '@/store/features/auth/authApiSlice'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { toast } from 'react-toastify'

const Page = () => {

  return (
    <div>
      <div className=" db-bg  p-5   dark:bg-primary  rounded-md shadow h-screen">
        <div className="sticky top-20 z-30 db-bg dark:bg-primary">
          <h1 className="text-[32px] font-semibold dark:text-white mb-5">
            Dashboard Overview
          </h1>
          <div className="text-[14px] mb-3 p-0 font-extralight text-gray-900 breadcrumbs dark:text-white">
            <ul >
              <li >
                <Link className='dark:text-white text-black' href={"/admin/dashboard"}>Admin</Link>
              </li>
              <li>
                <Link className='dark:text-white text-black' href={"/admin/dashboard"}>Dashboard Overview</Link>
              </li>
            </ul>
          </div>
        </div>
        <main>
          <DashboardOverview />
        </main>
      </div>

    </div>
  )
}

export default Page