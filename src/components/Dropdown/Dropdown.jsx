import React, { useId, useState, useEffect } from "react";

const PopoverDropdown = ({
  buttonLabel = "Select",
  items = [],
  position = "auto",
  className = "",
  btnClass = "btn",
  widthClass = "w-52",
  onSelect,
  value, // optional controlled value
  label = "",
  required = false,
}) => {
  const popoverId = useId();
  const anchorName = `--anchor-${popoverId}`;
  const [selectedValue, setSelectedValue] = useState(value || null);

  useEffect(() => {
    if (value !== undefined) {
      setSelectedValue(value);
    }
  }, [value, items]);
  const handleSelect = (item) => {
    setSelectedValue(item.value);
    onSelect && onSelect(item.value, item);
  };

  // Determine button label and style
  const selectedLabel =
    items.find((item) => item.value === selectedValue)?.label || buttonLabel;
  const isPlaceholder = !selectedValue;

  return (
    <div className="relative w-full py-[4px]">
      <div className="text-[12px]  font-bold ">
        {label && (
          <legend className="fieldset-legend  mb-[px]   w-fit">
            {label}
            {required && <span className="text-error">*</span>}
          </legend>
        )}
      </div>
      {/* Trigger Button */}
      <button
        className={`${btnClass} border border-gray-300 h-[40px] rounded px-4 w-full text-[14px] text-left bg-base-100 ${
          isPlaceholder ? "font-medium text-gray-400" : " text-black"
        } flex justify-between items-center`}
        popoverTarget={popoverId}
        style={{ anchorName }}
      >
        {selectedLabel}
        <span className="ml-2">▾</span>
      </button>

      {/* Popover Dropdown */}
      <ul
        id={popoverId}
        popover={position}
        className={`dropdown menu rounded-box bg-base-100 shadow-sm max-h-[200px] overflow-auto absolute ${widthClass} ${className}`}
        style={{ positionAnchor: anchorName }}
      >
        {/* Show No Data Found */}
        {items.length === 0 && (
          <li className="text-center py-1 text-gray-400 select-none">
            No Data Found
          </li>
        )}

        {/* Otherwise list items */}
        {items.length > 0 &&
          items.map((item, idx) => (
            <li key={idx}>
              <a
                onClick={() => handleSelect(item)}
                className={`cursor-pointer ${
                  selectedValue === item.value
                    ? "font-semibold text-primary"
                    : ""
                }`}
              >
                {item.label}
              </a>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default PopoverDropdown;
