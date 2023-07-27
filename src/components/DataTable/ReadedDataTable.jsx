"use client";

import moment from "moment";
import { useTheme } from "next-themes";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import DataTable, { createTheme } from "react-data-table-component";
import TableLoading from "../loading/TableLoading";
import { toast } from "react-toastify";
import { useDeleteRequestTutorialMutation, useGetAllReadedQuery, useGetAllRequestTutorialsQuery } from "@/store/features/requestTutorial/requestTutorialApiSlice";
import DeleteRequestTutorial from "../modal/requesttutorial/RequestTutorial";

const ReadedDataTable = () => {

  const themeColor = useTheme();
  const [data, setData] = useState([]);
 
// //useGetAllReadedQuery
//   const { data: resData, isFetching } = useGetAllReadedQuery({
//     page: currentPage,
//     limit: perPage,
//   });
//   const [perPage, setPerPage] = useState(10);
//   const [currentPage, setCurrentPage] = useState(1);
const [perPage, setPerPage] = useState(10);
const [currentPage, setCurrentPage] = useState(1);
  const {
    data: resData,
    isLoading,
    error,
  } = useGetAllRequestTutorialsQuery({ page: currentPage, limit: perPage, isRead: true, isReadAll: false });
  const [deleteReq, { isLoading: isDeleting,isFetching, isSuccess: deleted }] =
    useDeleteRequestTutorialMutation();

  useEffect(() => {
    if (resData) {
      setData(resData?.data?.list);
    }
  }, [resData]);
  useEffect(() => {
    if (deleted) {
      toast.success("Request deleted successfully");
    }
  }, [deleted]);

  // handle per page change
  const handlePerRowsChange = (perPage, page) => {
    setPerPage(perPage);
    setCurrentPage(page);
  };
  const handleDelete = (id) => {
    deleteReq(id);
    toast.success("Request deleted successfully");
    const updatedData = data.filter((item) => item.id !== id);
    setData(updatedData);
  };
  console.log(data, "dara");

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
      width: "150px",

      cell: (row) => (
        <>
          <DeleteRequestTutorial id={row.id} />
          {/* <button
            className="flex border-none items-center  rounded-main mr-3 text-white p-2 px-3 space-x-2 bg-[#E85854] justify-center"
            // onClick={() => handleDelete(row.id)}
            // onClick={() => handleDelete(row.id)}
            onClick={() => }
          >
            <Image
              src={"/assets/icons/trush-square.svg"}
              width={23}
              height={23}
              alt="delete icon"
            />
            <span className="max-sm:hidden">Delete</span>
          </button> */}

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
    );
  }

  return (
    <DataTable
      columns={columns}
      data={resData?.data?.list}
      pagination
      paginationServer
      highlightOnHover
      paginationTotalRows={data?.data?.total}
      onChangePage={(page) => setCurrentPage(page)}
      onChangeRowsPerPage={handlePerRowsChange}
      theme={themeColor.theme === "dark" ? "dark" : "light"}
      customStyles={
        themeColor.theme === "dark" ? customeStyleDark : customeStylesLight
      }
    />
  );
};

export default ReadedDataTable;
