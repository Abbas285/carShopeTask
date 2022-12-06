import React, { useEffect, useMemo } from "react";
import { useTable, useSortBy, usePagination } from "react-table";
// import "./table.css";
export const SortingTable = ({
  handleUpdate,
  handleRemove,
  handleDetails,
  tabledata,
}) => {
  const COLUMNS = useMemo(() => {
    return [
      {
        Header: "User Name",
        accessor: "userName",
        sticky: "left",
      },
      {
        Header: "userEmail",
        accessor: "userEmail",
        sticky: "left",
      },
      {
        Header: "carColor",
        accessor: "carColor",
      },
      {
        Header: "carModel",
        accessor: "carModel",
      },
      {
        Header: "carRegistration",
        accessor: "carRegistration",
      },

      {
        Header: "Update Order",
        Cell: (props) => {
          const rowdata = props.row.original;
          return (
            <button
              onClick={() => handleUpdate(rowdata)}
              className="b-reactTable-container__buttontUbdate"
            >
              update Recourd
            </button>
          );
        },
      },
      {
        Header: "Remove",
        Cell: (props) => {
          const rowdata = props.row.original;
          return (
            <button
              onClick={() => handleRemove(rowdata)}
              className="b-reactTable-container__buttontRemove"
            >
              delete
            </button>
          );
        },
      },
      {
        Header: "Detail",
        Cell: (props) => {
          const rowdata = props.row.original;
          return (
            <button
              onClick={() => handleDetails(rowdata)}
              className="b-reactTable-container__buttontDetails"
            >
              DetailView
            </button>
          );
        },
      },
    ];
  }, [handleDetails, handleRemove, handleUpdate]);
  const columns = useMemo(() => COLUMNS, [COLUMNS]);
  const data = useMemo(() => tabledata, [tabledata]);

  const {
    getTableProps,
    getTableBodyProps,
    page,
    nextPage,
    previousPage,
    canPreviousPage,
    canNextPage,
    gotoPage,
    pageCount,
    setPageSize,
    headerGroups,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },
    useSortBy,
    usePagination
  );
  useEffect(() => {
    setPageSize(4);
  }, [setPageSize]);

  let previousButton = "b-reactTable-container__previous";
  let previousButtonIcion = "b-reactTable-container__previousIccon";
  let nextButton = "b-reactTable-container__next";
  let nextButtonIccon = "b-reactTable-container__nextIccon";
  if (!canPreviousPage) {
    previousButton = "b-reactTable-container__previousDisable";
    previousButtonIcion = "b-reactTable-container__previousIcconDisable";
  }
  if (!canNextPage) {
    nextButton = "b-reactTable-container__nextDisable";
    nextButtonIccon = "b-reactTable-container__nextIcconDisable";
  }
  return (
    <>
      <table {...getTableProps()} className="b-reactTable-container">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? " 🔽"
                        : " 🔼"
                      : ""}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="b-reactTable-container__pagination">
        <div>
          <button
            onClick={() => gotoPage(0)}
            disabled={!canPreviousPage}
            className={previousButtonIcion}
          >
            {"<"}
          </button>{" "}
          <button
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
            className={previousButton}
          >
            Previous
          </button>{" "}
          <button
            onClick={() => nextPage()}
            disabled={!canNextPage}
            className={nextButton}
          >
            Next
          </button>{" "}
          <button
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
            className={nextButtonIccon}
          >
            {">"}
          </button>{" "}
        </div>
      </div>
    </>
  );
};
