"use client";

import { AiOutlineCloseCircle, AiOutlinePlusCircle } from "react-icons/ai";
import { Button, Modal, Select } from "flowbite-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TfiClose } from "react-icons/tfi";
import { BASE_URL } from "@/lib/baseUrl";
import { fetchRoles, selectAllRoles } from "@/store/features/role/roleSlice";
import { useCreateUserMutation } from "@/store/features/user/userApiSlice";

import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { selectCurrentUser } from "@/store/features/auth/authSlice";
import Loading from "@/components/loading/Loading";
import { useGetRoleQuery } from "@/store/features/role/roleApiSlice";

const validationSchema = Yup.object({
  username: Yup.string().required("Username is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character"
    ),
  role: Yup.string().required("Role is required"),
  givenName: Yup.string().required("Given Name is required"),
  familyName: Yup.string().required("Family Name is required"),
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
    })
    .required("required"),
});

const FILE_SIZE = 1024 * 1024 * 5; // 5MB

const SUPPORTED_FORMATS = [
  "image/jpg",
  "image/jpeg",
  "image/gif",
  "image/png",
  "image/webp",
];

const CreateNew = () => {
  const [openModal, setOpenModal] = React.useState(undefined);
  const [modalSize, setModalSize] = React.useState("6xl");
  const props = { modalSize, openModal, setModalSize, setOpenModal };
  const { data: user } = useSelector(selectCurrentUser);
  const [isError, setIsError] = useState(false);
  const [roles, setRoles] = useState([]);
  console.log(user, "current user");
  const [imageName, setImageName] = useState(null);
  const dispatch = useDispatch();
  const [imgId, setImgId] = useState(0);
  const [loading, setLoading] = useState(false);
  // const roles = useSelector(selectAllRoles);
  const { data } = useGetRoleQuery()
  console.log(data, "data from role api", roles, "roles from role api");
  const [createUser, { isSuccess }] = useCreateUserMutation();
  useEffect(() => {
    if (data) {
      setRoles(data?.data?.list);
    }
  }, [data]);



  const uploadImageHandler = async (values) => {

    const formData = new FormData();
    formData.append("file", values.file);

    try {
      const response = await axios.post(`${BASE_URL}/files`, values.file);
      console.log("respone file upload : ", response);
      const name = await response.data?.data?.name;
      console.log("name : ", response.data?.data?.name);
      setImageName(response.data?.data?.name);
      return (
        response.data?.data?.name ||
        "https://www.pulsecarshalton.co.uk/wp-content/uploads/2016/08/jk-placeholder-image.jpg"
      );
    } catch (error) {
      console.log("error hz chento : ", error);
      setIsError(true);
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
    }
  };


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
      const imgId = responeData.data.id;
      setImgId(imgId);
      return responeData.data.id || 4;
    } catch (error) {
      setIsError(true);
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

          toast.error("Insert Image to upload file", {
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
    }
  };


  const submitHandler = async (values) => {


    var raw = JSON.stringify({
      familyName: values.familyName,
      givenName: values.givenName,
      username: values.username,
      email: values.email,
      password: values.password,
      avatar: values.avatar,
      roleIds: [values.role],
    });

    try {
      const respone = await createUser(raw).unwrap();
      console.log("res create user: ",respone);
      setTimeout(() => {
        toast.success(respone.message, {
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

      setIsError(false);

    } catch (error) {

      for (var i = 0; i < error?.data?.errors.length; i++) {

        const errorMessage = error.data.errors[i].message;

        setTimeout(() => {
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
        }, 100);

        setIsError(true);

      }
      setIsError(true);

    }
  };




  return (
    <>

      <button
        onClick={() => props.setOpenModal("size")}
        className="rounded-main px-5 max-sm:px-2 p-2.5 bg-black text-white  dark:bg-primary"
      >
        <AiOutlinePlusCircle className="inline text-2xl" />{" "}
        <span className="max-sm:hidden">Add new User</span>
      </button>

      {loading ? <Loading /> : (
        <Modal
          show={props.openModal === "size"}
          size={props.modalSize}
          onClose={() => props.setOpenModal(undefined)}
        >

          <button
            className="absolute top-2 right-2 p-2.5 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full"
            onClick={() => props.setOpenModal(undefined)}
          >
            <TfiClose className="text-2xl opacity-75" />
          </button>

          <div className="p-5 rounded-main dark:bg-secondary bg-white">
            <h2 className="text-start text-3xl mt-10 mb-6  text-light dark:text-white font-bold">
              Create User
            </h2>

            <Formik

              initialValues={{
                username: "",
                email: "",
                password: "",
                role: [],
                givenName: "",
                familyName: "",
                avatar: " ",
                file: undefined,
              }}

              enableReinitialize={true}

              validationSchema={validationSchema}

              onSubmit={async (values, { setSubmitting, resetForm }) => {
                
                setLoading(true);

                const formData = new FormData();
                formData.append("file", values.file);
                const avartar = await uploadImageHandler(({ file: formData }));

                if (!isError) {

                  const imageid = await insertImgToDB(avartar);
                  values.avatar = imageid;
                  await submitHandler(values);
                  
                }
                
                if (isError) {
                  setTimeout(() => {
                    toast.error("Please try again", {
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
                resetForm();
                setLoading(false);
                setSubmitting(false);
              }}

            >
              {({ isSubmitting, setFieldValue }) => (
                <Form className="h-full">
                  <div className="grid gap-x-10 gap-6 mb-3 md:grid-cols-2 w-full ">
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
                        id="givenName"
                        name="givenName"
                        className="bg-gray-50 border placeholder:dark:text-white border-gray-300 text-gray-900 text-sm rounded-main focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Your first name..."
                      />
                      <ErrorMessage
                        name="givenName"
                        component="div"
                        className="text-red-500"
                      />
                    </div>
                    {/* Last name */}
                    <div className="mb-3">
                      <label
                        htmlFor="familyName"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Last name
                      </label>
                      <Field
                        type="text"
                        id="familyName"
                        name="familyName"
                        className="bg-gray-50 border placeholder:dark:text-white border-gray-300 text-gray-900 text-sm rounded-main focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Your family name..."
                      />
                      <ErrorMessage
                        name="familyName"
                        component="div"
                        className="text-red-500"
                      />
                    </div>
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
                        className="bg-gray-50 border placeholder:dark:text-white border-gray-300 text-gray-900 text-sm rounded-main focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Your username"
                      />
                      <ErrorMessage
                        name="username"
                        component="div"
                        className="text-red-500"
                      />
                    </div>
                    {/* phone number */}
                    <div className="mb-3">
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
                        placeholder="Your email"
                        className="bg-gray-50 border placeholder:dark:text-white border-gray-300 text-gray-900 text-sm rounded-main focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="text-red-500"
                      />
                    </div>

                    {/* address */}
                    <div className="mb-3">
                      <label
                        htmlFor="password"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Password
                      </label>
                      <Field
                        type="password"
                        id="password"
                        name="password"
                        className="block p-2.5 w-full placeholder:dark:text-white text-sm text-gray-900 bg-gray-50 rounded-main border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Your password"
                      />
                      <ErrorMessage
                        name="password"
                        component="div"
                        className="text-red-500"
                      />
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="address"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Role
                      </label>
                      <Field
                        as="select"
                        id="role"
                        name="role"
                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-main border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"        
                      >
                        <option value="">SELECT ROLE : </option>
                        {roles.map((r, i) => (
                          <option key={i} value={r.id}>
                            {r.name}
                          </option>
                        ))}
                      </Field>
                      <ErrorMessage
                        name="role"
                        component="div"
                        className="text-red-500"
                      />
                    </div>

                    <div className=" mb-6 w-full ">
                      <label htmlFor="file" className="mb-3">
                        Avatar
                      </label>
                      <Field
                        type="file"
                        name="file"
                        id="file"
                        setFieldValue={setFieldValue}
                        component={CustomInput}
                        className="input-file bg-gray-50 rounded-main border dark:text-white  focus:ring-blue-500 focus:border-blue-500   dark:border-gray-600 file:bg-black border-slate-300 h-[45px]  file:text-black"
                      />
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
          </div>
        </Modal>
      )}
    </>
  );
};

function CustomInput({ field, form, isSubmitting, ...props }) {
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
        {...props}
      />
      {preview && (
        <div className="w-24 rounded-main mt-5">
          <img
            className="rounded-main"
            src={preview}
            alt="dummy"
            width="100"
            height="100"
          />
        </div>
      )}
    </div>
  );
}

export default CreateNew;
