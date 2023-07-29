"use client";
import { Formik, Form, Field, useField, useFormikContext, ErrorMessage } from "formik";
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
import { BASE_URL } from "@/lib/baseUrl";

export default function Page() {

  const [addImageByName] = useAddImageByNameMutation();
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();
  const { data: user, isSuccess } = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const fileInputRef = useRef();
  const [preview, setPreview] = useState("");
  const [imageName, setImageName] = useState("");

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  useEffect(() => {
    setPreview(user?.avatar?.name);
  }, [user, isSuccess]);


  const initialValues = {

    username: user?.username,
    gender: user?.gender,
    first_name: user?.givenName,
    last_name: user?.familyName,
    dob: user?.dob,
    address: user?.address,
    phone_number: user?.phoneNumber,
    biography: user?.biography,
    image: user?.avatar?.name,
    avatar: user?.avatar?.id,
    file: undefined,

  };

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

  const handleUpdateUser = async (values) => {

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
    console.log("update user : ", dataUpdateUser);

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

    }, 100);


  }

  const handleSubmit = async (values) => {


    try {


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
        console.log("update user : ", dataUpdateUser);

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

        }, 100);


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
    <div className="w-[90%] mx-auto bg-white dark:bg-[#1e1e1e]  p-5 rounded-[16px]">
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


      <h1 className="font-semibold max-sm:hidden dark:text-white text-[32px]">
        Profile Setting
      </h1>
      <h2 className="mt-5  dark:text-white font-semibold">Profile Picture</h2>
      <p className="font-extralight w-full md:w-[550px]">
        Upload a picture to make your profile more fantastic
      </p>
      <Formik

        enableReinitialize={true}

        initialValues={{

          username: user?.username,
          gender: user?.gender,
          first_name: user?.givenName,
          last_name: user?.familyName,
          dob: user?.dob,
          address: user?.address,
          phone_number: user?.phoneNumber,
          biography: user?.biography,
          image: user?.avatar?.name,
          avatar: user?.avatar?.id,
          file: undefined,

        }}

        onSubmit={async (values, { setSubmitting, resetForm }) => {

          let idImage = null;

          if (imageName) {
            
            var raw = JSON.stringify({
              name: imageName,
              type: "user",
            });

            let myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            var request = {
              method: "POST",
              headers: myHeaders,
              body: raw,
              redirect: "follow",
            };

            const ress = await fetch(BASE_URL + "/images", request);


            const data = await ress.json();


            idImage = data?.data?.id;


          } else {

            idImage = values.avatar;

          }


          const rawUpdate = {
            familyName: values.last_name,
            givenName: values.first_name,
            gender: values.gender,
            avatar: idImage,
            biography: values.biography,
          };


          try {

            const response = await updateProfile({ uuid: user?.uuid, data: rawUpdate }).unwrap();

            console.log("respone update : ", response);

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

            setImageName(null);

          } catch (error) {

            if (error.data?.errors) {

              setTimeout(() => {
                toast.error(error.data.errors[0].message, {
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

            } else {
              
              setTimeout(() => {
                toast.error("Update Profile is fail", {
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

          }

          resetForm();
          setSubmitting(false);
        }}
      >
        {({ isSubmitting, setFieldValue, values }) => (

          <Form className="w-full md:w-[550px]">

            <h2 className="my-6  dark:text-white font-semibold">
              Profile Information
            </h2>


            <Field
              className="file-input rounded-main w-full bg-white dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              name="file" // Use "name" instead of "filename"
              type="file"
              title="Select a file"
              setFieldValue={setFieldValue}
              isSubmitting={isSubmitting}
              onChange={handleUploadImage}
            />

            {
              preview ? <>
                <div>
                  <img
                    className="mt-4 w-56 h-56 object-contain"
                    src={`https://photostad-api.istad.co/files/${preview}`} alt={values.image} width="100" height="100" />
                </div>
              </> : <div >
                <img
                  className="mt-4  w-56 h-56 object-contain"
                  src={`https://photostad-api.istad.co/files/no-photo.jpg`} alt={values.image} width="100" height="100" />
                <div className="text-red-500">Avatar is Unavalable</div>
              </div>
            }


            <div className="flex justify-between gap-3 max-sm:flex-col flex-wrap mt-5">
              <div className="mb-6 w-[45%]">
                <label
                  htmlFor="lastName"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Last Name
                </label>
                <Field
                  placeholder="Enter your last name"
                  id="last_name"
                  name="last_name"
                  value={values.last_name}
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
                  id="first_name"
                  value={values.first_name}
                  name="first_name"
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
                value={values.gender}
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
