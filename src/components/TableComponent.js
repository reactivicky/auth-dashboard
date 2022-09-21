import { useEffect, useState } from "react";
import { useMemo } from "react";
import { useTable } from "react-table";
import axios from "axios";
import * as S from '../styles/Table.styled'

const TableComponent = ({ setLoading, selectedFile, setSelectedFile }) => {
	const [fileData, setFileData] = useState([]);

	const handleRowClick = (file) => {
		setSelectedFile(file);
	};

	const columns = useMemo(
		() => [
			{
				Header: "File Name",
				accessor: "name",
			},
			{
				Header: "Status",
				accessor: "status",
			},
			{
				Header: "Assigned By",
				accessor: "assignedBy",
			},
			{
				Header: "Assigned On",
				accessor: "assignedOn",
			},
		],
		[]
	);

	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true);
				const token = localStorage.getItem("missanToken");
				const headers = {
					Authorization: "Bearer " + token,
					Accept: "application/json",
				};
				const userDetails = await axios.get(
					"https://dms.missancomputer.com:8081/windream.web.api/authentication/IsValidUser",
					{
						headers,
					}
				);
				const payload = {
					Mode: 1,
					Entity: 1,
					Conditions: [
						{
							Column: "szText03",
							Name: "szText03",
							Value: userDetails.data.UserName,
							SearchOperator: 1,
							AutoWildcards: false,
							SearchRelation: 1,
							LeftBrackets: 1,
							RightBrackets: 0,
						},
						{
							Column: "blBool00",
							Name: "Completed",
							Value: null,
							SearchOperator: 1,
							AutoWildcards: false,
							SearchRelation: 1,
							LeftBrackets: 0,
							RightBrackets: 1,
						},
						{
							Column: "dwFlags",
							Value: 2048,
							SearchOperator: 9,
						},
					],
					Sorting: {
						AttributeName: "szLongName",
						Direction: 0,
					},
					AttributeFlags: 0,
					Values: [
						"szLongName",
						"szText03",
						"szText04",
						"szText02",
						"szText26",
						"decTimeStamp00",
					],
					Limit: 0,
				};

				const res = await axios.post(
					"https://dms.missancomputer.com:8081/windream.web.api/search/Search",
					payload,
					{
						headers,
					}
				);
				const fileData = res.data.Result.map((file) => {
					return {
						name: file.Name,
						status: file.Attributes.find(
							(attr) => attr.DisplayName === "Status"
						).Value,
						assignedBy: file.Attributes.find(
							(attr) => attr.DisplayName === "Assigned By"
						).Value,
						assignedOn: file.Attributes.find(
							(attr) => attr.DisplayName === "Assigned On"
						).Value,
						id: file.Id
					};
				});
				setFileData(fileData);
				setLoading(false);
			} catch (e) {
				console.log(e);
				setLoading(false);
			}
		};
		fetchData();
	}, []);

	const tableInstance = useTable({ columns, data: fileData });

	const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
		tableInstance;
	return (
		<S.FileTable {...getTableProps()}>
			<thead>
				{headerGroups.map((headerGroup) => {
					const { key, ...restHeaderGroupProps } =
						headerGroup.getHeaderGroupProps();
					return (
						<tr key={key} {...restHeaderGroupProps}>
							{headerGroup.headers.map((column) => {
								const { key, ...restColumnProps } = column.getHeaderProps();
								return (
									<th key={key} {...restColumnProps}>
										{column.render("Header")}
									</th>
								);
							})}
						</tr>
					);
				})}
			</thead>
			<tbody {...getTableBodyProps()}>
				{rows.map((row) => {
					prepareRow(row);
					const { key, ...restRowProps } = row.getRowProps();
					return (
						<tr
							className={
								selectedFile.name === row.original.name ? "selected" : ""
							}
							key={key}
							{...restRowProps}
						>
							{row.cells.map((cell) => {
								const { key, ...restCellProps } = cell.getCellProps();
								return (
									<td
										onClick={() => handleRowClick(row.original)}
										key={key}
										{...restCellProps}
									>
										{cell.render("Cell")}
									</td>
								);
							})}
						</tr>
					);
				})}
			</tbody>
		</S.FileTable>
	);
};

export default TableComponent;
