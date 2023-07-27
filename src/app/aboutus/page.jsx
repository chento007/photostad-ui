"use client"
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BsFacebook, BsGithub } from "react-icons/bs";
import { TbWorld } from "react-icons/tb";
import Mentor from "./components/Mentor";
import FormSaveContactUs from "./components/FormSaveContactUs";

// export const metadata = {
//   title: " PhotoSTAD | ABOUT US",
//   description: " PhotoSTAD is platform that provide watermark and certificate",
// };
const Page = () => {





  return (
    <div className="dark:bg-black bg-white ">
      <div className="flex pt-20 px-5 justify-between flex-wrap mx-auto w-full xl:w-[1290px] ">
        {/* title about */}
        <div className="title-about w-[90%]   mb-5 space-y-3 md:space-y-6 lg:space-y-12 md:w-1/2">
          <h1 className=" title-about-1 lg:text-[40px] text-2xl md:text-[30px] font-medium dark:text-white text-black ">
            ABOUT
          </h1>
          <h1 className="title-about-2 text-3xl lg:text-[80px] xl:my-10 md:text-[50px] font-black text-[#e85854]">
            {" "}
            PhotoSTAD
          </h1>
          {/* description */}
          <p className=" lg:text-[20px]   text md:text-[16px] dark:text-white text-black ">
            With our easy-to-use watermark maker and certificate <br />
            generator, you can create professional-looking <br />
            watermarks and certificates in seconds. Enhance your <br />
            love identity with our customization watermarks and <br />{" "}
            certificates.
          </p>
        </div>
        {/* image of about */}
        <div className="w-full mx-auto  md:w-[45%] h-full md:flex items-center justify-center">
          <img src="/assets/image/about.png" alt="images not fonud" />
        </div>
      </div>
      <main className="mt-32 xl:w-[1290px] w-full px-5 mx-auto ">
        {/* title second */}
        <article className="text-center w-full p-2.5">
          <h1 className="title-about-3 text-[36px] font-black mb-8 dark:text-white text-black">
            WHO WE ARE
          </h1>
          <p className="para-2 text-center text-[17px] dark:text-white text-black">
            PhotoSTAD is one of the final project that was build by a group of
            ISTAD student. PhotoSTAD is a cutting-edge print shop that offers{" "}
            <br />
            a state-of-the-art watermark maker,enabling photographers to protect
            their valuable images from unauthorized use.Additionally
            <br />
            PhotoSTAD provides a powerful certificate generator,allowing
            professionals to create authentic certificates for their artwork and{" "}
            <br />
            establish credibility in the industry
          </p>
        </article>

        {/* Mentor */}
        <Mentor />
        {/* end mentor */}

        {/* title meet out team */}
        <div className="mt-32 ">
          <h1 className="title-about-4 text-[36px] font-black text-center text-black dark:text-white">
            MEET OUR TEAM
          </h1>
          <div className="flex justify-center mt-8">
            <div className=" bg-red-500 hover:bg-red-800 px-5 h-2 w-2 rounded-md"></div>
          </div>
        </div>
        {/*    /!* Card Numbers *!/*/}
        <div>
          <div className="mt-24  w-full mx-auto ">
            {/* cart-1 */}
            <div className="mt-[90px] md:flex flex-col md:space-x-5 md:flex-row  lg:flex-row">
              <div className="flex max-sm:justify-center max-sm:m-auto">
                <Image
                  width={277}
                  height={277}
                  className="lg:w-[277px] lg:h-[277px] md:w-[270px] md:h-[250px] max-sm:w-[250px] max-sm:h-[250px]  object-cover  rounded-full  "
                  src="/assets/image/aboutus/chento.JPG"
                  alt="Modern building architecture"
                  loading="lazy"
                />
              </div>
              <div className="max-sm:m-3 md:w-[70%] max-sm:flex max-sm:justify-center md:mx-auto md:rounded-l-none md:shadow-md md:max-w-2xl">
                <div className=" max-sm:shadow-md max-sm:overflow-hidden max-sm:max-w-2xl rounded-xl p-8">
                  <h1 className=" tracking-wide font-bold text-black dark:text-white text-[23px] mb-2">
                    Chea Chento
                  </h1>
                  <p className="block mt-1  leading-tight font-light text-black dark:text-white text-[17px] mb-2">
                    Back-End Developer
                  </p>
                  <div className="mt-4">
                    <div className=" bg-red-500 hover:bg-red-800 px-24 h-2 w-2 rounded-md mb-2"></div>
                  </div>
                  <div className="flex mt-4 ">
                    <Link
                      href="https://www.facebook.com/profile.php?id=100011596444565"
                      className="text-[30px] dark:text-white mr-5 md:text-[25px]"
                    >
                      <span className="">
                        <BsFacebook className="text-black dark:text-white" />
                      </span>
                    </Link>
                    <Link
                      href="https://github.com/chento007"
                      className="text-[30px] dark:text-white  mr-5 md:text-[25px]"
                    >
                      <span>
                        <BsGithub className="text-black dark:text-white" />{" "}
                      </span>
                    </Link>
                    <Link
                      href="https://github.com/chento007"
                      className="text-[33px] dark:text-white  md:text-[25px]"
                    >
                      <span>
                        <TbWorld className="text-black dark:text-white" />{" "}
                      </span>
                    </Link>
                  </div>

                  <p className="mt-6 dark:text-white text-slate-500 md:mt-2">
                    The only person you should try to be better than is the
                    person you were yesterday
                  </p>
                </div>
              </div>
            </div>

            {/* card-2 */}
            <div className="mt-[90px] md:space-x-5 md:flex ms:flex-col lg:flex-row-reverse ">
              <div className="flex max-sm:justify-center max-sm:m-auto ">
                <Image
                  width={277}
                  height={277}
                  loading="lazy"
                  className="lg:w-[277px] pl-0 lg:pl-3 lg:h-[277px] md:w-[270px] md:h-[250px] max-sm:w-[250px] max-sm:h-[250px]  object-cover  rounded-full  "
                  src="/assets/image/aboutus/setha.JPG"
                  alt="Modern building architecture"
                />
              </div>
              <div className="max-sm:m-3 md:w-[70%] max-sm:flex max-sm:justify-center md:mx-auto md:rounded-l-none md:shadow-md md:max-w-2xl">
                <div className=" max-sm:shadow-md max-sm:overflow-hidden max-sm:max-w-2xl rounded-xl p-8">
                  <h1 className=" tracking-wide   font-bold text-[23px] text-black dark:text-white mb-2">
                    Cheat Setha
                  </h1>
                  <p className="block mt-1  leading-tight font-light text-black dark:text-white text-[17px] mb-2">
                    {" "}
                    Font-end Developer
                  </p>
                  <div className="mt-4">
                    <div className=" bg-red-500 hover:bg-red-800 px-24 h-2 w-2 rounded-md mb-2"></div>
                  </div>
                  <div className="flex mt-4 ">
                    <Link
                      href="https://www.facebook.com/profile.php?id=100011596444565"
                      className="text-[30px] dark:text-white  mr-5 md:text-[25px]"
                    >
                      <span>
                        <BsFacebook className="text-black dark:text-white" />
                      </span>
                    </Link>
                    <Link
                      href="https://github.com/CheatSetha"
                      className="text-[30px] dark:text-white  mr-5 md:text-[25px]"
                    >
                      <span>
                        <BsGithub className="text-black dark:text-white" />{" "}
                      </span>
                    </Link>
                    <Link href="">
                      <span className="text-[33px] dark:text-white  md:text-[25px]">
                        <TbWorld className="text-black dark:text-white" />{" "}
                      </span>
                    </Link>
                  </div>
                  <p className="mt-6 dark:text-white text-slate-500 md:mt-1">
                    if you are patient in one moment of anger , you will escape
                    a hundred days of sorrow
                  </p>
                </div>
              </div>
            </div>
            {/* card-3 */}
            <div className="mt-[90px] md:space-x-5 md:flex ms:flex-col">
              <div className="flex max-sm:justify-center max-sm:m-auto ">
                <Image
                  width={277}
                  height={277}
                  loading="lazy"
                  className="lg:w-[277px] lg:h-[277px] md:w-[270px] md:h-[250px] max-sm:w-[250px] max-sm:h-[250px]  object-cover  rounded-full  "
                  src="/assets/image/aboutus/somrouth.JPG"
                  alt="Modern building architecture"
                />
              </div>
              <div className="max-sm:m-3 md:w-[70%] max-sm:flex max-sm:justify-center md:mx-auto md:rounded-l-none md:shadow-md md:max-w-2xl">
                <div className=" max-sm:shadow-md max-sm:overflow-hidden max-sm:max-w-2xl rounded-xl p-8">
                  <h1 className=" tracking-wide font-bold text-[23px] mb-2 text-black dark:text-white">
                    Bich Samrouth
                  </h1>
                  <p className="block mt-1  leading-tight font-light text-black  text-[17px] dark:text-white mb-2">
                    Font-end Developer
                  </p>
                  <div className="mt-4">
                    <div className=" bg-red-500 hover:bg-red-800 px-24 h-2 w-2 rounded-md mb-2"></div>
                  </div>
                  <div className="flex mt-4 ">
                    <Link
                      href="https://www.facebook.com/profile.php?id=100069295177735&mibextid=LQQJ4d"
                      className="text-[30px] dark:text-white  mr-5 md:text-[25px]"
                    >
                      <span>
                        <BsFacebook className="text-black dark:text-white" />
                      </span>
                    </Link>
                    <Link
                      href="https://github.com/samrouth1234"
                      className="text-[30px] dark:text-white  mr-5 md:text-[25px]"
                    >
                      <span>
                        <BsGithub className="text-black dark:text-white" />{" "}
                      </span>
                    </Link>
                    <Link
                      href=""
                      className="text-[33px] dark:text-white  md:text-[25px]"
                    >
                      <span>
                        <TbWorld className="text-black dark:text-white" />{" "}
                      </span>
                    </Link>
                  </div>
                  <p className="mt-6 dark:text-white text-slate-500 md:mt-1">
                    Any fool can write code that a computer can understand. Good
                    programmers write code that humans can understand.
                  </p>
                </div>
              </div>
            </div>
            {/* card-4 */}
            <div className="mt-[90px] md:space-x-5 md:flex ms:flex-col lg:flex-row-reverse">
              <div className="flex max-sm:justify-center max-sm:m-auto ">
                <Image
                  width={277}
                  height={277}
                  loading="lazy"
                  className="lg:w-[277px] pl-0 lg:pl-3 max-lg:pl-3 lg:h-[277px] md:w-[270px] md:h-[250px] max-sm:w-[250px] max-sm:h-[250px]  object-cover  rounded-full  "
                  src="/assets/image/kotrey-01.jpg"
                  alt="Modern building architecture"
                />
              </div>
              <div className="max-sm:m-3 md:w-[70%] max-sm:flex max-sm:justify-center md:mx-auto md:rounded-l-none md:shadow-md md:max-w-2xl">
                <div className=" max-sm:shadow-md max-sm:overflow-hidden max-sm:max-w-2xl rounded-xl p-8">
                  <h1 className=" tracking-wide font-bold text-[23px] text-black dark:text-white mb-2">
                    Piyan Kotrey
                  </h1>
                  <p className="block mt-1  leading-tight font-light text-black  text-[17px] dark:text-white mb-2">
                    Back-End Developer
                  </p>
                  <div className="mt-4">
                    <div className=" bg-red-500 hover:bg-red-800 px-24 h-2 w-2 rounded-md mb-2"></div>
                  </div>
                  <div className="flex mt-4 ">
                    <Link
                      href="https://www.facebook.com/profile.php?id=100011400827746&mibextid=ZbWKwL"
                      className="text-[30px] dark:text-white  mr-5 md:text-[25px]"
                    >
                      <span>
                        <BsFacebook className="text-black dark:text-white" />
                      </span>
                    </Link>
                    <Link
                      href="https://github.com/PiyanKotrey"
                      className="text-[30px] dark:text-white  mr-5 md:text-[25px]"
                    >
                      <span>
                        <BsGithub className="text-black dark:text-white" />{" "}
                      </span>
                    </Link>
                    <Link
                      href=""
                      className="text-[33px] dark:text-white  md:text-[25px]"
                    >
                      <span>
                        <TbWorld className="text-black dark:text-white" />{" "}
                      </span>
                    </Link>
                  </div>
                  <p className="mt-6 dark:text-white text-slate-500 md:mt-1">
                    We build our computer systems the way we build our cities:
                    over time, without a plan, on top of ruins
                  </p>
                </div>
              </div>
            </div>
            {/*card-5  */}
            <div className="mt-[90px] md:space-x-5 md:flex ms:flex-col ">
              <div className="flex max-sm:justify-center max-sm:m-auto ">
                <Image
                  width={277}
                  height={277}
                  loading="lazy"
                  className="lg:w-[277px] lg:h-[277px] md:w-[270px] md:h-[250px] max-sm:w-[250px] max-sm:h-[250px]  object-cover  rounded-full  "
                  src="/assets/image/aboutus/pengny.JPG"
                  alt="Modern building architecture"
                />
              </div>
              <div className="max-sm:m-3 md:w-[70%] max-sm:flex max-sm:justify-center md:mx-auto md:rounded-l-none md:shadow-md md:max-w-2xl">
                <div className=" max-sm:shadow-md max-sm:overflow-hidden max-sm:max-w-2xl rounded-xl p-8">
                  <h1 className=" tracking-wide font-bold text-[23px] mb-2 text-black dark:text-white">
                    Sieng Pengny
                  </h1>
                  <p className="block mt-1  leading-tight font-light text-black  text-[17px] dark:text-white mb-2">
                    Back-End Developer
                  </p>
                  <div className="mt-4">
                    <div className=" bg-red-500 hover:bg-red-800 px-24 h-2 w-2 rounded-md mb-2"></div>
                  </div>
                  <div className="flex mt-4">
                    <Link
                      href="https://www.facebook.com/vorn.saran.14?mibextid=ZbWKwL"
                      className="text-[30px] dark:text-white  mr-5 md:text-[25px]"
                    >
                      <span>
                        <BsFacebook className="text-black dark:text-white" />
                      </span>
                    </Link>

                    <Link
                      href="https://github.com/Sujuforny"
                      className="text-[30px] dark:text-white  mr-5 md:text-[25px]"
                    >
                      <span>
                        <BsGithub className="text-black dark:text-white" />{" "}
                      </span>
                    </Link>
                    <Link href="">
                      <span className="text-[33px] dark:text-white  md:text-[25px]">
                        <TbWorld className="text-black dark:text-white" />{" "}
                      </span>
                    </Link>
                  </div>
                  <p className="mt-6 text-slate-500 dark:text-white md:mt-1">
                    The greatest glory in living lies not in never falling, but
                    in rising every time we fall.
                  </p>
                </div>
              </div>
            </div>
            {/* card-6 */}
            <div className="mt-[90px] md:space-x-5 md:flex ms:flex-col lg:flex-row-reverse">
              <div className="flex max-sm:justify-center max-sm:m-auto ">
                <Image
                  width={277}
                  height={277}
                  loading="lazy"
                  className="lg:w-[277px] pl-0 lg:pl-3 lg:h-[277px] md:w-[270px] md:h-[250px] max-sm:w-[250px] max-sm:h-[250px]  object-cover  rounded-full "
                  src="/assets/image/aboutus/lita.JPG"
                  alt="Modern building architecture"
                />
              </div>
              <div className="max-sm:m-3 md:w-[70%] max-sm:flex max-sm:justify-center md:mx-auto md:rounded-l-none md:shadow-md md:max-w-2xl">
                <div className=" max-sm:shadow-md max-sm:overflow-hidden max-sm:max-w-2xl rounded-xl p-8">
                  <h1 className=" tracking-wide font-bold text-[23px] dark:text-white text-black mb-2">
                    Yoeurn Sonita
                  </h1>
                  <p className="block mt-1  leading-tight font-light text-black dark:text-white text-[17px] mb-2">
                    {" "}
                    Database Developer
                  </p>
                  <div className="mt-4">
                    <div className=" bg-red-500 hover:bg-red-800 px-24 h-2 w-2 rounded-md mb-2"></div>
                  </div>
                  <div className="flex mt-4 ">
                    <Link
                      href="https://www.facebook.com/sonita.yoeurn.5?mibextid=ZbWKwL"
                      className="text-[30px] dark:text-white  mr-5 md:text-[25px]"
                    >
                      <span>
                        <BsFacebook className="text-black dark:text-white" />
                      </span>
                    </Link>
                    <Link
                      href="https://github.com/sonitayoeurn"
                      className="text-[30px] dark:text-white  mr-5 md:text-[25px]"
                    >
                      <span>
                        <BsGithub className="text-black dark:text-white" />{" "}
                      </span>
                    </Link>
                    <Link
                      href=""
                      className="text-[33px] dark:text-white  md:text-[25px]"
                    >
                      <span>
                        <TbWorld className="text-black dark:text-white" />{" "}
                      </span>
                    </Link>
                  </div>
                  <p className="mt-6 text-slate-500 dark:text-white md:mt-1">
                    Talent wins games, but teamwork and intelligence win
                    championships
                  </p>
                </div>
              </div>
            </div>
            {/* card-7 */}
            <div className="mt-[90px] md:space-x-5 md:flex ms:flex-col ">
              <div className="flex max-sm:justify-center max-sm:m-auto ">
                <Image
                  width={277}
                  height={277}
                  loading="lazy"
                  className="lg:w-[277px] lg:h-[277px] md:w-[270px] md:h-[250px] max-sm:w-[250px] max-sm:h-[250px]  object-cover  rounded-full "
                  src="/assets/image/aboutus/saran.JPG"
                  alt="Modern building architecture"
                />
              </div>
              <div className="max-sm:m-3 md:w-[70%] max-sm:flex max-sm:justify-center md:mx-auto md:rounded-l-none md:shadow-md md:max-w-2xl">
                <div className=" max-sm:shadow-md max-sm:overflow-hidden max-sm:max-w-2xl rounded-xl p-8">
                  <h1 className=" tracking-wide  font-bold text-[23px] dark:text-white mb-2 text-black">
                    Vorn Saran
                  </h1>
                  <p className="block mt-1 leading-tight font-light text-black  text-[17px] dark:text-white mb-2">
                    Back-End Developer
                  </p>
                  <div className="mt-4">
                    <div className=" bg-red-500 hover:bg-red-800 px-24 h-2 w-2 rounded-md mb-2"></div>
                  </div>
                  <div className="flex mt-4 ">
                    <Link
                      href="https://www.facebook.com/profile.php?id=100011400827746&mibextid=ZbWKwL"
                      className="text-[30px] dark:text-white   mr-5 md:text-[25px]"
                    >
                      <span>
                        <BsFacebook className="text-black dark:text-white" />
                      </span>
                    </Link>
                    <Link
                      href="https://github.com/saranvorn111"
                      className="text-[30px] dark:text-white  mr-5 md:text-[25px]"
                    >
                      <span>
                        <BsGithub className="text-black dark:text-white" />{" "}
                      </span>
                    </Link>
                    <Link href="">
                      <span className="text-[33px] dark:text-white  md:text-[25px]">
                        <TbWorld className="text-black dark:text-white" />{" "}
                      </span>
                    </Link>
                  </div>
                  <p className="mt-6 dark:text-white text-slate-500 md:mt-1">
                    Life is not about being rich, being popular, being highly
                    educated or being perfect. it is about being real, humble,
                    and kind.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/*/!* CONTACT US *!/*/}
      <div className="md:mt-[200px] pb-10 mt-24  w-[90%] mx-auto max-sm:p-3   ">
        <h1 className="text-center text-[36px] font-black dark:text-white text-black">
          CONTACT US
        </h1>
        <FormSaveContactUs/>
      </div>
    </div>
  );
};

export default Page;