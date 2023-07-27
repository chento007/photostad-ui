import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup'; // Import Yup for validation schema
import { TbSend } from 'react-icons/tb';
import { useSelector } from 'react-redux';
import { selectCurrentUserData } from '@/store/features/auth/authSlice';
import { useCreateContactUsMutation } from '@/store/features/contactus/contactus';
import { toast } from 'react-toastify';
import { useRouter } from "next/navigation";
import Loading from '@/components/loading/Loading';


const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email is required"),
    message: Yup.string().required("Message is required")
});

export default function FormSaveContactUs() {

    const dataUsers = useSelector(selectCurrentUserData)
    const [addCreateContactUs, { isLoading, isError, isSuccess }] = useCreateContactUsMutation();
    const router = useRouter();

    const handleSaveContactUs = async (values) => {
        if (!dataUsers) {
            router.push("/login")
            toast.warn('You need to login!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });

            return;
        }
        else {

            var raw = JSON.stringify({
                "email": values.email,
                "userUUID": dataUsers.uuid,
                "message": values.message
            });
            try {
                const { data } = await addCreateContactUs(raw).unwrap();
                console.log("contact us data : "+data)
                toast.success('successfully', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            } catch (error) {

                if (error.data.code === 404) {
                    toast.warn('send to request false!', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                }
            }

        }
    }

    return (
        isLoading ? <Loading /> : (
            <Formik
                initialValues={{
                    email: '',
                    message: '',
                }}
                validationSchema={validationSchema} // Corrected variable name
                onSubmit={async (values, { setSubmitting, resetForm }) => {
                    // Perform any form submission logic here
                    handleSaveContactUs(values);
                    resetForm();
                }}
            >
                {({ isSubmitting, setFieldValue }) => (
                    <Form
                        className="mt-[23px] w-full mx-auto pt-[80px] md:w-[50%] justify-center "
                    >
                        <div className="mb-6">
                            <label
                                htmlFor="email"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Email
                            </label>
                            <Field
                                type="email"
                                id="email"
                                name="email"
                                className="block z-50 mb-6 w-full rounded-[16px]  p-4 text-gray-900 border border-gray-300  bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            />
                            <ErrorMessage
                                name="email"
                                className='text-red-500'
                                component="div"
                            />
                        </div>
                        <label
                            htmlFor="message"
                            className="block mb-2 z-50 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            {" "}
                            Message
                        </label>
                        <Field
                            as="textarea"
                            id="message"
                            name="message"
                            rows="4"
                            className="block mb-6 p-2.5 w-full  rounded-[16px]  text-sm text-gray-900 bg-gray-50 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                        <ErrorMessage
                            name="message"
                            className='text-red-500'
                            component="div"
                        />
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="text-white z-50 mb-6 w-full mt-5 dark:text-white rounded-[16px]  bg-red text-[17px] font-medium px-5 py-2.5 mr-2    "
                        >
                            {" "}
                            Send{" "}
                            <div className="inline ml-2 text-[24px]">
                                {/* Make sure you have imported and provided the TbSend component */}
                                <TbSend className={"text-[24px] inline"} />
                            </div>
                        </button>
                    </Form>
                )}
            </Formik>
        )
    );
}