"use client";
import React from "react";
import { Button, Modal, Select } from "flowbite-react";
import { AiOutlineCloseCircle, AiOutlinePlusCircle } from "react-icons/ai";
import Image from "next/image";
import { TbSeo } from "react-icons/tb";
import SeoForm from "./SeoForm";
import {TfiClose} from 'react-icons/tfi'



export default function SeoModal({ id }) {
  const [openModal, setOpenModal] = React.useState(undefined);
  const [modalSize, setModalSize] = React.useState("6xl");
  const props = { modalSize, openModal, setModalSize, setOpenModal };

  return (
    <>
      <button
        onClick={() => props.setOpenModal("size")}
        className="rounded-main p-2.5  text-white  "
      >
        <TbSeo className="text-[23px] text-black dark:text-white" />
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

        <Modal.Body className="bg-white dark:bg-secondary rounded-main">
          <h1 className="font-semibold text-center text-[24px] my-10 dark:text-white">
            Search Engine Optimization
          </h1>

          <SeoForm id={id} closeModal={()=> props.setOpenModal(undefined)}/>

         
        </Modal.Body>
      </Modal>
    </>
  );
}
