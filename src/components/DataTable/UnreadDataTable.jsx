"use client";

import { useGetAllRequestTutorialsQuery, useGetAllUnreadQuery, useMarkAsReadMutation } from "@/store/features/requestTutorial/requestTutorialApiSlice";
import {
  useDeleteUnreadReqMutation,
  useGetUnreadReqQuery,
} from "@/store/features/tutorial/unreadTotorial/unreadApiSlice";
import moment from "moment";
import { useTheme } from "next-themes";
import Image from "next/image";
import React, { use, useEffect, useState } from "react";
import DataTable, { createTheme } from "react-data-table-component";
import { toast } from "react-toastify";
import DeleteRequestTutorial from "../modal/requesttutorial/RequestTutorial";

const UnreadReqDataTable = () => {

  const [data, setData] = useState([]);
  const themeColor = useTheme();



  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);


    const {
      data: resData,
      isLoading,
      isFetching,
      error,
    } = useGetAllRequestTutorialsQuery({ page: currentPage, limit: perPage, isRead: false, isReadAll: false });

  // const { data: resData, isFetching } = useGetAllUnreadQuery({ page: currentPage, limit: perPage });



  const [deleteReq, { isSuccess }] = useDeleteUnreadReqMutation();
  const [markAsRead, { isSuccess: markedasRead }] =
    useMarkAsReadMutation();


  useEffect(() => {
    if (resData) {
      setData(resData?.data?.list);
    }
  }, [resData]);
  // handle per page change
  const handlePerRowsChange = (perPage, page) => {

    setPerPage(perPage)
    setCurrentPage(page)
  }

  const handleMarkAsRead = async (id) => {

    try {

      const response = await markAsRead(id);
      console.log("respone  mark as read: ", response);
      setTimeout(() => {
        if (response.data) {
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

      }, 100);      // Handle the response
    } catch (error) {
      console.log("error : ", error);
      setTimeout(() => {

        // if (response.error) {
        //   toast.error(response.error.data.message, {
        //     position: "top-right",
        //     autoClose: 2000,
        //     hideProgressBar: false,
        //     closeOnClick: true,
        //     pauseOnHover: false,
        //     draggable: true,
        //     progress: undefined,
        //     theme: "light",
        //   });
        //   toast.error(response.error.data.errors, {
        //     position: "top-right",
        //     autoClose: 2000,
        //     hideProgressBar: false,
        //     closeOnClick: true,
        //     pauseOnHover: false,
        //     draggable: true,
        //     progress: undefined,
        //     theme: "light",
        //   });
        // }

      }, 100);
      // Handle the error
    }

  };


  // react data table component
  createTheme("light", {
    text: {
      light: "#1b254b",
      dark: "white",
    },
    rows: {
      style: {
        backgroundColor: "white",
        "&:nth-child(odd)": {
          backgroundColor: "black",
        },
      },
    },

    background: {
      default: "#f5f8fe",
    },
  });
  createTheme("dark", {
    text: {
      light: "#1b254b",
      dark: "white",
    },
    background: {
      default: "#111c44",
    },
    rows: {
      style: {
        backgroundColor: "#111c44",
        "&:nth-child(odd)": {
          backgroundColor: "#1b254b",
        },
      },
    },
  });
  const customeStylesLight = {
    headCells: {
      style: {
        fontSize: "16px",
      },
    },
    //set odd row background color to whitesmoke and even row to white
    rows: {
      style: {
        backgroundColor: "white",
        "&:nth-child(odd)": {
          backgroundColor: "#f5f8fe",
        },
      },
    },
    header: {
      style: {
        padding: 0,
      },
    },
  };
  const customeStyleDark = {
    headCells: {
      style: {
        fontSize: "16px",
      },
    },
    //set odd row background color to whitesmoke and even row to white
    rows: {
      style: {
        backgroundColor: "#0b1437",
        "&:nth-child(odd)": {
          backgroundColor: "#111c44",
        },
      },
    },
    header: {
      style: {
        padding: 0,
      },
    },
  };

  const columns = [
    {
      name: "Request Messages",
      selector: (row) => row.description,
      sortable: true,
      // set width for column
      width: "650px",
    },
    {
      name: "Date",
      selector: (row) => moment(row.createdAt).format("d/mm/yyyy"),
      sortable: true,

    },
    {
      name: "Actions",
      width: "300px",
      cell: (row) => (
        <>
          <DeleteRequestTutorial id={row.id} />
          {!row.isRead && (
            <button
              className="flex  bg-secondary text-white rounded-main space-x-2 px-10 items-center pl-10 btn-outline justify-center h-[40px]"
              // onClick={() => handleMarkAsRead(row.id)}
              onClick={() => handleMarkAsRead(row.id)}
            >
              <Image
                src={"/assets/icons/chart-success.svg"}
                width={22}
                height={22}
                alt="delete icon"
                className=" invert"
              />
              <span className="max-sm:hidden">Mark as Read</span>
            </button>
          )}
        </>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  if (isFetching) {
    return (
      <div className="fixed left-0 top-0 w-full h-full z-50 flex justify-center items-center bg-white  border-white">
        <Image
          width={400}
          height={400}
          alt="loading..."
          className=" object-contain text-center  bg-white  border-white"
          // src="https://gifdb.com/images/high/confused-anime-sakura-loading-buff-tt8pr2zlspinjdlv.gif"
          src="/assets/loading/giphy.gif"
        />
      </div>
    )
  }
  return (
    <div className="h-screen">
      <DataTable
        columns={columns}
        data={data}
        pagination
        paginationServer
        highlightOnHover
        paginationTotalRows={resData?.data?.total}
        onChangePage={(page) => setCurrentPage(page)}
        onChangeRowsPerPage={handlePerRowsChange}
        theme={themeColor.theme === "dark" ? "dark" : "light"}
        customStyles={
          themeColor.theme === "dark" ? customeStyleDark : customeStylesLight
        }
      />
    </div>
  );
};

export default UnreadReqDataTable;
