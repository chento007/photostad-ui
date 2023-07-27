"use client";
import React, { useEffect, useMemo, useState } from "react";
import DataTable, { createTheme } from "react-data-table-component";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file

import { useTheme } from "next-themes";
import axios from "axios";
import { BASE_URL } from "@/lib/baseUrl";
import DateRangeSelector from "../datetimecomponent/DateRangeSelector";
import moment from "moment";
import { useGetWatermarkQuery } from "@/store/features/watermark/watermarkApiSlice";


const WatermarkDataTable = () => {
    const [page, setPage] = useState(1)  // for pagination
	  const [limit, setLimit] = useState(10) // for limit in pagination
    const [data, setData] = useState([]);
	  const { data: watermark, isError, isLoading, isSuccess } = useGetWatermarkQuery({ page: page, limit: limit });

    useEffect(() => {

		if (isSuccess) {
			setData(watermark?.data?.list);
		}

	}, [watermark?.data?.list, isSuccess])
  const handlePerRowsChange = (perPage, page) => {
    setLimit(perPage);
    setPage(page);
  };

  const handleLimitPageChange = (limit, page) => {
		setLimit(limit)
		setPage(page)
	}

  const subHeader = React.useMemo(() => {
    return (
      <div className="absolute left-0">
        <DateRangeSelector />
      </div>
    );
  }, []);
	const columns = [
		{
			name: "Watermark ID",
			selector: row => row.id,
			sortable: true,
		},
		{
			name: "Format",
			selector:row => row.format,
			sortable: true,
		},
		{
			name: "Compression size ",
			selector:  row => row.compression,
			sortable: true,
		},
		{
			name: "Date",
			selector: row => moment(row.downloadAt).format("YYYY-MM-DD"),
			sortable: true,
		},
    {
			name: "Username",
      selector: row => (row.userDownload && row.userDownload.username != null) ? row.userDownload.username : "No Name",
			sortable: true,
		},
	]
  const customeStylesLight = {
    subHeader: {
      style: {
        padding: "0",
        margin: "0",
      },
    },
    headCells: {
      style: {
        fontSize: "16px",
      },
    },
    header: {
      style: {
        padding: 0,
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
    subHeader: {
      style: {
        padding: 0,
        margin: 0,
      },
    },
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
    select: {
      style: {
        color: "black",
      },
    },
    header: {
      style: {
        padding: 0,
      },
    },
    pagination: {
      style: {
        backgroundColor: "#0b1437",
        color: "white",
      },
      paginationButton: {
        style: {
          backgroundColor: "white",
          color: "black",
        },
      },
      paginationButtonActive: {
        style: {
          backgroundColor: "blue",
          color: "white",
        },
      },
      paginationSelect: {
        style: {
          color: "black",
        },
      },
    },
    table: {
      style: {
        borderRadius: "16px",
      },
    },
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

    // set body borderRadius to 16px
  });
  const themeColor = useTheme();

  return (
   isLoading ? (<>Loading</>) : 
   ( <DataTable
      title="Generated Watermark Overview"
      columns={columns}
      data={data}
      pagination
      paginationServer
      paginationTotalRows={watermark?.data?.total}
      onChangeRowsPerPage={handleLimitPageChange}
      responsive
      subHeader
      onChangePage={(page) => setPage(page)}
      highlightOnHover
      subHeaderComponent={subHeader}
      theme={themeColor.theme === "dark" ? "dark" : "light"}
      customStyles={
        themeColor.theme === "dark" ? customeStyleDark : customeStylesLight
      }
    />)
  );
};

export default WatermarkDataTable;
  // const fetchCertificate = () => {
  //   var requestOptions = {
  //     method: "GET",
  //     redirect: "follow",
  //   };

  //   fetch(
  //     `${BASE_URL}/statistics/watermark-download?page=1&limit=10`,
  //     requestOptions
  //   )
  //     .then((response) => response.json())
  //     .then((result) => setData(result.data.list))
  //     .catch((error) => console.log("error", error));
   
  // };
  // useEffect(() => {
  //   fetchCertificate();
  // }, []);