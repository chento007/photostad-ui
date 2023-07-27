"use client";
import { useRouter } from "next/navigation";
import DeleteIcon from "@/components/icon/DeleteIcon";
import { useDeleteUserMutation } from "@/store/features/user/userApiSlice";
import { Button, Modal } from "flowbite-react";
import { useEffect, useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";


export default function EditorNavSidebar({ title }) {
  const router = useRouter();
  const gotoLogin = () => {
    router.push("/login");
  };
  const [openModal, setOpenModal] = useState();
  const props = { openModal, setOpenModal };


  return (
    <>
      <button
        className="dropdown-item text-sm hover:text-black hover:bg-gray-400"
        onClick={() => props.setOpenModal("pop-up")}
      >
        {" "}
        {title}{" "}
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
              You need to login first to access this feature
            </h3>
            <div className="flex justify-center gap-4">
              <button
                className="btn rounded-main bg-red text-white"
                onClick={gotoLogin}
              >
                {/* write yes I'm sure  */}
                Go to login
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
