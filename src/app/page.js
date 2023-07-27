"use client";
import Image from "next/image";

import Link from "next/link";
import { use, useEffect, useState } from "react";
import ButtonComponent from "@/components/button/ButtonComponent";
import FormREQ from "@/components/home/FormREQ";
import { motion } from "framer-motion";
import { useGetUserQuery } from "@/store/features/user/userApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { setRoles } from "@/store/features/role/roleSlice";
import { useSession } from "next-auth/react";
import TutorialContent from "@/components/tutorialcontents";
import { setCredentials, setCurrentUser } from "@/store/features/auth/authSlice";
import { useLoginMutation, useRegisterWithGoogleMutation } from "@/store/features/auth/authApiSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SAMPLE_FAQ } from "@/components/util/SampleFaq";
import { useGetRoleQuery } from "@/store/features/role/roleApiSlice";
import RequestForm from "@/components/home/RequestTutorial";

const imageBanner = "/assets/image/home/home-banner.png";
const imageWatermark = "/assets/image/home/watermark-photo.png";
const imagecertificate = "/assets/image/home/certificate-photo.png";

//color bg
const darkBACKGROUND = " dark:bg-slate-950 ";
const lightBackground = " bg-white ";

//padding section
const paddingSection = " pb-20 ";

export default function Home() {
  const dispatch = useDispatch();
  const { data: session } = useSession();
  const {data:user} = useGetUserQuery()
  const [registerWithGoogle] = useRegisterWithGoogleMutation()
  const [signIn, { isLoading, isSuccess:looginIn }] = useLoginMutation();
  // const [login] = useLoginMutation();
  // console.log(user?.data?.uuid,"user in home page");
useEffect(()=>{
  if(looginIn){
    toast.success("Login Success")
  }
},[looginIn])

  useEffect(() => {
    if(user){
      dispatch(setCurrentUser(user));
    } 
  },[user,dispatch]);
  const da  = useSelector((state) => state)
  
// need token in order to fetch roles
  const {data}= useGetRoleQuery({token:da?.auth?.accessToken})
  console.log(data,"role data");

  //description Tutorials
  const [showMore, setShowMore] = useState(false);
  const [showMore_one, setShowMore_one] = useState(false);
  const toggleText = () => {
    setShowMore(!showMore);
  };
  const toggleText_one = () => {
    setShowMore_one(!showMore_one);
  };
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };
  console.log(user,"user tah vea ey te");
  return (
    <main
      className={
        darkBACKGROUND + lightBackground + "flex flex-col items-center"
      }
    >
       <section
       id="home-banner"
        className={
          paddingSection +
          lightBackground +
          darkBACKGROUND +
          "xl:w-[1290px] flex   justify-between pt-14 max-sm:px-5 max-sm:pt-7 md:px-5 max-md:px-5 "
        }
      >
        <div className="pt-16  ps-5 max-sm:pt-4">
          <motion.h3
            className="font-bold hover:text-[#E85854]  leading-relaxed tracking-wider  text-[#222] dark:text-[#ffff] pb-5 max-sm:hidden max-sm:pb-5"
            initial={{ x: -30, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.8 }}
          >
            GET YOUR DESIGNS NOW
          </motion.h3>
          <motion.h1
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          
            // className="pb-5 font-extrabold text-5xl leading-11 max-sm:leading-normal text-[#222] dark:text-[#ffff]   max-sm:pb-5 max-md:text-[30px] md:text-[40px] "
            className= "text-4xl  mb-5 font-bold text-black dark:text-white leading-10"
          >
            Brand your pictures with the free watermark and generate your documents with the better solution.
          </motion.h1>
          <motion.p
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{
              duration: 0.8,
              delay: 0.8,
            }}
            className="pb-5 text-lg text-[#222] dark:text-[#fff] max-sm:hidden max-md:hidden"
          >
            Level up your content with customizeable watermarks and create
            stunning <br/> certificates effortlessly on our website.
          </motion.p>
          <motion.div
            initial={{ x: -100, opacity: 0, scale: 0.5 }}
            whileInView={{ x: 0, opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Link href="#ourservice" className="">
              <button
                type="button"
                class={
                  " focus:outline-none text-white bg-[#E85854] hover:bg-red focus:ring-4 focus:ring-red-300 rounded-[16px] text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red dark:hover:bg-red dark:focus:ring-red-900 max-sm:text-[10px] max-sm:py-[5px] max-sm:px-[10px] max-sm:items-center max-sm:mb-0"
                }
              >
                <p  className="mx-5 text-lg">Get Started</p>
              </button>
            </Link>
          </motion.div>
        </div>
        <motion.img
          alt="banner"
          id="img-banner"
          
          src={imageBanner}
          width={586}
          height={484}
          className="lg:w-[586px] lg:h-[484px] top-5 md:w-[300px] max-sm:w-[150px]  max-sm:h-[150px] max-md:h-[300px] max-md:w-[300px] md:h-[300px] md:pt-2  "
          initial={{ x: 23, opacity: 0, scale: 0.5 }}
          whileInView={{ x: 0, opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        />
      </section>
      <section
        class={
          paddingSection +
          lightBackground +
          darkBACKGROUND +
          "xl:w-[1290px] w-full  max-sm:px-5 px-5  "
        }
      >
        <div id="ourservice" className=" max-sm:p-0">
          <motion.h1
            initial={{ y: 80, opacity: 0, scale: 0.5 }}
            whileInView={{ y: 0, opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 1, delay: 2 }}
            className="text-center pb-14 text-5xl font-bold dark:text-white text-slate-950 max-sm:text-[24px]"
          >
            Our Services
          </motion.h1>
          <div className="flex flex-wrap  max-sm:flex-col justify-between">
            <motion.div
              initial={{ x: -20, opacity: 0, scale: 0.5 }}
              whileInView={{
                x: 0,
                rotate: [90, -90, 180, 0],
                opacity: 1,
                scale: 1,
              }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{
                type: "spring",
                bounce: 0.4,
                duration: 4,
              }}
              className="lg:w-[49%] w-[90%] p-10 watermark   flex max-sm:w-full max-sm:p-4 mb-[18px] md:w-full max-md:w-full "
            >
              <div className="">
                <h2 className="text-3xl text-[#222] dark:text-white font-bold max-sm:text-[20px] ">
                  Watermark
                </h2>
                <p className=" py-10 max-sm:text-[14px] max-sm: dark:text-white max-sm:py-0 max-sm:pb-[15px]">
                A watermark is a special mark on a picture or document to show who made it and protect it from being copied without permission. It is like a signature to keep things safe and give credit to the original creator.
                </p>
                <ButtonComponent
                  name="Edit Watermark"
                  goto="https://photostad-editor.vercel.app/watermark"
                  type="button"
                  isBold={true}
                />
              </div>
              <Image
                alt="water mark"
                src={imageWatermark}
                width={200}
                height={200}
                className="max-sm:w-[150px]  max-sm:h-[150px]  md:w-[250px] md:h-[250px] max-md:w-[250px] max-md:h-[250px]"
              />
            </motion.div>

            <motion.div
              initial={{ x: 20, opacity: 0, scale: 0.5 }}
              whileInView={{
                x: 0,
                rotate: [90, -90, 180, 0],
                opacity: 1,
                scale: 1,
              }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{
                type: "spring",
                bounce: 0.4,
                duration: 4,
              }}
              className="lg:w-[49%] w-[90%]  certificate p-10 flex max-sm:w-full max-sm:p-4 mb-[18px] md:w-full max-md:w-full  "
            >
              <div className="">
                <h2 className="text-3xl text-[#222] dark:text-white font-bold  max-sm:text-[20px]">
                  Certificate
                </h2>
                <p className="dark:text-white py-10 max-sm:text-[14px]  max-sm:py-0 max-sm:pb-[15px]">
                Certificates are official papers that prove achievements, like completing a course or reaching a special goal. They celebrate hard work and success, with names, titles, and signatures making them official.
                </p>
                <ButtonComponent
                  name="Edit Certificate"
                  goto="https://photostad-editor.vercel.app/generatecertificate"
                  type="button"
                  isBold={true}
                />
              </div>
              <Image
                alt="certificate"
                src={imagecertificate}
                width={200}
                height={200}
                className="max-sm:w-[150px]  max-sm:h-[150px] md:w-[250px] md:h-[250px] max-md:w-[250px] max-md:h-[250px]"
              />
            </motion.div>
          </div>
        </div>
      </section>
      <section
        class={
          paddingSection +
          lightBackground +
          darkBACKGROUND +
          "xl:w-[1290px] max-sm:px-5 sm:mt-0 px-5"
        }
      >
        <motion.h1
          className="text-center pb-14 text-5xl font-bold  text-slate-950 dark:text-[#fff] max-sm:text-[24px] "
          initial={{ y: 80, opacity: 0, scale: 0.5 }}
          whileInView={{ y: 0, opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1 }}
        >
          Tutorials
        </motion.h1>
        <div className="flex gap-5  justify-between pb-[20px] max-sm:flex-col">
          <motion.div
            initial={{ x: -20, opacity: 0, scale: 0.5 }}
            whileInView={{
              x: 0,
              rotate: [-50, 50, -180, 0],
              opacity: 1,
              scale: 1,
            }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{
              type: "spring",
              bounce: 0.4,
              duration: 4,
            }}
            className="lg:w-1/2 w-[90%]  max-sm:w-full max-sm:h-[200px]"
          >
            <iframe
              className="rounded-[26px] max-sm:mb-[18px]"
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/nJq4F7t30r8"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
            ></iframe>
          </motion.div>
          <motion.div
            initial={{ x: -20, opacity: 0, scale: 0.5 }}
            whileInView={{
              x: 0,
              rotate: [-50, 50, -180, 0],
              opacity: 1,
              scale: 1,
            }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{
              type: "spring",
              bounce: 0.4,
              duration: 4,
            }}
            className="lg:w-1/2 w-[90%] p-10 bg-[#e9e8e8] rounded-[26px] max-sm:w-full max-sm:p-4"
          >
            <h2 className="text-3xl text-[#111] font-bold max-sm:text-[20px]  max-sm:text-center max-sm:leading-[25px]">
              Add Custom Watermark to Photos in 4 minute
            </h2>
            <p className="py-10 text-[#333] max-sm:pt-[15px] max-sm:text-[14px] max-sm:pb-[20px] ">
              Watermark photos right in your browser. Add custom ​​watermarks
              with your logo and text. Make multi-part watermarks. Add
              transparent and opaque watermarks
              {showMore_one ? (
                <>
                  .Resize photos before publishing online. Import photos from
                  your computer, Google Drive or Dropbox. Instant uploads and
                  downloads. Watermark pictures without waiting in line. Use it
                  for free with optional paid options.
                </>
              ) : (
                <span id="dots">...</span>
              )}
            </p>
            <button
              onClick={toggleText_one}
              className="focus:outline-none text-white bg-[#E85854] hover:bg-red focus:ring-4 focus:ring-red rounded-[16px] text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red dark:hover:bg-red dark:focus:ring-red max-sm:text-[10px] max-sm:py-[5px] max-sm:px-[10px] max-sm:items-center max-sm:mb-0"
            >
              {showMore_one ? "Read less" : "Read more..."}
            </button>
          </motion.div>
        </div>
        <div className="flex justify-between max-sm:flex-col-reverse">
          <motion.div
            className="w-[49%] p-10 bg-[#e9e8e8]  rounded-[26px] max-sm:w-full max-sm:p-4"
            initial={{ x: -20, opacity: 0, scale: 0.5 }}
            whileInView={{
              x: 0,
              rotate: [-50, 50, -180, 0],
              opacity: 1,
              scale: 1,
            }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{
              type: "spring",
              bounce: 0.4,
              duration: 4,
            }}
          >
            <h2 className="text-3xl text-[#111] font-bold max-sm:text-[20px]  max-sm:text-center max-sm:leading-[25px]">
              Generate Certificate in 7 minutes
            </h2>
            <p className="py-10 text-[#333] max-sm:pt-[15px] max-sm:text-[14px] max-sm:pb-[20px]">
              Start by designing a certificate template that includes relevant
              information such as the recipient name, the title of the
              certificate, the issuing organization name and logo
              {showMore ? (
                <>
                  , a description of the achievement, and any additional details
                  you want to include. This template can be created using
                  graphic design software or online certificate design tools.
                </>
              ) : (
                <span id="dots">...</span>
              )}
            </p>
            <button
              onClick={toggleText}
              className="focus:outline-none text-white bg-[#E85854] hover:bg-red-800 focus:ring-4 focus:ring-red-300 rounded-[16px] text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 max-sm:text-[10px] max-sm:py-[5px] max-sm:px-[10px] max-sm:items-center max-sm:mb-0"
            >
              {showMore ? "Read less" : "Read more..."}
            </button>
          </motion.div>

          <motion.div
            className="w-[49%] max-sm:w-full"
            initial={{ x: -20, opacity: 0, scale: 0.5 }}
            whileInView={{
              x: 0,
              rotate: [-50, 50, -180, 0],
              opacity: 1,
              scale: 1,
            }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{
              type: "spring",
              bounce: 0.4,
              duration: 4,
            }}
          >
            <iframe
              className="rounded-[26px] max-sm:mb-[18px] max-sm:h-[200px]"
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/jhittfBWsKM"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
            ></iframe>
          </motion.div>
        </div>
      </section>
      <section
        className={
          paddingSection + lightBackground + darkBACKGROUND + "xl:w-[1290px] "
        }
      >
         <motion.h1
          className="text-center pb-14 text-5xl font-bold  dark:text-white text-slate-950"
          initial={{ y: 80, opacity: 0, scale: 0.5 }}
          whileInView={{ y: 0, opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1 }}
        >
          FAQ
        </motion.h1>
        {/* test */}
        <nav className="menu  rounded-main w-[90%] md:w-full mx-auto">
          <section className="menu-section rounded-main">
            <ul className="menu-items">
              {
                SAMPLE_FAQ.map((q,index)=>(
                  <li key={index}>
                  <input type="checkbox" id={`menu-${index+2}`} className="menu-toggle" />
                  <label
                    className="menu-item   py-4 rounded-main hover:bg-gray-300 dark:bg-slate-900"
                    htmlFor={`menu-${index+2}`}
                  >
                    <span className="menu-icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        className="w-4 h-4 stroke-content3"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M8.25 4.5l7.5 7.5-7.5 7.5"
                        />
                      </svg>
                    </span>
                    <span className="text-black dark:text-white ">
                     {q.question}
                    </span>
                  </label>
  
                  <div className="menu-item-collapse">
                    <div className="min-h-0">
                      <label className="menu-item  text-black dark:text-white hover:bg-gray-300 ms-6  py-4 rounded-main dark:hover:bg-slate-900">
                      {q.answer}
                      </label>
                    </div>
                  </div>
                </li>

                ))
              }
             
            </ul>
          </section>
        </nav>
      </section>

      {/* tutorial content */}
      {/* <section>
	<TutorialContent />
</section> */}

      {/* tutuorial req */}
      <section className="xl:w-[1290px] w-full px-5 mb-5  ">
      <motion.h1
          className="text-center max-sm:text-[24px] pb-14  text-5xl font-bold dark:text-white text-slate-950"
          initial={{ y: 80, opacity: 0, scale: 0.5 }}
          whileInView={{ y: 0, opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1 }}
        >
          Tutorials Request
        </motion.h1>
        <ToastContainer />
        {/* <FormREQ /> */}
        <RequestForm uuid={user?.data?.uuid}  />
      </section>
    </main>
  );
}