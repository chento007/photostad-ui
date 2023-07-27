"use client";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import React, { use, useEffect, useState } from "react";
import { BASE_URL } from "@/lib/baseUrl";
import { useSelector } from "react-redux";
import { useGetAdminQuery } from "@/store/features/auth/authApiSlice";
import { CgLayoutGrid } from "react-icons/cg";
import { toast } from "react-toastify";
import { useGetTutorialByIdQuery } from "@/store/features/tutorial/tutorialApiSlice";

const validationSchema = Yup.object({
  keyword: Yup.string().required("Keyword is required"),
  openGraphTitle: Yup.string().required("Og Title is required"),
  openGraphDescription: Yup.string().required("Og Description is required"),
  openGraphUrl: Yup.string().required("Og Url is required"),
});
export default function SeoForm({ id, closeModal }) {

  const [loading, setLoading] = useState(false);
  const { data } = useGetAdminQuery()
  const token = useSelector((state) => state?.auth?.accessToken);
  const state = useSelector((state) => state);
  const userId = useSelector((state) => state?.api?.queries.getAdmin?.data?.data?.id);
  const [dataTutorial, setDataTutorial] = useState(null);
  // const [tutorial,setTutorial]=useState(null);

  const {
    data: tutorial,
    isLoading,
    isSuccess,
  } = useGetTutorialByIdQuery(id);

  useEffect(() => {
    setDataTutorial(tutorial?.data);
  }, [tutorial,])

  useEffect(() => {
    setDataTutorial(tutorial?.data);
  }, [])
  
  const handleSetSeo = async (values) => {
    setLoading(true);
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);
    console.log(userId, 'userId');

    let raw = JSON.stringify({
      title: "aqefrg ewrfegty rgthry",
      createdBy: data?.data?.id,
      keyword: values.keyword,
      openGraphTitle: values.openGraphTitle,
      openGraphUrl: values.openGraphUrl,
      openGraphDescription: values.openGraphDescription,
      openGraphType: "Photo Editor",
    });

    let requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${BASE_URL}/tutorial-managements/${id}/config-seo`, requestOptions)
      .then((response) => {
        response.json();
      })
      .then((result) => {
        console.log(result);
        setLoading(false);
        toast.success("SEO Updated Successfully");
      })
      .catch((error) => {
        console.log("error", error);
        setLoading(false);
        toast.error("Something went wrong");
      });
  };

  return (
    <Formik
      enableReinitialize={true}
      initialValues={{
        title: dataTutorial?.title,
        createdBy: data?.data?.id,
        keyword: dataTutorial?.keyword,
        openGraphTitle: dataTutorial?.openGraphTitle,
        openGraphUrl: dataTutorial?.openGraphUrl,
        openGraphDescription: dataTutorial?.openGraphDescription,
        openGraphType: dataTutorial?.openGraphType,
      }}
      validationSchema={validationSchema}
      onSubmit={async (values, { resetForm }) => {
        handleSetSeo(values);
        closeModal();
        resetForm();
      }}
    >
      {({ isSubmitting, setFieldValue, values }) => (
        <Form>
          <div className="grid grid-cols-1 mt-10 md:grid-cols-2 gap-5">
            <div className=" w-full">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Keyword
              </label>
              <Field
                type="text"
                name="keyword"
                values={values.keyword}
                className="bg-white border border-gray-300 text-gray-900 text-sm rounded-main focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="John"
              />
              <ErrorMessage
                name="keyword"
                component="h1"
                className="text-red-500 text-xs italic"
              />
            </div>
            <div className=" w-full">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                OpenGraph Title
              </label>
              <Field
                type="text"
                values={values.openGraphTitle}
                name="openGraphTitle"
                className="bg-white border border-gray-300 text-gray-900 text-sm rounded-main focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder=" "
              />
              <ErrorMessage
                name="openGraphTitle"
                component="h1"
                className="text-red-500 text-xs italic"
              />
            </div>
            <div className=" w-full">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                OpenGraph Url
              </label>
              <Field
                type="text"
                values={values.openGraphUrl}
                name="openGraphUrl"
                className="bg-white border border-gray-300 text-gray-900 text-sm rounded-main focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder=" "
              />
              <ErrorMessage
                name="openGraphUrl"
                component="h1"
                className="text-red-500 text-xs italic"
              />
            </div>
            <div className=" w-full">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                OpenGraph Description
              </label>
              <Field
                type="text"
                values={values.openGraphDescription}
                name="openGraphDescription"
                className="bg-white border border-gray-300 text-gray-900 text-sm rounded-main focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder=" "
              />
              <ErrorMessage
                name="openGraphDescription"
                component="h1"
                className="text-red-500 text-xs italic"
              />
            </div>
          </div>
          <div className="flex justify-end ">
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-main px-5 max-sm:px-2 p-2.5 bg-black text-white   mt-5"
            >
              Save
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
