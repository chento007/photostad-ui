"use client";
import AsideBar from "@/components/admin-dashboard/AsideBar";
import Skeleton from "@/components/loading/Skeleton";
import { BtnThemeToggle } from "@/components/theme/BtnThemeToggle";
import Forbidden from "@/components/util/Forbidden";
import Unauthorized from "@/components/util/Unauthorized";
import { useGetAdminQuery } from "@/store/features/auth/authApiSlice";
import { useGetUserByIdQuery, useGetUserQuery } from "@/store/features/user/userApiSlice";
import { useTheme } from "next-themes";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { CgMenuLeft } from "react-icons/cg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function Layout({ children }) {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const { data: token, isSuccess } = useGetAdminQuery();
  const { data: user, isFetching } = useGetUserQuery();
  const role = token?.data?.roles[0].name;
  const adminId = token?.data?.id;
  // alert("user id here chento : "+adminId);
  const { data, isLoading, error } = useGetUserByIdQuery(adminId);
  const userToken = data?.data;
  const handleSidebarOpen = () => {
    setIsOpen(!isOpen);
  };
  // handle click anywhere beside sidebar area set isOpen to false
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        document.getElementById("default-sidebar") &&
        !document.getElementById("default-sidebar").contains(event.target)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // check on user if user is not found return forbidden and will be redirect to home page in 5 seconds


  if (isFetching) return <Skeleton />;
  if (!user) return <Unauthorized />;
  if (role === 'SUBSCRIBER' || role === 'GUEST') {
    return <Forbidden />;
  }
  else{
    return (
      <div >
        {/* side bar */}
        <aside
          id="default-sidebar"
          className={`fixed   top-0 left-0 z-50  bg-black dark:bg-secondary  h-screen transition-transform ${isOpen ? "" : "-translate-x-full"
            } sm:translate-x-0`}
          aria-label="Sidebar"
        >
          <div className="h-full w-full ">
            <AsideBar />
          </div>
        </aside>
        <ToastContainer />
  
        {/* end of side bar */}
        {/* nav bar */}
  
        <nav className="sticky  top-0 z-40 ">
          <div className="flex bg-white dark:bg-secondary items-center justify-between h-16 px-6 py-10   border-gray-200  ">
            <div className="flex items-center">
              <button
                className="text-gray-500 rounded-md dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 lg:hidden"
                onClick={handleSidebarOpen}
              >
                <span className="sr-only">Open sidebar</span>
                <CgMenuLeft className="w-6 h-6" />
              </button>
            </div>
            <div className="flex space-x-3">
              <BtnThemeToggle />
              <Image
                className="invert dark:invert-0"
                src={"/assets/icons/profile-2user.svg"}
                width={24}
                height={24}
                alt="element icon"
              />
              <h1 className="dark:text-white p-1.5">
                {userToken ? userToken?.username : "not found"}
              </h1>
            </div>
          </div>
        </nav>
  
        {/* children display */}
  
        <div className="ml-[280px] max-sm:ml-0  dark:bg-primary">{children}</div>
      </div>
    );
  }
  
}
