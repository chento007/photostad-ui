"use client";

import {
  useDeleteRequestTutorialMutation,
  useGetAllRequestTutorialsQuery,
} from "@/store/features/requestTutorial/requestTutorialApiSlice";

import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import { CiRead, CiUnread } from 'react-icons/ci';
// import DeleteIcon from "../icon/DeleteIcon";
import Image from "next/image";
import DataTable, { createTheme } from "react-data-table-component";
import DeleteIcon from "@/components/icon/DeleteIcon";
import moment from "moment";
import { useGetAdminQuery } from "@/store/features/auth/authApiSlice";
import { toast } from "react-toastify";
import DeletModal from "../modal/tutorial/DeleteModal";
import DeleteRequestTutorial from "../modal/requesttutorial/RequestTutorial";

const ListOfReqDataTable = () => {


  const themeColor = useTheme();

  const [data, setData] = useState([]);

  
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const {
    data: resData,
    isLoading,
    error,
  } = useGetAllRequestTutorialsQuery({ page: currentPage, limit: perPage, isRead: true, isReadAll: true });


  const [deleteReq, { isLoading: isDeleting, isSuccess: deleted }] =
    useDeleteRequestTutorialMutation();

  const { data: token } = useGetAdminQuery();
  const role = token?.data?.roles[0].name;
  const roleAuthority = token?.data?.roles[0]?.authorities;
  const [isHasWrite, setIsHasWrite] = useState(false);
  const [isHasDelete, setIsHasDelete] = useState(false);
  const [isHasUpdate, setIsHasUpdate] = useState(false);

  // check if authority array contains an object with 'user:write' as its name
  const WriteAuth = roleAuthority?.some(
    (auth) => auth.name === "tutorial:write"
  );
  const updateAuth = roleAuthority?.some(
    (auth) => auth.name === "tutorial:update"
  );
  const deleteAuth = roleAuthority?.some(
    (auth) => auth.name === "tutorial:delete"
  );

  useEffect(() => {
    if (roleAuthority) {
      setIsHasDelete(deleteAuth);
      setIsHasUpdate(updateAuth);
      setIsHasWrite(WriteAuth);
    }
  }, [WriteAuth, deleteAuth, roleAuthority, updateAuth]);

  // handle per page change
  const handlePerRowsChange = (perPage, page) => {
    setPerPage(perPage);
    setCurrentPage(page);
  };

  const handleDelete = async (id) => {
    await deleteReq(id);
    toast.success("Request deleted successfully");
  };
  useEffect(() => {
    if (resData) {
      setData(resData.data.list);
    }
  }, [resData]);

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
      width: "650px",
      height: "auto",
    },
    {
      name: "Created At",
      selector: (row) => moment(row.createdAt).format("d/mm/yyyy"),
      sortable: true,
    },
    {
      name: "IsRead",
      selector: (row) => row.isRead ? <CiRead size={35} /> : <CiUnread size={35} />,
      sortable: true,
    },
    {
      name: "Actions",
      width: "300px",
      cell: (row) => (
        <>
          {isHasDelete ? <DeleteRequestTutorial id={row.id} /> : null}
        </>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];
  if (isLoading) {
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
    <div className="h-screen">
      <DataTable
        columns={columns}
        data={data}
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
    </div>
  );
};

export default ListOfReqDataTable;
