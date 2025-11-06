import React, { useState, useEffect, useRef } from "react";

const PaginationFooter = ({
  total = 100,
  perPageOptions = [10, 20, 30, 50],
  perPage: propPerPage = 20,
  value: propCurrentPage = 1,
  onChange = (v) => {},
  onPerPageChange = () => {},
}) => {
  const [perPage, setPerPage] = useState(propPerPage);
  const [currentPage, setCurrentPage] = useState(propCurrentPage);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const dropdownRef = useRef(null);
  const defaultVisiblePages = 5;

  const totalPages = Math.max(1, Math.ceil(total / perPage));


  const [minPage, setMinPage] = useState(1);
  const [maxPage, setMaxPage] = useState(
    Math.min(defaultVisiblePages, totalPages)
  );

  /** Utility: generate number range */
  const range = (min = 1, max = 1) => {
    const arr = [];
    for (let i = min; i <= max; i++) arr.push(i);
    return arr;
  };

  /** Sync with parent props */
  useEffect(() => setPerPage(propPerPage), [propPerPage]);
  useEffect(() => setCurrentPage(propCurrentPage), [propCurrentPage]);

  /** Adjust visible pages when total or perPage changes */
  useEffect(() => {
    const newTotalPages = Math.ceil(total / perPage);
    const newMax = Math.min(defaultVisiblePages, newTotalPages);
    setMinPage(1);
    setMaxPage(newMax);
    if (currentPage > newTotalPages) setCurrentPage(newTotalPages);
  }, [perPage, total]);

  /** Update parent on page change */
  useEffect(() => {
    onChange(currentPage);
   
  }, [currentPage, onChange]);

  /** Update parent when perPage changes */
  useEffect(() => {
    onPerPageChange(perPage);
  }, [perPage, onPerPageChange]);

  /** Dropdown outside click close */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  /** Pagination range shifting logic */
  useEffect(() => {
    if (currentPage < minPage) {
      setMinPage(currentPage);
      setMaxPage(currentPage + defaultVisiblePages - 1);
    } else if (currentPage > maxPage) {
      setMaxPage(currentPage);
      setMinPage(currentPage - defaultVisiblePages + 1);
    }
  }, [currentPage]);

  /** Handlers */
  const handleRight = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handleLeft = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleSelectPerPage = (value) => {
    setPerPage(value);
    setIsDropdownOpen(false);
    setCurrentPage(1);
  };

  /** Info text */
  const paginationEntries = () => {
    if (total === 0) return "No records found";
    const start = (currentPage - 1) * perPage + 1;
    const end = Math.min(currentPage * perPage, total);
    return `Showing ${start}–${end} of ${total} entries`;
  };

  return (
    <div className="rounded-b-[25px] px-4 border-t py-[1.25rem] bg-accent">
      <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
        {/* Records per page selector */}
        <div className="flex items-center gap-2 sm:justify-center">
          <span>View</span>

          <div ref={dropdownRef} className="relative text-center">
            {isDropdownOpen && (
              <div className="absolute bottom-full mb-2 border rounded-md bg-accent z-10 w-20">
                {perPageOptions.map((opt, ind) => (
                  <div
                    key={opt}
                    className={`p-1 cursor-pointer ${
                      ind !== perPageOptions.length - 1 ? "border-b" : ""
                    } ${
                      opt === perPage
                        ? "bg-info text-accent"
                        : "hover:bg-info/10"
                    }`}
                    onClick={() => handleSelectPerPage(opt)}
                  >
                    {opt}
                  </div>
                ))}
              </div>
            )}

            <div
              className="border rounded-md p-1 flex items-center justify-center gap-1 cursor-pointer"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <span className="text-sm font-medium">{perPage}</span>
              <span className="material-symbols-outlined text-sm">
                keyboard_arrow_down
              </span>
            </div>
          </div>

          <span>records per page</span>
        </div>

        {/* Pagination info and controls */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <h5 className="text-sm opacity-70">{paginationEntries()}</h5>

          <div className="flex items-center gap-2">
            {/* Left arrow */}
            <button
              className={`w-10 h-10 rounded-full flex items-center justify-center border ${
                currentPage === 1
                  ? "pointer-events-none border-secondary text-secondary bg-secondary/10"
                  : "hover:bg-info/10"
              }`}
              onClick={handleLeft}
            >
              <span className="material-symbols-outlined">chevron_left</span>
            </button>

            {/* Page numbers */}
            {range(minPage, Math.min(maxPage, totalPages)).map((pageNum) => (
              <button
                key={pageNum}
                className={`w-10 h-10 rounded-full flex items-center justify-center border ${
                  currentPage === pageNum
                    ? "bg-info text-accent border-info"
                    : "hover:bg-info/10"
                }`}
                onClick={() => setCurrentPage(pageNum)}
              >
                {pageNum}
              </button>
            ))}

            {/* Right arrow */}
            <button
              className={`w-10 h-10 rounded-full flex items-center justify-center border ${
                currentPage === totalPages
                  ? "pointer-events-none border-secondary text-secondary bg-secondary/10"
                  : "hover:bg-info/10"
              }`}
              onClick={handleRight}
            >
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaginationFooter;
