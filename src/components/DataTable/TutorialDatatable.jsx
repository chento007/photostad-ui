"use client";
import { useTheme } from "next-themes";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import DataTable, { createTheme } from "react-data-table-component";
import DeleteIcon from "@/components/icon/DeleteIcon";
import {
  useCreateTutorialMutation,
  useDeleteTutorialMutation,
  useGetTutorialQuery,
} from "@/store/features/tutorial/tutorialApiSlice";
import AddNewModal from "../modal/tutorial/AddNewModal";
import UpdateModal from "../modal/update/UpdateModal.jsx/UpdateModal";
import SeoModal from "../modal/tutorial/SeoModal";
import DateRangeSelector from "../datetimecomponent/DateRangeSelector";
import moment from "moment";
import { useGetAdminQuery } from "@/store/features/auth/authApiSlice";
import DeleteTutorial from "./components/DeleteTutorial";
import DeletModal from "../modal/tutorial/DeleteModal";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { TbSeo } from "react-icons/tb";
import { toast } from "react-toastify";
import LoadingSkeleton from "../loading/LoadingSkeleton";
import Loading from "../loading/Loading";
export function TutorialDatatable() {

  const [products, setProducts] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);


  const [createTutorial, { isLoading: submitting }] =
    useCreateTutorialMutation();

    
  const { data: token } = useGetAdminQuery();
  const role = token?.data?.roles[0].name;
  const roleAuthority = token?.data?.roles[0]?.authorities;
  const { data } = useGetAdminQuery();
  const [isHasWrite, setIsHasWrite] = useState(false);
  const [isHasDelete, setIsHasDelete] = useState(false);
  const [isHasUpdate, setIsHasUpdate] = useState(false);
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

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

  // console.log("object", isHasWrite, isHasUpdate, isHasDelete);

  // check protect api route
  const [name, setName] = useState("");

  const {
    data: tutorials,
    isLoading,
    isSuccess,
  } = useGetTutorialQuery({ page: currentPage, perPage: perPage, name: name });

  const [page, setPage] = useState(1);

  const [deleteTutorial, { isLoading: isDeleting }] =
    useDeleteTutorialMutation();

  const handleInformUnauthorize = () => {
    toast.error("You don't have permission to do this action");
  };

  const filteredItems = tutorials?.data?.list?.filter(
    (item) =>
      item.name && item.name.toLowerCase().includes(filterText.toLowerCase())
  );

  // handle page change

  const handlePageChange = (page) => {
    console.log(page, "page");
    setCurrentPage(page);
  };
  console.log(currentPage, "current page");
  // handle per page change
  const handlePerRowsChange = (perPage, page) => {
    setPerPage(perPage);
    setCurrentPage(page);
  };

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

  const columns = [
    {
      name: "Title",
      selector: (row) => row.name,
    },
    {
      name: "Views",
      selector: (row) => row.viewCount,
    },
    {
      name: "Created at",
      selector: (row) => moment(row.createdAt).format("DD/MM/YYYY"),
    },
    // {
    //   name: "Updated at",
    //   selector: (row) => row.updatedAt?row.updatedAt:"Not updated yet",
    // },
    {
      name: "Actions",
      selector: (row) => (
        <div className="flex flex-nowrap justify-center items-center gap-2">
          {/* <SeoModal id={row.id} />
          <UpdateModal id={row.id} /> */}
          {/* <DeletModal id={row.id} /> */}
          {isHasUpdate ? <SeoModal id={row.id} /> : null}
          {isHasUpdate ? <UpdateModal

            id={row.id}
            name={row.name}
            description={row.description}
            title={row.title}
            htmlContent={row.htmlContent}
            thumbnail={row.thumbnail}
            userData={data} /> : null}

          {/* <DeletModal id={row.id} /> */}
          {isHasDelete ? <DeletModal id={row.id} /> : null}
        </div>
      ),
    },
  ];

  // safe
  const subHeaderComponentMemo = React.useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };

    return (
      <div className="flex justify-between z-30 flex-wrap w-full p-0 ">
        <form className="flex items-center">
          <label htmlFor="simple-search" className="sr-only">
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                aria-hidden="true"
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
            <input
              onChange={(e) => {
                setName(e.target.value);
                setFilterText(e.target.value);
              }}
              onClear={handleClear}
              filterText={filterText}
              type="text"
              id="simple-search"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-secondary  dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search by title"
              required
            />
          </div>
          {/* <DateRangeSelector /> */}
        </form>
        {isHasWrite ? <AddNewModal userData={data} /> : null}

        {/* <AddNewModal /> */}
      </div>
    );
  }, [filterText, isHasWrite, resetPaginationToggle]);

  // safe to use
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
    subHeader: {
      style: {
        padding: "0px",
        margin: "0px",
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
    subHeader: {
      style: {
        padding: 0,
        margin: 0,
      },
    },
  };
  // chage theme of the table to dark and light
  const themeColor = useTheme();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <DataTable
        style={{ backgroundColor: "black" }}
        columns={columns}
        data={filteredItems}
        pagination
        highlightOnHover
        paginationServer
        paginationTotalRows={tutorials?.data?.total}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handlePerRowsChange}
        paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
        subHeader
        subHeaderComponent={subHeaderComponentMemo}
        // theme={ `theme === 'dark' ? 'dark' : 'light'`}
        // if themeColor.theme === 'dark' ? 'dark' : 'light'
        theme={themeColor.theme === "dark" ? "dark" : "light"}
        customStyles={
          themeColor.theme === "dark" ? customeStyleDark : customeStylesLight
        }
      />
    </>
  );
}
