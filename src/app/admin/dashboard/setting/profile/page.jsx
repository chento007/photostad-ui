"use client";
import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import Link from "next/link";

//import toastify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BASE_URL } from "@/lib/baseUrl";
import { useGetUserByIdQuery, useGetUserQuery, useUpdateAdminMutation, useUpdateUserMutation } from "@/store/features/user/userApiSlice";
import { useGetAdminQuery } from "@/store/features/auth/authApiSlice";
import axios from "axios";
import Image from "next/image";
const FILE_SIZE = 1024 * 1024 * 10; // 10MB
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/gif", "image/png"];

const validationSchema = Yup.object().shape({
  // validate username
  username: Yup.string()
    .trim()
    .required("Username is required !"),
  // validate gender
  gender: Yup.string().required("Gender is required !"),
  // // validate first_name
  first_name: Yup.string()
    .trim()
    .required("First name is required"),
  // validate last_name
  last_name: Yup.string()
    .trim()
    .required("Last name is required"),
  // // validate phone number
  phone_number: Yup.string()
    .required("Phone number is required")
    .matches(/^\d+$/, "Phone number must contain only digits")
    .min(9, "Phone number must be at least 10 digits")
    .max(15, "Phone number can be at most 15 digits"),
  // // validate date of birth
  dob: Yup.date().required("Date is required"),
  // //validate address
  address: Yup.string().required("Address is required"),
  // //validate biography
  biography: Yup.string().required("biography is required"),

  file: Yup.mixed()
    .test("fileSize", " File bigger than 5mb", (value) => {
      if (!value) {
        return true;
      }
      return value.size <= FILE_SIZE;
    })
    .test("filsFormat", "Unsupported format", (value) => {
      if (!value) {
        return true;
      }
      return SUPPORTED_FORMATS.includes(value.type);
    }),
});


