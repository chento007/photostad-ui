'use client' // Error components must be Client Components
import Image from "next/image";
import {useEffect} from "react";

const Error = ({ error, reset }) => {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error)
    }, [error])
    return (
        <>
            <div className={'w-9/12 h-screen mx-auto  flex justify-between items-center'}>
               <div>
                   <h1 className={'text-4xl mb-3 font-semibold text-red-400'}>Oops! Something went wrong.</h1>
                   <p className={'text-black dark:text-white font-light w-72'}>We apologize for the inconvenience, but an unexpected error occurred on our website.</p>
                   <p className={'text-black dark:text-white font-light w-72'}>Please try again later or contact our support team if the problem persists.</p>
                   <p>An erorr : {error.message}</p>
                   <button className={'bg-red-400 text-white px-4 py-2 rounded-[16px] mt-3'}
                       onClick={
                           // Attempt to recover by trying to re-render the segment
                           () => reset()
                       }
                   >
                       Try again
                   </button>
               </div>

                <Image src={ '/image/error/500 Internal Server Error.gif'} alt={"error image"} width={500} height={500} />

            </div>
        </>
    )
}
export default Error
