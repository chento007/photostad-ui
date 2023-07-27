import Image from "next/image";
import Link from "next/link";
import { BsFacebook, BsGithub } from "react-icons/bs";

export default function Mentor() {
  return (
    <>
    {/* Mentor */}
			<div className="text-center w-full p-2.5 mt-28">
					<h1 className='title-about-3 text-[36px] font-black mb-8 dark:text-white text-black'>
						MENTOR
					</h1>
					<div className='flex justify-center mt-8'>
						<div className=' bg-red  px-5 h-2 w-2 rounded-md'></div>
					</div>
					<div className="flex justify-evenly mx-auto items-center mt-12 max-sm:flex-wrap  ">
						<div className="max-w-sm bg-white dark:bg-black ">
							<div className="flex justify-center m-auto ">
								<Image width={277} height={277}
									className='lg:w-[277px] lg:h-[277px] md:w-[260px] md:h-[260px] max-sm:w-[250px] max-sm:h-[250px] object-cover rounded-full  '
									src='/assets/image/aboutus/sangsokea-01.jpg'
									alt='Modern building architecture'
                                    loading="lazy"
								/>
							</div>
							<div class="p-5">
								<h5 className=" text-2xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">Sang Sokea</h5>
								<span className="flex justify-center text-[24px] mb-4 ">
									<Link href="https://www.facebook.com/sang.sokea.7">
										<BsFacebook className="text-black dark:text-white mr-4 hover:text-[#E85854]" />
									</Link>
									<Link href="https://gitlab.com/sangsokea">
										<BsGithub className="text-black dark:text-white hover:text-[#E85854]" />
									</Link>
								</span>
								<p className="mb-3 font-normal text-gray-700 dark:text-white ">Being a developer means being a lifelong learner who is always curious and eager to learn new things and improve existing ones. </p>
							</div>
						</div>
						<div className="max-w-sm bg-white dark:bg-black ">
							<div className="flex justify-center m-auto ">
								<Image width={277} height={277}
                                loading="lazy"
									className='lg:w-[277px] lg:h-[277px] md:w-[260px] md:h-[260px] max-sm:w-[250px] max-sm:h-[250px]  object-cover  rounded-full  '
									src='/assets/image/aboutus/My Profile.jpg'
									alt='Modern building architecture'
								/>
							</div>
							<div className="p-5">
								<h5 className=" text-2xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">Chhaya Chan</h5>
								<span className="flex justify-center text-[24px] mb-4 ">
									<Link href="https://www.facebook.com/chhayadevkh">
										<BsFacebook className="text-black dark:text-white mr-4 hover:text-[#E85854]" />
									</Link>
									<Link href="https://github.com/it-chhaya">
										<BsGithub className="text-black dark:text-white hover:text-[#E85854]" />
									</Link>
								</span>
								<p className="mb-3 font-normal text-gray-700 dark:text-white ">Succeed Developer is not about what you have done with the code, but your love, your family, your team, and your country.</p>
							</div>
						</div>
					</div>
				</div>
				{/* end mentor */}
    </>
  )
}