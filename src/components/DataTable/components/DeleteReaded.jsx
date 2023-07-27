
'use client';
import DeleteIcon from '@/components/icon/DeleteIcon';
import { useDeleteTutorialMutation } from '@/store/features/tutorial/tutorialApiSlice';

import { Button, Modal } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { toast } from 'react-toastify';

export default function  DeleteReaded({id}) {
  const [openModal, setOpenModal] = useState();
  const props = { openModal, setOpenModal };
  const [deleteTutorial, { isLoading, isError , isSuccess}] =
  useDeleteTutorialMutation();
  
  const handleDeleteTutorial =async (id) => {
    console.log(id,'id');
    await deleteTutorial(id);
    toast.success("Tutorial deleted successfully", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true,
    });
  };
  
  useEffect(()=>{
    if(isSuccess){
      toast.success('Tutorial deleted successfully');
      setOpenModal(undefined);
    }
    if(isError){
      toast.error('Failed to delete v');
    }
    // if loading set cursor to wait
    if(isLoading){
        document.body.style.cursor = 'wait';
    }else{
        document.body.style.cursor = 'default';
    }
  },[isError, isLoading, isSuccess])

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
              <button  className='btn rounded-main bg-red-500 text-white' onClick={()=>handleDeleteTutorial(id)}>
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


