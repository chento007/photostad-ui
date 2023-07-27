"use client";
import Loading from "../loading/Loading";
import { useCreateRequestTutorialMutation } from "@/store/features/requestTutorial/requestTutorialApiSlice";
import { useGetUserQuery } from "@/store/features/user/userApiSlice";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";

const validationSchema = Yup.object({
  subject: Yup.string().required("Subject is required"),
  description: Yup.string().required("descriptions is required"),
});

export default function RequestForm({ uuid }) {
  const { data: session } = useSession();
  const {data:user} = useGetUserQuery()
  const [
    createRequestTutorial,
    { isLoading: creating, isSuccess: created, isError: failed },
  ] = useCreateRequestTutorialMutation();
  const router = useRouter();

  const handleSubmit = async (values) => {
    let myHeaders = new Headers();
    console.log(uuid, "uuid in reque");
    myHeaders.append("Content-Type", "application/json");
    let raw = JSON.stringify({
      userUUID: uuid,
      description: values?.description,
    });

    try {
      await createRequestTutorial(raw);
    } catch (err) {
      console.log(err);
    }

    // addRequestTutorials(requestOptions);
  };
  // if(!user || !session) {
  //   router.push("/login");
  
  // }

  useEffect(() => {
    if (created) {
      toast.success("Request tutorial has been sent");
    }
    if (failed) {
      toast.error("Failed to send request tutorial");
    }
  }, [created, failed]);
  if (creating) return <Loading />;

  return (
    <Formik
      initialValues={{
        subject: "",
        description: "",
      }}
      validationSchema={validationSchema}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        setTimeout(() => {
          //   alert(JSON.stringify(values, null, 2));
          handleSubmit(values);
          resetForm();
          setSubmitting(false);
        }, 2000); // set timeout for 2 seconds
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <div className="mb-6">
            <label
              htmlFor="subject"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Subject
            </label>
            <Field
              type="text"
              id="subject"
              name="subject"
              placeholder="eg. How can I use this on mobile phone?"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-[16px] focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            />
            <ErrorMessage
              name="subject"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="description"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Message
            </label>
            <Field
              as="textarea"
              id="message"
              name="description"
              placeholder="eg. I want to know how to use this on mobile phone."
              className="shadow-sm rounded-[16px] w-full h-52 bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            />
            <ErrorMessage
              name="message"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>
          <div className="w-full flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-red p-2.5 w-full md:w-fit text-white rounded-main px-7"
            >
              Send
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
