"use client";
import React, { useEffect, useState } from "react";
import { BsFacebook, BsTelegram, BsFillTelephoneFill } from "react-icons/bs";
import {
  FaFacebook,
  FaInstagramSquare,
  FaTelegram,
  FaYoutube,
} from "react-icons/fa";
import { AiFillHome, AiFillInstagram, AiFillYoutube } from "react-icons/ai";
import { GiRotaryPhone } from "react-icons/gi";

import { MdEmail } from "react-icons/md";
import { FaRegCopyright } from "react-icons/fa";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useSession } from "next-auth/react";
import { useGetUserQuery } from "@/store/features/user/userApiSlice";
import WatermarkNavItem from "../nav/components/WatermarkNavItem";
import FooterItemService from "./components/FooterItemService";


const MainFooter = () => {
  const [uuid, setUuid] = useState("");
  
  const pathName = usePathname();
  const { data: session } = useSession();
  const { data: user, isSuccess } = useGetUserQuery();
  
  
  // theme
  const { theme, setTheme } = useTheme();

  useEffect(()=>{
    if(user){
      setUuid(user?.data?.uuid);
    }
  },[user])
  const handleWatermarkClick = () => {
    // router.push({ pathname: 'https://photostad-editor.vercel.app/watermark', query: { uuid } });
    window.open(
      `http://127.0.0.1:5173/watermark?${uuid}`,
      "_blank"
    );
  };
  const handleCertificateClick = () => {
    window.open(
      `http://127.0.0.1:5173/generatecertificate?${uuid}`,
      "_blank"
    );
  };



 

  if (pathName.includes("/login")) {
    return null;
  }
  if (pathName.includes("/signup")) return null;
  if (pathName.includes("/dashboard")) return null;
  if (pathName.includes("/dashboard/*")) return null;
  if (pathName.includes("/sendemail")) return null;
  if (pathName.includes("/otp-verification")) return null;
  if (pathName.includes("/resetpassword")) return null;
  return (
    <div className="bg-white   dark:bg-[#1e1e1e]">
      <footer>
        <div className=" dark:bg-[#1e1e1e] dark:text-white place-items-center md:flex md:px-5 md:justify-between md:items-start text-center md:text-start py-10 bg-white text-base-content w-full xl:w-[1290px] mx-auto ">
          <div className="place-items-center  md:place-items-start flex flex-col justify-center max-sm:mb-3">
            <p className="font-bold text-black dark:text-white text-3xl mb-5 ">
              PhotoSTAD
            </p>
            <Link href={"/"}>
              {theme === "light" ? (
                <Image
                  width={131}
                  height={131}
                  className="md:w-[131px] w-[100px]"
                  src="/assets/image/mainlogo-blackv2.png"
                  alt="logo img"
                />
              ) : (
                <Image
                  width={131}
                  height={131}
                  className="md:w-[131px] w-[100px]"
                  src="/assets/image/mainlogov2.png"
                  alt="logo dark img"
                />
              )}
            </Link>
            <p className="w-[253px] mt-3 dark:text-white text-black">
              Here you can use for custom image and generate certificate.
            </p>
          </div>

          <div className="place-items-center md:place-items-start flex justify-center space-y-2 flex-col max-sm:mb-3">
            <div className="font-bold text-black dark:text-white mb-4">
              PRODUCTS
            </div>
            <Link
              href={"/"}
              className="link link-underline-hover hover:text-black dark:hover:text-white text-black dark:text-white"
            >
              Home
            </Link>
            <Link
            //if
              href={"/profile/setting"}
              className={`${!user || !session ? 'hidden' : ''} link link-underline-hover hover:text-black dark:hover:text-white  text-black dark:text-white`}
            >
              Setting
            </Link>

            <Link
              href={"/aboutus"}
              className="link link-underline-hover hover:text-black dark:hover:text-white text-black dark:text-white"
            >
              About Us
            </Link>
          </div>

          <div className="place-items-center md:place-items-start flex flex-col space-y-2 justify-center max-sm:mb-3">
            <span className="font-bold text-black dark:text-white mb-4">
              USEFUL LINKS
            </span>
            {/* <Link
              href={"https://photostad-editor.vercel.app/watermark"}
              className="link link-underline-hover hover:text-black dark:hover:text-white text-black dark:text-white"
            >
              Certificate
            </Link> */}
            {user || session ? (
            <Link href={"#"}>
              <span
                onClick={handleWatermarkClick}
                className=" hover:text-black dark:hover:text-white text-black dark:text-white"
              >
                Certificate
              </span>
            </Link>
          ) : (
            <FooterItemService title={"Certificate"} />
          )}
            {user || session ? (
            <Link href={"#"}>
              <span
                onClick={handleWatermarkClick}
                className="link link-underline-hover hover:text-black dark:hover:text-white text-black dark:text-white"
              >
                Watermark
              </span>
            </Link>
          ) : (
            <FooterItemService title={"Watermark"} />
          )}
            {/* <Link
              href={"https://photostad-editor.vercel.app/watermark"}
              target="_blank"
              className="link link-underline-hover text-black dark:text-white hover:text-black dark:hover:text-white"
            >
              Watermark
            </Link> */}
            <Link
              href={"/profile/setting"}
              className={`${!user || !session ? 'hidden' : ''} link link-underline-hover hover:text-black dark:hover:text-white  text-black dark:text-white`}
            >
              Account
            </Link>
          </div>

          <div className="place-items-center md:place-items-start flex space-y-2 flex-col justify-center ">
            <span className="font-bold text-black dark:text-white mb-4">
              CONTACT US
            </span>
            <a
              href={
                "https://www.google.com/maps/dir//Science+and+Technology+Advanced+Development+Co.,+Ltd.,+St+562,+Phnom+Penh+12151/@11.578557,104.9015464,19z/data=!4m8!4m7!1m0!1m5!1m1!1s0x310951e96d257a6f:0x6b66703c5fc0c7cc!2m2!1d104.9017868!2d11.5782546?entry=ttu"
              }
              target="_blank"
              className="link link-underline-hover text-black dark:text-white hover:text-black dark:hover:text-white"
            >
              {" "}
             <span> <AiFillHome className="inline me-2 hover:text-black dark:hover:text-white" />
              No. 24, St. 562, Sangkat Boeung kak I, <br /><span className="ms-6"> Khan Toul Kork, Phnom Penh, </span><br className="hidden max-sm:block"/> Cambodia</span>
            </a>
            <a
              href={"mailto: service.istad@gmail.com "}
              className="link link-underline-hover text-black dark:text-white hover:text-black dark:hover:text-white"
            >
              {" "}
              <MdEmail className="inline me-2" /> service.istad@gmail.com
            </a>
            <a
              href={"tel: +885 812661909"}
              className="link link-underline-hover text-black dark:text-white hover:text-black dark:hover:text-white"
            >
              {" "}
              <BsFillTelephoneFill className="inline me-2" />(+855) 92 655-182 / 81 266-1909
            </a>
            <a
              href={"tel: +885 93 990-910"}
              className="link link-underline-hover text-black dark:text-white hover:text-black dark:hover:text-white"
            >
              {" "}
              <GiRotaryPhone className="inline me-2 text-[20px]" />
              (+855) 95/93 990-910
            </a>
          </div>
        </div>{" "}
        <hr />
        <div className="flex flex-wrap justify-center  lg:justify-between py-4  max-md:flex-col w-[90%] xl:w-[1290px] mx-auto mt-1 dark:text-white font-bold">
          <p
            className={
              "text-[12px] max-md:mb-3 max-md:text-center md:text-xl text-black dark:text-white"
            }
          >
            {" "}
            <FaRegCopyright className="inline text-black dark:text-white" />{" "}
            2023 PhotoSTAD from{" "}
            <Link
              className="link link-underline-hover text-black dark:text-white  dark:hover:text-white font-bold max-lg:text-xl hover:text-[#e85854]"
              href={"https://istad.co/"}
            >
              ISTAD{" "}
            </Link>{" "}
            | All Rights Reserved
          </p>
          <div className="flex space-x-3 items-center cursor-pointer justify-center text-[30px] text-black dark:text-white">
            <Link href={"https://web.facebook.com/istad.co"} target="_blank">
              <FaFacebook />
            </Link>
            <Link href={"https://www.youtube.com/@istad7665"} target="_blank">
              {" "}
              <img
                alt="yt icon"
                src={"https://cdn-icons-png.flaticon.com/512/1384/1384012.png"}
                className={"w-[30px] dark:invert"}
              />{" "}
            </Link>
            <Link href={"https://t.me/istadkh"} target="_blank">
              {" "}
              <FaTelegram />{" "}
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainFooter;
