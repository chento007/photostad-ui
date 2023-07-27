"use client";

import DeleteIcon from "@/components/icon/DeleteIcon";
import Loading from "@/components/loading/Loading";
import { useDeleteUserMutation } from "@/store/features/user/userApiSlice";
import { Button, Modal } from "flowbite-react";
import { useEffect, useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function DeleteUser({ id }) {
  const [openModal, setOpenModal] = useState();
  const props = { openModal, setOpenModal };
  const [
    deleteUser,
    { isSuccess: deleted, isLoading, isError: FailedToDeleteUser },
  ] = useDeleteUserMutation();
  const state = useSelector((state) => state);
  // console.log(state,'test state with no dispatch');
  // useEffect(() => {
  //   if (deleted) {
  //     toast.success("User deleted successfully");
  //     setOpenModal(undefined);
  //   }
  //   if (FailedToDeleteUser) {
  //     toast.error("Failed to delete user2");
  //   }
  //   // if loading set cursor to wait
  // }, [FailedToDeleteUser, deleted]);
  if (isLoading) {
    document.body.style.cursor = "wait";
    return <Loading />;
  } else {
    document.body.style.cursor = "default";
  }
  const handleDeleteUser = async (userId) => {
    try {
      console.log("user id : ", userId);
      const response = await deleteUser({ id: userId });
      console.log("delete user response: ", response);
      setTimeout(() => {
        toast.success(response.data.message, {
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
      console.error("Error deleting user: ", error);
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
          toast.error("Failed to delete.", {
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
    <>
      <button onClick={() => props.setOpenModal("pop-up")}>
        {" "}
        <DeleteIcon stroke={"red"} />
      </button>
      <Modal
        show={props.openModal === "pop-up"}
        size="md"
        popup
        onClose={() => props.setOpenModal(undefined)}
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this user?
            </h3>
            <div className="flex justify-center gap-4">
              <button
                className="btn rounded-main bg-red text-white"
                onClick={() => handleDeleteUser(id)}
              //  setTimeout(()=> deleteUser(id),2000)
              >
                {/* write yes I'm sure  */}
                {isLoading ? "Loading..." : "Yes, I'm sure"}
              </button>
              <button
                className="btn rounded-main bg-gray-300 text-black"
                onClick={() => props.setOpenModal(undefined)}
              >
                No, cancel
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}