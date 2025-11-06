import React, { useState, useEffect, useCallback } from "react";
import PaginationFooter from "../Pagination/PaginationFooter";

const Table = React.memo(
  ({
    tableHeaderData = [],
    totalData = 0,
    currentPage = 1,
    perPage = 20,
    showPagination = true,
    sortKey = "",
    sortValue = "",
    scrollToTop = true,
    noDataFound = false,
    onSort = () => {},
    onPageChange = () => {}, // ✅ add new prop
    onPerPageChange = () => {}, // ✅ optional if you want to handle per-page outside
    children,
  }) => {
    const [page, setPage] = useState(currentPage);
    const [rowsPerPage, setRowsPerPage] = useState(perPage);
    const [sortingDirection, setSortingDirection] = useState(
      sortValue === "asc" ? "asc" : sortValue === "desc" ? "desc" : ""
    );
    const [selectedTitle, setSelectedTitle] = useState(sortKey);

    useEffect(() => {
      setPage(currentPage);
    }, [currentPage]);

    useEffect(() => {
      setRowsPerPage(perPage);
    }, [perPage]);

    // ✅ call parent when page changes
    useEffect(() => {
      if (page !== currentPage) {
        onPageChange(page);
      }
    }, [page]);

    // ✅ call parent when rowsPerPage changes
    useEffect(() => {
      onPerPageChange(rowsPerPage);
    }, [rowsPerPage]);

    const handleSort = useCallback(
      (title) => {
        let newDirection = "asc";

        // toggle between asc/desc
        if (selectedTitle === title) {
          newDirection = sortingDirection === "asc" ? "desc" : "asc";
        }

        setSelectedTitle(title);
        setSortingDirection(newDirection);
        onSort(title, newDirection);
      },
      [onSort, selectedTitle, sortingDirection]
    );

    // scroll to table on page/perPage change
    useEffect(() => {
      if (scrollToTop) {
        const element = document.getElementById("review-table-mnv");
        element?.scrollIntoView({ block: "end", inline: "nearest" });
      }
    }, [totalData, page, rowsPerPage, scrollToTop]);

    const paginationEntries = ({ perPage, currentPage, total }) => {
      if (!total) return "No records found";
      const start = (currentPage - 1) * perPage + 1;
      const end = Math.min(currentPage * perPage, total);
      return `Showing ${start}-${end} of ${total} records`;
    };

    return (
      <div className=" h-full ">
        <table
          className={`table-auto w-full ${noDataFound ? "h-full" : ""}`}
          style={{ display: "table" }}
        >
          {/* Table Header */}
          <thead id="review-table-mnv " className="border-b h-[80px] ">
            <tr>
              {tableHeaderData.map((val, ind) => (
                <th
                  key={ind}
                  className={`py-[1.5rem] text-left    ${
                    ind === 0
                      ? "px-[2rem]"
                      : ind === tableHeaderData.length - 1
                      ? "pr-[2rem]"
                      : ""
                  } ${val?.stickyleft ? "sticky left-0 bg-accent" : ""} ${
                    val?.stickyRight ? "sticky right-0 bg-accent" : ""
                  } ${val?.center ? "text-center" : ""}`}
                >
                  {val.isSort ? (
                    <div
                      className={`flex items-center gap-2 ${
                        totalData ? "cursor-pointer" : "pointer-events-none"
                      }`}
                      onClick={() => handleSort(val.name)}
                      role="button"
                      tabIndex={0}
                    >
                      <h5 className="font-[500]">{val.name}</h5>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        className={`${
                          !totalData
                            ? "fill-gray-400"
                            : "fill-current text-info"
                        }`}
                      >
                        {selectedTitle === val.name ? (
                          sortingDirection === "asc" ? (
                            <path d="M12 0l8 10h-16l8-10z" />
                          ) : (
                            <path d="M12 24l-8-10h16l-8 10z" />
                          )
                        ) : (
                          <path d="M12 0l8 10h-16l8-10zm0 24l-8-10h16l-8 10z" />
                        )}
                      </svg>
                    </div>
                  ) : (
                    <h5 className="font-[500]">{val.name}</h5>
                  )}
                </th>
              ))}
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="p-[1rem]">{children}</tbody>
        </table>

        {/* Pagination */}
        {showPagination && totalData > 0 && (
          <PaginationFooter
            total={totalData}
            perPage={rowsPerPage}
            value={page}
            onChange={(v) => setPage(v)}
            onPerPageChange={setRowsPerPage}
          />
        )}
      </div>
    );
  }
);

export default Table;
