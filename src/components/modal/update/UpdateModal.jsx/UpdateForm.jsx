
//({ id, title, name, description, thumbnail, htmlContent, closeModal, userId })
"use client";
import {
  useGetTutorialByIdQuery,
  useUpdateTutorialMutation,
} from "@/store/features/tutorial/tutorialApiSlice";

import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Image from "next/image";
import React, { use, useEffect, useRef, useState } from "react";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  description: Yup.string().required("Description is required"),
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

const FILE_SIZE = 1024 * 1024 * 5; // 5MB

const SUPPORTED_FORMATS = [
  "image/jpg",
  "image/jpeg",
  "image/gif",
  "image/png",
  "image/webp",
];

const UpdateForm = ({ id, title, name, description, thumbnail, htmlContent, closeModal, userId }) => {
  // call getById from rtk query
  const { data, isLoading, error } = useGetTutorialByIdQuery(id);
  console.log(id, "id of tutorial");
  const tutorialById = data?.data;
  const [imgId, setImgId] = useState(0);
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
  const [editorData, setEditorData] = useState(data?.data?.htmlContent); //ckeditor data
  const [editorLoaded, setEditorLoaded] = useState(false);
  const [tutorial, setTutorial] = useState({});
  const [isChange, setIsChange] = useState(false);
  const [imgName, setImgName] = useState(""); // for upload image to db
  const [preview, setPreview] = useState("");

  /** ckeditor goes here  */
  const editorRef = useRef();
  const { CKEditor, DecoupledEditor } = editorRef.current || {};
  const [file, setFile] = useState(null); // State to store the selected file
  useEffect(() => {
    editorRef.current = {
      CKEditor: require("@ckeditor/ckeditor5-react").CKEditor,
      DecoupledEditor: require("@ckeditor/ckeditor5-build-decoupled-document"),
    };
    setEditorLoaded(true);
  }, []);

  /*use useEffect in order to assign data to state*/
  useEffect(() => {

    if (tutorialById) {

      setTutorial(tutorialById);
      setEditorData(tutorialById?.htmlContent);

    }

  }, [tutorialById]);

  useEffect(() => {

    setPreview(tutorial?.thumbnail?.name);

  }, []);

  const [updateTutorial, { isLoading: isSubmitting, isSuccess }] =
    useUpdateTutorialMutation();


  function stringToSlug(str) {
    return str
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

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
      return imgId || 4;
    } catch (error) {
      console.log("error : " + error);
    }
  };

  const handleSubmit = async (values) => {

    let raw = JSON.stringify({
      title: values.name,
      name: values.name,
      slug: stringToSlug(values.description),
      description: values.description,
      thumbnail: values.thumbnail, //refer to imgId
      htmlContent: editorData,
    });

    try {
      const respone = await updateTutorial({ id: id, data: raw }).unwrap();
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
    } catch (error) {
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
          toast.error("Update has been failed.", {
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

  const handleEditorChange = (newData) => {
    setEditorData(newData);
  };
  const handleInputChange = (e) => {

    let data = { ...tutorial };
    data[e.target.name] = e.target.value;
    setTutorial(data);
  };


  const handleUploadImage = async (file) => {

    try {

      var formdata = new FormData();
      formdata.append("file", file.target.files[0]);

      var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
      };

      const response = await fetch("https://photostad-api.istad.co/api/v1/files", requestOptions);

      const res = await response.json();

      const result = await res.data.name;

      setImgName(result);

      setPreview(result);

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


  return (
    <div className="bg-white dark:bg-secondary  w-full">
      <h1 className="text-black dark:text-white text-center text-3xl font-semibold">
        update Tutorial
      </h1>
      <Formik
        enableReinitialize={true}

        initialValues={{
          name: tutorial?.name,
          description: tutorial?.description,
          thumbnail: tutorial?.thumbnail?.id,
          htmlContent: tutorial?.htmlContent,
          image: tutorial?.thumbnail?.name,
          file: undefined,
        }}

        validationSchema={validationSchema}

        onSubmit={async (values, { setSubmitting, resetForm }) => {

          const imageid = await insertImgToDB(preview);
          values.thumbnail = imageid;

          console.log(imageid, "imgId");

          if (values.thumbnail == undefined) {
            values.thumbnail = tutorialById.thumbnail.id;
          }
          handleSubmit(values);
          setSubmitting(false);
          resetForm();
          closeModal();
        }}
      >

        {({ isSubmitting, setFieldValue, values }) => (
          <Form>
            <h1>is submmit : {isSubmitting}</h1>
            <div className="grid grid-cols-1 mt-10 md:grid-cols-2 gap-5">
              <div className=" w-full">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Title
                </label>
                <Field
                  type="text"
                  name="name"
                  value={values.name}
                  onChange={(e) => handleInputChange(e)}
                  className="bg-white border border-gray-300 text-gray-900 text-sm rounded-main focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="John"
                />
                <ErrorMessage
                  name="name"
                  component="h1"
                  className="text-red-500 text-xs italic"
                />
              </div>
              {/* file for avarta */}
              <div className="w-full">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Thumbnail
                </label>

                <Field
                  className="file-input rounded-main  w-full bg-white dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  name="file"
                  type="file"
                  title="Select a file"
                  setFieldValue={setFieldValue} // Set Formik value
                  isSubmitting={isSubmitting}
                  onChange={handleUploadImage}
                />
                {
                  preview ? <>
                    <div className="w-24 rounded-[16px] mt-5">
                      <img src={`https://photostad-api.istad.co/files/${preview}`} alt={values.image} width="100" height="100" />
                    </div>
                  </> : <div className="w-24 rounded-[16px] mt-5">
                    <img src={`https://photostad-api.istad.co/files/${values.image}`} alt={values.image} width="100" height="100" />
                  </div>
                }

                <ErrorMessage
                  name="file"
                  component="h1"
                  className="text-red-500 text-xs italic"
                />
              </div>
              {/* email */}
              <div className="md:mb-5 mb-2 md:col-span-2 w-full">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Description
                </label>
                <Field
                  type="text"
                  name="description"
                  component="textarea"
                  rows="4"
                  value={values.description}
                  onChange={(e) => handleInputChange(e)}
                  className="block p-2.5 w-full text-sm text-gray-900 bg-white rounded-main border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="description"
                />
                <ErrorMessage
                  name="description"
                  component="h1"
                  className="text-red-500 text-xs italic"
                />
              </div>
            </div>
            {/* ckeditor  */}
            <div>
              {editorLoaded ? (
                <CKEditor
                  data={editorData}
                  editor={DecoupledEditor}
                  config={{
                    ckfinder: {
                      // Upload the images to the server using the CKFinder QuickUpload command
                      // You have to change this address to your server that has the ckfinder php connector
                      uploadUrl: " https://photostad-api.istad.co/api/v1/files", //Enter your upload url
                    },
                  }}
                  //create upload adapter to send image to server in Ckeditor
                  onReady={(editor) => {
                    editor.ui
                      .getEditableElement()
                      .parentElement.insertBefore(
                        editor.ui.view.toolbar.element,
                        editor.ui.getEditableElement()
                      );
                    editor.plugins.get("FileRepository").createUploadAdapter = (
                      loader
                    ) => {
                      return new MyUploadAdapter(loader);
                    };
                    console.log("Editor is ready to use!", editor);
                  }}
                  onChange={(event, editor) => {
                    const data = editor.getData();

                    console.log({ event, editor, data });

                    setEditorData(data.replace(/"/g, "'"));
                    handleEditorChange(data);
                  }}
                  onError={(error, { willEditorRestart }) => {
                    // If the editor is restarted, the toolbar element will be created once again.
                    // The onReady callback will be called again and the new toolbar will be added.
                    // This is why you need to remove the older toolbar.
                    if (willEditorRestart) {
                      this.editor.ui.view.toolbar.element.remove();
                    }
                  }}
                />
              ) : (
                <div>Editor loading</div>
              )}
            </div>
            <button
              type="submit"
              // disabled={isSubmitting}
              className="rounded-main px-5 max-sm:px-2 p-2.5 bg-black text-white   mt-5"
            >
              {isLoading ? "posting..." : "Post now"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );


};
function CustomInput({ handleFileUpload, image, field, form, isSubmitting, ...props }) {


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
          handleFileUpload(event);
        }}
        {...props}
      />
      {preview ? (
        <div className="w-24 rounded-[16px] mt-5">
          <Image src={`https://photostad-api.istad.co/files/${preview}`} alt="dummy" width="100" height="100" />
        </div>
      ) : <>
        <div className="w-24 rounded-[16px] mt-5">
          <Image src={`https://photostad-api.istad.co/files/${image}`} alt="dummy" width="100" height="100" />
        </div>
      </>}
    </div>
  );
}

class MyUploadAdapter {
  constructor(loader) {
    this.loader = loader;
  }

  upload() {
    return this.loader.file.then(
      (file) =>
        new Promise((resolve, reject) => {
          // Your upload logic here
          // Example using fetch:
          const formData = new FormData();
          formData.append("file", file);

          fetch("https://photostad-api.istad.co/api/v1/files", {
            method: "POST",
            body: formData,
          })
            .then((response) => {
              if (response.ok) {
                response.json().then((data) => {
                  console.log(data, "data upload image");
                  const url = data?.data?.url;
                  // const cleanUrl = url.replace(/\\/g,'')
                  resolve({ default: url });
                });
              } else {
                reject(response.statusText);
              }
              console.log(response, "response upload image");
            })
            .catch((error) => {
              reject(error);
              console.log(error, "error upload image");
            });
        })
    );
  }

  abort() {
    // Abort upload logic here
  }
}

export default UpdateForm;