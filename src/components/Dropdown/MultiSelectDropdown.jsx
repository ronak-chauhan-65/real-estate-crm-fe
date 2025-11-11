import React, { useId, useState, useEffect } from "react";

const MultiSelectDropdown = ({
  buttonLabel = "Select",
  items = [],
  position = "auto",
  className = "",
  btnClass = "btn",
  widthClass = "w-52",
  onChange,
  value = [], // array of selected values (controlled or uncontrolled)
  label = "",
  required = false,
}) => {
 

  const popoverId = useId();
  const anchorName = `--anchor-${popoverId}`;
  const [selectedValues, setSelectedValues] = useState(value || []);

  useEffect(() => {
    if (Array.isArray(value)) {
      setSelectedValues(value);
    }
  }, [value]);

  const handleToggle = (item) => {
    let updatedValues;
    if (selectedValues.includes(item.value)) {
      updatedValues = selectedValues.filter((v) => v !== item.value);
    } else {
      updatedValues = [...selectedValues, item.value];
    }

    setSelectedValues(updatedValues);
    onChange && onChange(updatedValues, item);
  };

  // Determine button text
  const selectedLabels = items
    ?.filter((item) => selectedValues.includes(item?.value))
    ?.map((item) => item?.label);

  const displayLabel =
    selectedLabels.length > 0
      ? selectedLabels.join(", ")
      : buttonLabel || "Select";

  const isPlaceholder = selectedLabels.length === 0;

  return (
    <div className="relative w-full ">
      {/* Label */}
      {label && (
        <div className="text-[12px] pb-[8px] font-bold">
          <legend className="flex gap-2">
            {label}
            {required && <span className="text-error">*</span>}
          </legend>
        </div>
      )}

      {/* Trigger Button */}
      <button
        className={`${btnClass}  border border-gray-300 h-[40px] rounded bg-base-100  w-full text-[14px] text-left ${
          isPlaceholder ? "font-medium text-gray-400" : "text-black"
        } flex justify-between items-center`}
        popoverTarget={popoverId}
        style={{ anchorName }}
      >
        <span className="truncate">{displayLabel}</span>
        <span className="ml-2">▾</span>
      </button>

      {/* Popover Dropdown */}
      <ul
        id={popoverId}
        popover={position}
        className={`dropdown menu absolute  rounded-box bg-base-100 shadow-sm ${widthClass} ${className}`}
        style={{ positionAnchor: anchorName }}
      >
        {items.map((item, idx) => (
          <li key={idx}>
            <label
              className={`flex items-center gap-2 cursor-pointer px-3 py-1 hover:bg-base-200 rounded ${
                selectedValues.includes(item.value)
                  ? "font-semibold text-primary"
                  : ""
              }`}
            >
              <input
                type="checkbox"
                checked={selectedValues.includes(item.value)}
                onChange={() => handleToggle(item)}
                className="checkbox checkbox-sm"
              />
              <span>{item.label}</span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MultiSelectDropdown;
