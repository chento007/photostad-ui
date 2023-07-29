"use client";
import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { BASE_URL } from "@/lib/baseUrl";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import Loading from "@/components/loading/Loading";
import { useGetUserByIdQuery, useUpdateUserMutation } from "@/store/features/user/userApiSlice";

const FILE_SIZE = 1024 * 1024 * 5; // 5MB
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

const FormUpate = ({ id, email, closeModal }) => {

  const [isLoadingComponent, setIsLoading] = useState(false);
  const [imageURL, setImageURL] = useState("");
  const [informationUser, setInformationUser] = useState(null);
  const [information, setInformation] = useState(null);
  const [initialValues, setInitialValues] = useState({});
  const [preview, setPreview] = useState(null);
  const { data: user, isLoading, isSuccess } = useGetUserByIdQuery(id);
  const token = useSelector((state) => state?.auth?.accessToken);
  const [selectedGender, setSelectedGender] = useState("male"); // Set the default value here
  const [imageName, setImageName] = useState("");
  const [updateUser] = useUpdateUserMutation();


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

  useEffect(() => {
    if (isSuccess && user && user.data) {
      console.log("user : ", user.data);
      setInformationUser(user.data);
    }
  }, [isSuccess, user]);

  useEffect(() => {
    setPreview(informationUser?.avatar?.name);
    setSelectedGender(informationUser?.gender ? informationUser?.gender : "male");
    setInformation(informationUser);
  }, [informationUser, isSuccess]);

  if (isLoadingComponent) return <Loading />

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={{

          username: information?.username,
          gender: information?.gender,
          first_name: information?.givenName,
          last_name: information?.familyName,
          dob: information?.dob,
          address: information?.address,
          phone_number: information?.phoneNumber,
          biography: information?.biography,
          image: information?.avatar?.name,
          avatar: information?.avatar?.id,
          file: undefined,

        }}


        validationSchema={validationSchema}

        onSubmit={async (values, { setSubmitting, resetForm }) => {
          var idImage = null;
          // upload image to server
          if (imageName != undefined || imageName != null) {
            var raw = JSON.stringify({
              name: preview,
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
            const response = await updateUser({ id: id, data: rawUpdate }).unwrap();
            
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
          }
          setSubmitting(false);
          resetForm();
        }}
      >
        {({ isSubmitting, setFieldValue, values }) => (
          <Form className="h-full ">
            <div className="grid gap-x-10 gap-6 mb-6 md:grid-cols-2 w-full ">
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
                  <option value="">Choose a gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </Field>
                <ErrorMessage
                  name="gender"
                  component="div"
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
                  value={values.first_name}
                  name="first_name"
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
                    Date of birth
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
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-main focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                <label htmlFor="file"   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Avatar
                </label>


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
              type="submit"
              disabled={isSubmitting}
              className="rounded-main px-5 max-sm:px-2 p-2.5 bg-black text-white mt-5"
            >
              {isLoading ? "posting..." : "Post now"}
            </button>
          </Form>
        )}
      </Formik>

    </>
  );
};

// function FileUpload({ field, form, setFieldValue }) {
//   const [previewImage, setPreviewImage] = useState(null);

//   const handleChange = (event) => {
//     const file = event.currentTarget.files[0];
//     form.setFieldValue(field.name, file);
//     setPreviewImage(URL.createObjectURL(file));
//   };

//   return (
//     <>
//       <div className="flex justify-between items-center">
//         <input
//           type="file"
//           onChange={handleChange}
//           className="file-input file-input-bordered file-input-[black] h-[45px] text-black bg-white dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 rounded-main dark:focus:border-blue-500"
//         />
//         {previewImage && (
//           <img
//             src={previewImage}
//             alt="preview"
//             className="mt-4 rounded-full w-20 h-20"
//           />
//         )}
//       </div>
//     </>
//   );
// }
export default FormUpate;
