import React, { useId, useState, useEffect, useRef } from "react";

const PopoverDropdown = ({
  buttonLabel = "Select",
  items = [],
  position = "auto",
  className = "",
  btnClass = "btn",
  onSelect,
  value,
  label = "",
  required = false,
}) => {
  const popoverId = useId();
  const anchorName = `--anchor-${popoverId}`;
  const [selectedValue, setSelectedValue] = useState(value || null);

  const buttonRef = useRef(null);
  const [dropdownWidth, setDropdownWidth] = useState("auto");

  useEffect(() => {
    if (value !== undefined) {
      setSelectedValue(value);
    }
  }, [value, items]);

  // Measure button width
  useEffect(() => {
    if (buttonRef.current) {
      setDropdownWidth(buttonRef.current.offsetWidth + "px");
    }
  });

  const handleSelect = (item) => {
    setSelectedValue(item.value);
    onSelect && onSelect(item.value, item);
  };

  const selectedLabel =
    items.find((item) => item.value === selectedValue)?.label || buttonLabel;
  const isPlaceholder = !selectedValue;

  return (
    <div className="relative w-full py-[4px]">
      <div className="text-[12px] font-bold">
        {label && (
          <legend className="fieldset-legend w-fit">
            {label}
            {required && <span className="text-error">*</span>}
          </legend>
        )}
      </div>

      {/* Trigger Button */}
      <button
        ref={buttonRef}
        className={`${btnClass} border border-gray-300 h-[40px] rounded px-4 w-full text-[14px] text-left bg-base-100 ${
          isPlaceholder ? "font-medium text-gray-400" : "text-black"
        } flex justify-between items-center`}
        popoverTarget={popoverId}
        style={{ anchorName }}
      >
        {selectedLabel}
        <span className="ml-2">▾</span>
      </button>

      {/* Dropdown */}
      <ul
        id={popoverId}
        popover={position}
        className={`dropdown menu rounded-box bg-base-100 shadow-sm max-h-[200px] overflow-auto absolute ${className}`}
        style={{
          positionAnchor: anchorName,
          width: dropdownWidth, // 👈 MATCH BUTTON WIDTH
        }}
      >
        {items.length === 0 && (
          <li className="text-center py-1 text-gray-400 select-none">
            No Data Found
          </li>
        )}

        {items.map((item, idx) => (
          <li key={idx}>
            <a
              onClick={() => handleSelect(item)}
              className={`cursor-pointer px-2 py-1 rounded 
        ${
          selectedValue === item.value
            ? "bg-primary/20 text-primary font-semibold"
            : "hover:bg-base-200"
        }
      `}
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
