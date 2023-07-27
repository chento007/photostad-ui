"use client"
import { useMemo } from "react";
import DataTable, { createTheme } from "react-data-table-component"
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { useTheme } from "next-themes";
import React, { useState, useEffect } from "react";
import moment from "moment";
import { BASE_URL } from "@/lib/baseUrl";
import DateRangeSelector from "../datetimecomponent/DateRangeSelector";
import { useGetCertificateQuery } from "@/store/features/certificate/certificateApiSlice";
import TableSkeleton from "../loading/TableSkeleton";
import { useGetUserByIdQuery } from "@/store/features/user/userApiSlice";
import axios from "axios";
import Loading from "@/app/loading";

 

const CertificateDataTable = () => {
	const [page, setPage] = useState(1)  // for pagination
	const [limit, setLimit] = useState(10) // for limit in pagination
	const [userId, setUserId] = useState(127)
	const { data: certificate, isError, isLoading, isSuccess } = useGetCertificateQuery({ page: page, limit: limit })
	const { data: user } = useGetUserByIdQuery(userId)
	console.log(certificate?.data?.list, 'certificate');

	useEffect(() => {
		if (isSuccess) {
			setData(certificate?.data?.list);
		}

	}, [certificate?.data?.list, isSuccess])

	const [data, setData] = useState([]);

	const [dateRage, setDateRange] = useState({
		startDate: null,
		endData: null
	})


	const columns = [
		{
			name: "Certificate ID",
			selector: row => row.id,
			sortable: true,
		},
		{
			name: "Format",
			selector: row => row.format,
			sortable: true,
		},
		{
			name: "Compression Size ",
			selector: row => row.compression,
			sortable: true,
		},
		{
			name: "Date",
			selector: row => moment(row.createdAt).format("YYYY-MM-DD"),
			sortable: true,
		},
		{
			name: "Username",
			selector: row => (row.userDownload && row.userDownload.username != null) ? row.userDownload.username : "No Name",
			sortable: true,
		},
	]


	const subHeaderComponentMemo = useMemo(() => {

		return (

			<div className="absolute left-0 m-0 p-0">
				<DateRangeSelector />
			</div>

		)
	}, [])
	const customeStylesLight = {
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
	}
	const customeStyleDark = {
		subHeader: {
			style: {
				padding: 0,
				margin: 0,
			}
		},
		headCells: {
			style: {
				fontSize: "16px",
			},
		},
		//set odd row background color to whitesmoke and even row to white
		rows: {
			style: {
				backgroundColor: "#111c44",
				"&:nth-child(odd)": {
					backgroundColor: "#0b1437",
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
					color: 'black'
				}

			}
		},
		table: {
			style: {
				borderRadius: '16px'
			}
		}
	}

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
	})
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


	})

	const themeColor = useTheme()
	
	const handleLimitPageChange = (limit, page) => {
		setLimit(limit)
		setPage(page)
	}

	if (isLoading) {
		return <TableSkeleton />
	}
	if (isError) {
		return <div>error</div>
	}

	return (
		isLoading ? (
			<> {/* Empty fragment when isLoading is true */}
				Loading ...
			</>
		) : (
			<DataTable
				columns={columns}
				data={data}
				title="Generated Certificate Overview"
				pagination
				paginationServer
				paginationTotalRows={certificate?.data?.total} // back to change soon
				onChangePage={(page) => setPage(page)}
				onChangeRowsPerPage={handleLimitPageChange}
				subHeader
				highlightOnHover
				subHeaderComponent={subHeaderComponentMemo}
				theme={themeColor.theme === "dark" ? "dark" : "light"}
				customStyles={
					themeColor.theme === "dark" ? customeStyleDark : customeStylesLight
				}
			/>
		)
	);

}

export default CertificateDataTable;