export default function Home() {

  const [avartar, setAvartar] = useState(null);
  const [informationUser, setInformationUser] = useState();
  const [initialValues, setInitialValues] = useState({});

  const { data: userTokenData } = useGetAdminQuery();
  const adminId = userTokenData?.data?.id;
  const { data, isLoading, error } = useGetUserByIdQuery(adminId);
  const userToken = data?.data;
  const [updateAdmin, { isSuccess: udpated, isLoading: updating }] =
    useUpdateAdminMutation();

  const [updateUser] = useUpdateUserMutation();

  const [preview, setPreview] = useState(null);
  const [imageName, setImageName] = useState("");



  useEffect(() => {

    if (userToken) {

      setInformationUser(userToken);
      setAvartar(userToken?.data?.avatar);
      console.log("image name : ", userToken?.avatar?.name)
      setPreview(userToken?.avatar?.name);

    }


  }, [userToken]);
  // upload image version 2
  const uploadImageHandler = async (values) => {
    try {
      const respone = await axios.post(`${BASE_URL}/files`, values.file);
      console.log(respone?.data, "respone image upload");
      if (respone.status === 200) {
        const resData = respone?.data;
        const name = resData?.name;

        console.log(name, "name");
        return (
          respone.data?.data?.name ||
          "https://i.pinimg.com/564x/9f/79/a3/9f79a3c8997f30e106bcda5dfc67d83e.jpg"
        );
      }
    } catch (error) {
      console.log(error, "error");
    }
  };

  // handle insert iamge to server in order to get imagge id
  const insertImgToDB = async (img) => {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    let raw = JSON.stringify({
      name: img,
      type: "user",
    });
    let requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    try {
      const respone = await fetch(`${BASE_URL}/images`, requestOptions);
      const responeData = await respone.json();
      setTimeout(() => {
        toast.success(responeData.message, {
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
      const imgId = responeData.data.id;
      return imgId || 4;
    } catch (error) {
      console.log("error : " + error);
    }
  };

  // const sendToServer = async (values) => {

  //   let myHeaders = new Headers();
  //   myHeaders.append("Content-Type", "application/json");

  //   let raw = JSON.stringify({
  //     username: values.username,
  //     familyName: values.last_name,
  //     givenName: values.first_name,
  //     gender: values.gender,
  //     dob: values.dob,
  //     phoneNumber: values.phone_number,
  //     avatar: values.avatar,
  //     address: values.address,
  //     biography: values.biography,
  //   });

  //   try {
  //     await updateUser({ id: adminId, data: raw }).unwrap();
  //     //code here soon
  //   } catch (error) {
  //     console.log("error", error);
  //   }
  // };

  useEffect(() => {

    setPreview(userToken?.avatar?.name);

  }, [userToken]);



  if (updating) {
    return (
      <div className="text-4xl text-purple-600 text-center">loading...</div>
    );
  }


  if (udpated) {
    toast.success("Update profile successfully", {
      position: toast.POSITION.TOP_RIGHT,
    });
  }


  const handleUploadImage = async (file) => {

    var formdata = new FormData();
    formdata.append("file", file.target.files[0]);

    var requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow'
    };

    try {
      const respone = await fetch("https://photostad-api.istad.co/api/v1/files", requestOptions);
      const res = await respone.json();
      const result = await res.data.name;
      setPreview(result);
      setImageName(result);
      setTimeout(() => {
        toast.success("File uploaded successfully: ", result, {
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
      return result;
    } catch (error) {
      console.error("Error uploading file: ", error);

      setTimeout(() => {
        if (error.status === 400) {
          // Bad Request error
          const errorMessage = error.data.errors[0].message;
          toast.error(errorMessage, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        } else if (error.status >= 500 && error.status <= 500) {
          // Unauthorized error
          toast.error("Internal server error please contact CHENTO !", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        } else {
          // Other errors
          toast.error("Failed to upload file", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      }, 100);

      // handle error
    }

  };


  return (
    <main className=" dark:bg-primary db-bg h-screen">
      <section className=" p-5">
        <div className="sticky top-20 z-40 db-bg dark:bg-primary">
          <h1 className="text-[32px] text-light dark:text-white font-semibold mb-5">
            Profile
          </h1>
          <div className="text-sm mb-3 breadcrumbs">
            <ul className="font-extralight text-light dark:text-white">
              <li>
                <Link
                  className="text-black dark:text-white"
                  href="/admin/dashboard"
                >
                  Admin
                </Link>
              </li>
              <li>
                <Link
                  className="text-black dark:text-white"
                  href={"/admin/dashboard/setting/profile"}
                >
                  Setting
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <Formik
          enableReinitialize={true}
          initialValues={{
            username: userToken?.username,
            gender: userToken?.gender,
            first_name: userToken?.givenName,
            last_name: userToken?.familyName,
            dob: userToken?.dob,
            address: userToken?.address,
            phone_number: userToken?.phoneNumber,
            biography: userToken?.biography,
            avatar: userToken?.avatar?.id,
            file: undefined,
          }}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            var idImage = null;
            if (imageName != undefined || imageName != null) {
              idImage = await insertImgToDB(preview);
            } else {
              idImage = values.avatar;
            }
            console.log("image name : ", imageName);
            console.log("preview : ", preview);
            console.log("image id : ", idImage);
            console.log("value submit : ", values);

            const rawUpdate = {
              username: values.username,
              familyName: values.last_name,
              givenName: values.first_name,
              gender: values.gender,
              dob: values.dob,
              phoneNumber: values.phone_number,
              avatar: idImage,
              address: values.address,
              biography: values.biography,
            };

            try {
              const response = await updateUser({ id: adminId, data: rawUpdate }).unwrap();
              console.log("respone : ", response);
              setTimeout(() => {
                toast.success(response.message, {
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
            } catch (error) {
              setTimeout(() => {
                toast.error(error?.data?.errors[0].message, {
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
            setSubmitting(false);
            resetForm();
          }}
        >
          {({ isSubmitting, setFieldValue, values }) => (
            <Form className="h-full">
              <div className="grid gap-x-10 gap-6 mb-6 md:grid-cols-2 w-full ">
                {/* user name */}
                <div className="mb-3">
                  <label
                    htmlFor="username"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Username
                  </label>
                  <Field
                    type="text"
                    name="username"
                    id="username"
                    value={values.username}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-main focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="username"
                    required
                  />
                  <ErrorMessage
                    name="username"
                    component="div"
                    className="text-red-500"
                  />
                </div>
                {/* sex */}
                <div className="mb-3">
                  <label
                    htmlFor="gender"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Select an option
                  </label>
                  <Field
                    as="select"
                    id="gender"
                    name="gender"
                    value={values.gender}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-main focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option disabled selected value="">
                      Choose a gender
                    </option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </Field>
                  <ErrorMessage
                    name="gender"
                    component="div"
                    value={values.gender}
                    className="text-red-500"
                  />
                </div>
                {/* First name */}
                <div className="mb-3">
                  <label
                    htmlFor="first_name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    First name
                  </label>
                  <Field
                    type="text"
                    id="first_name"
                    name="first_name"
                    value={values.first_name}

                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-main focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="John"
                  />
                  <ErrorMessage
                    name="first_name"
                    component="div"
                    className="text-red-500"
                  />
                </div>
                {/* Last name */}
                <div className="mb-3">
                  <label
                    htmlFor="last_name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Last name
                  </label>
                  <Field
                    type="text"
                    id="last_name"
                    name="last_name"
                    value={values.last_name}

                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-main focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Doe"
                    required
                  />
                  <ErrorMessage
                    name="last_name"
                    component="div"
                    className="text-red-500"
                  />
                </div>
                {/* phone number */}
                <div className="mb-3">
                  <label
                    htmlFor="phone_number"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Phone number
                  </label>
                  <Field
                    type="text"
                    id="phone_number"
                    name="phone_number"
                    value={values.phone_number}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-main focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                  <ErrorMessage
                    name="phone_number"
                    component="div"
                    className="text-red-500"
                  />
                </div>
                {/* date */}
                <div>
                  <div class="relative mb-3 w-full">
                    <label
                      htmlFor="gender"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      date of birth
                    </label>
                    <div class="absolute top-[41px] left-0 flex items-center pl-3 pointer-events-none">
                      <svg
                        aria-hidden="true"
                        class="w-5 h-5 text-gray-500 dark:text-gray-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                    </div>
                    <Field
                      type="date"
                      name="dob"
                      value={values.dob}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-main focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Select date"
                    />
                  </div>

                  <ErrorMessage
                    name="dob"
                    component="div"
                    className="text-red-500"
                  />
                </div>
                {/* address */}
                <div className="mb-3">
                  <label
                    htmlFor="address"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Address
                  </label>
                  <Field
                    as="textarea"
                    id="address"
                    name="address"
                    value={values.address}
                    rows="4"
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-main border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Your address..."
                  />
                  <ErrorMessage
                    name="address"
                    component="div"
                    className="text-red-500"
                  />
                </div>
                {/* message */}
                <div className="mb-3">
                  <label
                    htmlFor="biography"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Bio
                  </label>
                  <Field
                    as="textarea"
                    id="biography"
                    name="biography"
                    value={values.biography}

                    rows="4"
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-main border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Your biography..."
                  />
                  <ErrorMessage
                    name="biography"
                    component="div"
                    className="text-red-500"
                  />
                </div>
                <div className=" mb-6 w-full ">
                  <label
                    htmlFor="file"
                    className="mb-1 text-black dark:text-white"
                  >
                    Avatar
                  </label>

                  <Field
                    name="file" // Use "name" instead of "filename"
                    type="file"
                    title="Select a file"
                    setFieldValue={setFieldValue}
                    isSubmitting={isSubmitting}
                    onChange={handleUploadImage}
                    className="input-file input-file-lg"
                  />
                  {
                    preview ? <>
                      <div>
                        <img
                          className="mt-4 rounded-full w-20 h-20"
                          src={`https://photostad-api.istad.co/files/${preview}`} alt={values.image} width="100" height="100" />
                      </div>
                    </> : <div >
                      <img
                        className="mt-4 rounded-full w-20 h-20"
                        src={`https://photostad-api.istad.co/files/no-photo.jpg`} alt={values.image} width="100" height="100" />
                      <div className="text-red-500">Avatar is Unavalable</div>
                    </div>
                  }
                  <ErrorMessage
                    name="file"
                    component="div"
                    className="text-red-500"
                  />
                </div>
              </div>
              <button
                disabled={isSubmitting}
                type="submit"
                className={`${isSubmitting ? "cursor-not-allowed" : " "
                  } text-white bg-black rounded-main hover:bg-[#333] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}
              >
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </section>
    </main>
  );
}


function CustomInput({ field, form, isSubmitting, ...props }) {
  let img = null
  if (form) {
    img = form?.values?.file?.name
  }
  const [preview, setPreview] = useState(null);
  // for reset imageds
  useEffect(() => {
    if (isSubmitting) {
      setPreview(null);
    }
  }, [isSubmitting]);
  return (
    <div>
      <input
        type="file"
        onChange={(event) => {
          form.setFieldValue(field.name, event.currentTarget.files[0]);
          setPreview(URL.createObjectURL(event.currentTarget.files[0]));
        }}
        // {...props} is use to pass all props from Formik Field component
        {...props}
      />
      {preview && (
        <div className="w-24 rounded-[16px] mt-5">
          <Image src={preview} alt="dummy" width="100" height="100" />
        </div>
      )}
    </div>
  );
}