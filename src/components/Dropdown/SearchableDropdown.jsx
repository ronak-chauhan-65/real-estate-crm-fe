import React, { useEffect, useRef, useState } from "react";

const SearchableDropdown = ({
  buttonLabel = "Select",
  items = [],
  position = "bottom",
  className = "",
  btnClass = "btn",
  widthClass = "w-52",
  onSelect,
  value,
  label = "",
  required = false,
  searchable = true,
  placeholder = "Search items...",
  minCharsToOpen = 3,
  isplaceholder = "swel",
  onSearchChange, // 👈 parent callback for search term
}) => {
  const [selectedValue, setSelectedValue] = useState(value || null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Sync value from parent
  useEffect(() => {
    if (value !== undefined) setSelectedValue(value);
  }, [value]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (searchTerm.length >= minCharsToOpen) {
      onSearchChange?.(searchTerm);
    }
  }, [searchTerm, minCharsToOpen, onSearchChange]);

  const handleSelect = (item) => {
    setSelectedValue(item._id);
    onSelect?.(item._id, item); // Pass id + full item (for optional extra info)
    setIsOpen(false);
    setSearchTerm("");
  };

  const selectedItem = items.find((i) => i._id === selectedValue);
  const selectedLabel = selectedItem?.area || buttonLabel;

  return (
    <div className="relative w-full py-[4px]" ref={dropdownRef}>
      {label && (
        <legend className="text-[12px] py-[8px] font-bold my-[-2px] w-fit">
          {label}
          {required && <span className="text-error">*</span>}
        </legend>
      )}

      <button
        type="button"
        className={`${btnClass} border border-gray-300 h-[40px] rounded px-3 w-full text-[14px] text-left bg-base-100 ${
          placeholder ? "font-medium text-gray-400" : "text-black"
        } flex justify-between items-center`}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {selectedLabel}
        <span className="ml-2">▾</span>
      </button>

      {isOpen && (
        <div
          className={`absolute ${
            position === "top" ? "bottom-[105%]" : "top-[105%]"
          } left-0 z-20 bg-base-100 border border-gray-200 rounded-md shadow-md p-2 ${widthClass} ${className}`}
        >
          {searchable && (
            <input
              type="text"
              placeholder={isplaceholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full mb-2 px-3 py-2 text-gray-800 border rounded-md border-gray-300 focus:outline-none focus:ring-1 focus:ring-info-400"
            />
          )}

          <ul className="max-h-48 overflow-y-auto">
            {items.length > 0 ? (
              items.map((item, idx) => (
                <li key={idx}>
                  <a
                    onClick={() => handleSelect(item)}
                    className={`block px-4 py-2 rounded-md cursor-pointer text-[14px] hover:bg-info/10 active:bg-blue-100 ${
                      selectedValue === item.area
                        ? "font-semibold text-primary"
                        : "text-gray-700"
                    }`}
                  >
                    {item.area}
                  </a>
                </li>
              ))
            ) : (
              <p className="text-gray-400 text-sm px-4 py-2">
                No matches found
              </p>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchableDropdown;
