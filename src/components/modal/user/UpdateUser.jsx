"use client";
import React from "react";
import { AiOutlineCloseCircle, AiOutlinePlusCircle } from "react-icons/ai";
import * as Yup from "yup";
import { Button, Modal, Select } from "flowbite-react";

import Image from "next/image";
import FormUpate from "./FormUpdate";
import { TfiClose } from "react-icons/tfi";


const UpdateUser = ({ id, email }) => {
  
  const [openModal, setOpenModal] = React.useState(undefined);
  const [modalSize, setModalSize] = React.useState("6xl");
  const props = { modalSize, openModal, setModalSize, setOpenModal };
    
  return (
    <>
      <button
        onClick={() => props.setOpenModal("size")}
        className="rounded-main p-2.5  text-white  "
      >
        <Image
          src={"/assets/icons/edit.svg"}
          width={23}
          height={23}
          alt="delete icon"
          className="dark:invert"
        />
      </button>
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
            Update user
          </h2>
          <FormUpate id={id} email={email} closeModal={()=>props.setOpenModal(undefined)} />
        </div>
      </Modal>
    </>
  );
};

export default UpdateUser;
