
'use client';
import DeleteIcon from '@/components/icon/DeleteIcon';
import { useDeleteRequestTutorialMutation } from '@/store/features/requestTutorial/requestTutorialApiSlice';

import { Button, Modal } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { toast } from 'react-toastify';

export default function DeleteRequestTutorial({ id }) {
  const [openModal, setOpenModal] = useState();
  const props = { openModal, setOpenModal };
  const [deleteRequestTutorial, { isLoading, isError, isSuccess }] =
    useDeleteRequestTutorialMutation();

  const handleDeleteTutorial = async (id) => {
    console.log(id, 'id');
    try {
      const response = await deleteRequestTutorial(id);
      console.log("respone original : ", response)
      setTimeout(() => {
        if(response.data){
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
        }
      
        if (response.error) {
          toast.error(response.error.data.message, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          toast.error(response.error.data.errors, {
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
    } catch (error) {
      console.log("error hz chento : ", error);
      setTimeout(() => {
        toast.error(error, {
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
    } setOpenModal(undefined);
  };


  return (
    <>
      <button onClick={() => props.setOpenModal('pop-up')}> <DeleteIcon stroke={"red"} /></button>
      <Modal show={props.openModal === 'pop-up'} size="md" popup onClose={() => props.setOpenModal(undefined)}>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this tutorial?
            </h3>
            <div className="flex justify-center gap-4">
              <button className='btn rounded-main bg-red text-white' onClick={() => handleDeleteTutorial(id)}>
                {/* write yes I'm sure  */}
                {isLoading ? 'Loading...' : 'Yes, I\'m sure'}
              </button>
              <button className='btn rounded-main bg-gray-300 text-black' onClick={() => props.setOpenModal(undefined)}>
                No, cancel
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}


