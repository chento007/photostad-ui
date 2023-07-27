"use client";
import { Formik, Form, Field, useField, useFormikContext } from "formik";
import React, { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { TiCameraOutline } from "react-icons/ti";
import {
  useGetUserQuery,
  useUpdateProfileMutation,
} from "@/store/features/user/userApiSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCurrentUser,
  selectCurrentUserAvatar,
} from "@/store/features/auth/authSlice";
import { useUploadSingleMutation } from "@/store/features/upload-single/uploadSIngleApiSlice";
import { useAddImageByNameMutation } from "@/store/features/image/imageApiSlice";
import { toast } from "react-toastify";
import { CiCircleChevLeft } from "react-icons/ci";
import SideSettingNav from "@/components/profile/SideSettingNav";
import Loading from "@/components/loading/Loading";

export default function Page() {
  const [addImageByName] = useAddImageByNameMutation();
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();
  const { data: user } = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const fileInputRef = useRef();

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const initialValues = {
    lastName: user?.givenName,
    firstName: user?.familyName,
    gender: user?.gender,
    biography: user?.biography,
    image: user?.avatarUrl,
  };

  const handleSubmit = async (values) => {
    try {
      // Handle form submission
      console.log("values file", values);
      console.log("values file", values.image);

      const files = values.image;
      const formdata = new FormData();
      formdata.append("file", files);

      const requestOptions = {
        method: "POST",
        body: formdata,
        redirect: "follow",
      };

      const response = await fetch(
        "https://photostad-api.istad.co/api/v1/files",
        requestOptions
      );

      const dataFile = await response.json();
      console.log("dataFile", dataFile);

      if (dataFile.status === 400) {

        const uuid = user?.uuid;
        const avatar = user?.avatar.id;

        const {
          firstName: familyName,
          lastName: givenName,
          gender,
          biography,
        } = values;

        const body = { familyName, givenName, gender, avatar, biography };
        const dataUpdateUser = await updateProfile({ uuid, data: body });

        setTimeout(() => {
          toast.success(dataUpdateUser?.data?.message, {
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
        console.log("dataUpdateUser hehehe", dataUpdateUser);
        return;
      }
      const name = dataFile?.data.name;
      const type = "User";
      try {
        const dataImage = await addImageByName({ name, type }).unwrap();
        console.log("dataImage", dataImage);
        try {
          const uuid = user?.uuid;
          const avatar = dataImage?.data.id;
          const {
            firstName: familyName,
            lastName: givenName,
            gender,
            biography,
          } = values;
          const body = { familyName, givenName, gender, avatar, biography };
          const dataUpdateUser = await updateProfile({ uuid, data: body });
          toast.success("successfully", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          console.log("dataUpdateUser===>", dataUpdateUser);
        } catch (err) {
          setTimeout(() => {
            toast.error(err?.data?.errors[0]?.message, {
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
      } catch (e) {
        console.log("Error dataimge=================>", e);
      }
    } catch (error) {
      console.log("Error handling form submission:", error);
    }
  };

  //  i back soon
  if (isLoading) return <Loading />

  return (
    <div className="w-[90%] mx-auto bg-white dark:bg-black p-5 rounded-[16px]">
      {/* drawer */}
      <div className="md:hidden mb-3">
        <input type="checkbox" id="drawer-left" className="drawer-toggle" />
        <label htmlFor="drawer-left">
          <h1 className="font-semibold dark:text-white text-[32px]  ">
            <CiCircleChevLeft className="inline" /> Profile Setting
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
      {/* Page content here */}

      <h1 className="font-semibold max-sm:hidden dark:text-white text-[32px]">
        Profile Setting
      </h1>
      <h2 className="mt-5  dark:text-white font-semibold">Profile Picture</h2>
      <p className="font-extralight w-[550px]">
        Upload a picture to make your profile more fantastic
      </p>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue }) => (
          <Form className="w-[550px]">
            <div className=" my-6 flex justify-start">
              <Field
                as={FileInput}
                label="Profile Image"
                name="image"
                setFieldValue={setFieldValue}
              />
            </div>


            <h2 className="my-6  dark:text-white font-semibold">
              Profile Information
            </h2>


            <div className="flex justify-between gap-3 max-sm:flex-col flex-wrap">
              <div className="mb-6 w-[45%]">
                <label
                  htmlFor="lastName"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Last Name
                </label>
                <Field
                  placeholder="Enter your last name"
                  type="text"
                  id="lastName"
                  name="lastName"
                  className=" rounded-main border-none bg-[whitesmoke] border-gray-400 text-black dark:bg-gray-200 w-full h-[45px]"
                />
              </div>
              <div className="mb-6 w-[45%]">
                <label
                  htmlFor="firstName"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  First Name
                </label>
                <Field
                  placeholder="Enter your first name"
                  type="text"
                  id="firstName"
                  name="firstName"
                  className=" rounded-main border-none bg-[whitesmoke] border-gray-400 text-black dark:bg-gray-200 w-full h-[45px]"
                />
              </div>
            </div>
            <div className="mb-6">
              <label
                htmlFor="gender"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Select your gender
              </label>
              <Field
                as="select"
                id="gender"
                name="gender"
                className=" rounded-main border-none bg-[whitesmoke] border-gray-400 text-black dark:bg-gray-200 w-full h-[45px]"
              >
                <option value="">Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </Field>
            </div>

            <div className="mb-6">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Bio
              </label>
              <Field
                as="textarea"
                name="biography"
                className=" rounded-main border-none bg-[whitesmoke] border-gray-400 text-black dark:bg-gray-200 w-full h-[200px] "
              />
            </div>

            <button
              type="submit"
              className="text-[17px]  bg-red rounded-main text-white p-2.5 px-3.5 btn font-light"
            >
              Save Changes
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

const FileInput = ({ label, ...props }) => {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(props);
  const [previewImage, setPreviewImage] = useState(null);
  const { data: user } = useSelector(selectCurrentUser);

  const handleFileChange = (event) => {
    const file = event.currentTarget.files[0];
    setPreviewImage(URL.createObjectURL(file));
    setFieldValue(props.name, file);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <input
          type="file"
          id={props.id || props.name}
          name={props.name}
          onChange={handleFileChange}
          className="hidden"
        />
        {previewImage ? (
          <img
            src={
              previewImage
                ? previewImage
                : "https://toppng.com/uploads/preview/instagram-default-profile-picture-11562973083brycehrmyv.png"
            }
            alt="Preview"
            className="w-36 mb-2 h-36 object-cover  rounded-main"
          />
        ) : (
          <img
            src={
              user?.avatarUrl
                ? user.avatarUrl
                : "https://toppng.com/uploads/preview/instagram-default-profile-picture-11562973083brycehrmyv.png"
            }
            alt="avatar"
            className="w-36 mb-2 h-36 object-cover rounded-main"
          />
        )}
        <div className="opacity-0 hover:opacity-100 ">
          <label
            htmlFor={props.id || props.name}
            className="absolute inset-0 flex items-center justify-center w-36 h-36 rounded-main bg-gray-200 bg-opacity-50 cursor-pointer"
          >
            <TiCameraOutline className="text-3xl" />
          </label>
        </div>
      </div>
      {/* <label
        htmlFor={props.id || props.name}
        className="block mt-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {label}
      </label> */}
      {meta.touched && meta.error && (
        <div className="text-red-500 text-sm">{meta.error}</div>
      )}
    </div>
  );
};
