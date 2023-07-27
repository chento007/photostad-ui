'use client'
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '@/store/features/auth/authSlice';

import { ToastContainer, toast } from 'react-toastify';
import { CiCircleChevLeft } from 'react-icons/ci';
import SideSettingNav from '@/components/profile/SideSettingNav';
import { useUpdateInformationClientMutation } from '@/store/features/user/userApiSlice';

export default function Page() {
  const { data: user } = useSelector(selectCurrentUser)
  const [updateInformationClient, { isLoading }] = useUpdateInformationClientMutation()
  const uuid = user?.uuid
  console.log(user, "user in information");
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await updateInformationClient({ uuid, data: values });
      console.log(response);
      setTimeout(() => {
        toast.success(response?.data?.message, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }, 100)
    } catch (e) {
      setTimeout(() => {
        toast.error(e?.data?.errors[0]?.message, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }, 100);
    }
    // Simulating form submission
    setTimeout(() => {
      console.log(values); // You can handle form submission here
      setSubmitting(false);
    }, 500);
  };

  // const validationSchema = Yup.object().shape({
  //   phoneNumber: Yup.string().required('Phone Number is required').matches(/^\d{10}$/, 'Phone Number must be 10 digits'),
  //   dob: Yup.string().required('Date of Birth is required'),
  //   address: Yup.string().required('Address is required'),
  // });
  const initialValues = {
    phoneNumber: user?.phoneNumber,
    dob: user?.dob,
    address: user?.address
  }
  return (
    <div className='w-[90%] mx-auto rounded-[16px] dark:bg-black bg-white p-5'>
      {/* drawer */}
      <div className="md:hidden">
        <input type="checkbox" id="drawer-left" className="drawer-toggle" />
        <label htmlFor="drawer-left" >
          <h1 className="font-semibold dark:text-white text-[32px]  ">
            <CiCircleChevLeft className="inline" /> General Setting
          </h1>
        </label>
        <label className="overlay" htmlFor="drawer-left"></label>
        <div className="drawer bg-transparent">
          <div className="drawer-content pt-10 flex flex-col h-full">
            <SideSettingNav />
          </div>
        </div>
      </div>

      {/* end of drawer */}
      <h1 className='font-semibold max-sm:hidden text-[32px] dark:text-white'>More Information</h1>
      <Formik
        initialValues={initialValues}
        // validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        <Form>
          <div class='my-6'>
            <label for='phoneNumber' class='block mb-2 text-sm font-light dark:text-white'>
              Phone Number
            </label>
            <Field
              type='text'
              id='phoneNumber'
              name='phoneNumber'
              className=' rounded-main w-1/2 border-none bg-[whitesmoke] border-gray-400 text-black dark:bg-gray-200  h-[45px]'
            />
            <ErrorMessage name='phoneNumber' component='div' className='text-red-500' />
          </div>
          <div class='mb-6'>
            <label for='dob' class='block mb-2 text-sm font-light text-gray-900 dark:text-white'>
              Date of Birth
            </label>
            <Field
              type='date'
              id='dob'
              name='dob'
              className=' rounded-main border-none bg-[whitesmoke] border-gray-400 text-black dark:bg-gray-200 w-1/2 h-[45px]'
            />
            <ErrorMessage name='dob' component='div' className='text-red-500' />
          </div>
          <label for='address' class='block mb-2 text-sm font-light text-gray-900 dark:text-white'>
            Address
          </label>
          <Field
            as='textarea'
            id='address'
            name='address'
            className='w-1/2 rounded-main border-none bg-[whitesmoke] border-gray-400 text-black dark:bg-gray-200  h-[150px]'
          />
          <ErrorMessage name='address' component='div' className='text-red-500' />
          <br />
          <button type='submit' className="text-[17px] mt-5 bg-red rounded-main text-white p-2.5 px-3.5 btn font-light">
            Save Change
          </button>
        </Form>
      </Formik>
    </div>
  );
}