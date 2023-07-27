"use client";
import React, { useEffect, useState } from "react";
import { BtnThemeToggle } from "../theme/BtnThemeToggle";
import { useTheme } from "next-themes";
import Link from "next/link";
import Image from "next/image";
import { LiaBarsSolid } from "react-icons/lia";
import { signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { logout, setCurrentUser } from "@/store/features/auth/authSlice";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { useGetUserQuery } from "@/store/features/user/userApiSlice";
import {
  useGetAdminQuery,
  useGetTokenQuery,
} from "@/store/features/auth/authApiSlice";
import { toast } from "react-toastify";
import Unauthorized from "../util/Unauthorized";
import { nanoid } from "@reduxjs/toolkit";
import WatermarkNavItem from "./components/WatermarkNavItem";
import EditorNavSidebar from "./components/EditorNavSidebar";

const NavBar = () => {
  const router = useRouter();

  const [logIn, setLogIn] = useState(false);
  const [userImageUrl, setUserImageUrl] = useState("");
  const [userName, setUserName] = useState("");
  const { data: session } = useSession();
  const dispatch = useDispatch();
  // Get user information
  const { data: user, isSuccess } = useGetUserQuery();
  const {
    data: token,
    isFetching,
    isSuccess: tokenLoaded,
  } = useGetAdminQuery();
  const [uuid, setUuid] = useState("");

  const role = token?.data?.roles[0].name;

  useEffect(() => {
    if (isSuccess && user) {
      setUuid(user?.data?.uuid);

      setLogIn(true);
      dispatch(setCurrentUser(user));
      const { avatarUrl, familyName, givenName } = user?.data;

      setUserImageUrl(avatarUrl);
      setUserName(` ${givenName} ${familyName}`);
    } else if (session) {
      console.log("object not found");
      setLogIn(true);
      console.log("user already logged in", session);
      setUserImageUrl(session?.user?.image);
      setUserName(session?.user?.name);
    }
  }, [dispatch, isSuccess, user, session]);
  console.log("username and image", userName, userImageUrl);
  const logouts = async () => {
    dispatch(logout());
    await signOut({ redirect: false });
    router.push("/");
    window.location.reload();
  };
  // end of auth config
  const { theme, setTheme } = useTheme();

  const handleWatermarkClick = () => {
    // router.push({ pathname: 'https://photostad-editor.vercel.app/watermark', query: { uuid } });
    window.open(`https://photostad-editor.vercel.app/?watermark?${uuid}`, "_blank");
  };
  const handleCertificateClick = () => {
    window.open(`https://photostad-editor.vercel.app/?presentation?${uuid}`, "_blank");
  };
  //disable in auth part
  const pathName = usePathname();
  if (pathName.includes("/login")) {
    return null;
  }

  if (pathName.includes("/signup")) return null;
  if (pathName.includes("/sendmail")) return null;
  if (pathName.includes("/admin")) return null;
  if (pathName.includes("/dashboard")) return null;
  if (pathName.includes("/otp-verification")) return null;
  if (pathName.includes("/resetpassword")) return null;

  return (
    <div className="navbar navbar-no-boxShadow h-[80px] bg-white dark:bg-[#1e1e1e] sticky top-0 z-50 ">
      <div className="px-5 navbar navbar-no-boxShadow bg-white  sticky top-0 z-50 dark:bg-[#1e1e1e] w-full xl:w-[1290px] mx-auto max-sm:px-5">
        <div className="navbar-start">
          <Link href={"/"}>
            {theme === "dark" ? (
              <Image
                height={50}
                width={131}
                className="md:w-[131px] w-[100px]"
                src="/assets/image/mainlogov2.png"
                alt="logo img"
              />
            ) : (
              <Image
                height={50}
                width={131}
                className="md:w-[131px] w-[100px]"
                src="/assets/image/mainlogo-blackv2.png"
                alt="logo dark img"
              />
            )}
          </Link>
        </div>
        <div className="navbar-center hidden  gap-5 lg:flex">
          <Link
            href={"/"}
            className=" hover:text-black dark:hover:text-white text-black dark:text-white"
          >
            Home
          </Link>
          {/* route and attatched value to react js  */}
          {user || session ? (
            <Link href={"#"}>
              <span
                onClick={handleWatermarkClick}
                className=" hover:text-black dark:hover:text-white text-black dark:text-white"
              >
                Watermark
              </span>
            </Link>
          ) : (
            <WatermarkNavItem title={"Watermark"} />
          )}
          {user || session ? (
            <Link href={"#"}>
              <span
                onClick={handleCertificateClick}
                className=" hover:text-black dark:hover:text-white text-black dark:text-white"
              >
                Certificate
              </span>
            </Link>
          ) : (
            <WatermarkNavItem title={"Certificate"} />
          )}

          <Link
            href={"/aboutus"}
            className=" hover:text-black dark:hover:text-white text-black dark:text-white whitespace-nowrap"
          >
            About Us
          </Link>

          {/* {role !== "SUBSCRIBER" && role !== "GUEST" && user ? (
            <Link
              href={"/admin/dashboard"}
              className="hover:text-black dark:hover:text-white text-black dark:text-white whitespace-nowrap"
            >
              Dashboard
            </Link>
          ) : (
            ""
          )} */}
        </div>
        <div className="navbar-end gap-3">
          <BtnThemeToggle />

          {user || session ? (
            <>
              <div class="dropdown">
                {/* <label class="btn btn-solid-primary my-2" tabIndex="0">Click</label> */}
                <div
                  tabIndex="0"
                  className="md:w-10 md:h-10   w-7 h-7 avatar avatar-ring-primary"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
              
                  
                    src={session ? session?.user?.image : userImageUrl}
                    alt={"profile picture"}
                  />
                </div>
                <div class="dropdown-menu bg-white dark:bg-slate-900 dark:text-white text-black dropdown-menu-bottom-left">
                  <Link
                    href={"/profile/setting"}
                    className="dropdown-item text-sm hover:text-black hover:bg-gray-400"
                  >
                  {session ? session?.user?.name : userName}
                  </Link>
                  <Link
                    tabIndex="-1"
                    href={"/profile/setting"}
                    className="dropdown-item text-sm hover:text-black hover:bg-gray-400"
                  >
                    Settings
                  </Link>
                  {/* <Link
                    tabIndex="-1"
                    href={"/admin/dashboard"}
                    className="dropdown-item text-sm hover:text-black hover:bg-gray-400"
                  >
                    Dashboard
                  </Link> */}
                  {role !== "SUBSCRIBER" && role !== "GUEST" && user ? (
                    <Link
                      href={"/admin/dashboard"}
                      className="dropdown-item text-sm hover:text-black hover:bg-gray-400"
                    >
                      Dashboard
                    </Link>
                  ) : (
                    ""
                  )}
                  <button
                    className="py-2 bg-red text-white rounded-main hover:bg-red dark:text-white"
                    onClick={() => {
                      logouts();
                    }}
                  >
                    Log out
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              <Link
                href={"/login"}
                className=" 
                bg-red hidden md:block text-white font-[35px] text-center py-2  rounded-[16px] w-[88px]  text-[17px]"
              >
                Log in
              </Link>
              <Link
                href={"/signup"}
                className=" 
                  bg-red hidden md:block text-white font-[35px] text-center py-2  rounded-[16px] w-[88px]  text-[17px]"
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* drobdown responsive */}
        <div className="dropdown block lg:hidden ml-3">
          <label tabIndex="0">
            <LiaBarsSolid className="text-black bg-white dark:bg-slate-900 dark:text-white text-xl " />
          </label>
          <div className="dropdown-menu dropdown-menu-bottom-left text-black bg-white dark:bg-slate-900 dark:text-white">
            {user || session ? (
              <Link
                href={"/profilesetting"}
                className="dropdown-item text-sm hover:text-black hover:bg-gray-400"
              >
                Profile
              </Link>
            ) : null}

            <Link
              href={"/"}
              tabIndex="-1"
              className="dropdown-item text-sm hover:text-black hover:bg-gray-400"
            >
              Home
            </Link>
            {/* <Link
              href={"https://photostad-editor.vercel.app/watermark"}
              tabIndex="-1"
              className="dropdown-item text-sm hover:text-black hover:bg-gray-400"
            >
              Watermark
            </Link>
            <Link
              href={"https://photostad-editor.vercel.app/generatecertificate"}
              tabIndex="-1"
              className="dropdown-item text-sm hover:text-black hover:bg-gray-400"
            >
              Certificate
            </Link> */}

            {user || session ? (
              <Link href={"#"}>
                <span
                  onClick={handleWatermarkClick}
                  className="dropdown-item text-sm hover:text-black hover:bg-gray-400"
                >
                  Watermark
                </span>
              </Link>
            ) : (
              <EditorNavSidebar title={"Watermark"} />
            )}
            {user || session ? (
              <Link href={"#"}>
                <span
                  onClick={handleCertificateClick}
                  className="dropdown-item text-sm hover:text-black hover:bg-gray-400"
                >
                  Certificate
                </span>
              </Link>
            ) : (
              <EditorNavSidebar title={"Certificate"} />
            )}
            <Link
              href={"/aboutus"}
              tabIndex="-1"
              className="dropdown-item text-sm hover:text-black hover:bg-gray-400"
            >
              About Us
            </Link>

            <Link
              href={"/login"}
              tabIndex="-1"
              className={`dropdown-item text-sm hover:text-black hover:bg-gray-400 ${
                user ? "hidden" : ""
              }`}
            >
              Log in
            </Link>
            <Link
              href={"/signup"}
              tabIndex="-1"
              className={`dropdown-item text-sm hover:text-black hover:bg-gray-400 ${
                user ? "hidden" : ""
              }`}
            >
              Register
            </Link>
            {user || session ? (
              <Link
                href={"profile/setting"}
                tabIndex="-1"
                className="dropdown-item text-sm hover:text-black hover:bg-gray-400"
              >
                Setting
              </Link>
            ) : null}
            {role !== "SUBSCRIBER" && role !== "GUEST" && user ? (
              <Link
                href={"/admin/dashboard"}
                className="dropdown-item text-sm hover:text-black hover:bg-gray-400"
              >
                Dashboard
              </Link>
            ) : (
              " "
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
