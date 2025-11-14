import React, { useRef, useState } from "react";
import useClickOutside from "../../CustomHook/useClickOutside";

const CombinedInputDropdown = ({
  label,
  placeholder = "",
  inputValue,
  dropdownValue,
  dropdownItems = [],
  required = false,
  disabled = false,
  onInputChange,
  onDropdownChange,
}) => {
  const [open, setOpen] = useState(false);

  const ref = useRef();

  useClickOutside(ref, () => setOpen(false));

  return (
    <div className="w-full">
      <fieldset className="fieldset">
        {label && (
          <legend className="fieldset-legend">
            {label} {required && <span className="text-error">*</span>}
          </legend>
        )}

        <div className="flex gap-2">
          {/* Input */}
          <input
            type="text"
            value={inputValue || ""}
            onChange={(e) => onInputChange(e.target.value)}
            placeholder={placeholder}
            disabled={disabled}
            className="input w-full"
          />

          {/* Custom Dropdown */}
          <div className="relative w-[160px] " ref={ref}>
            <button
              type="button"
              className="input w-full h-[40px] flex justify-between items-center"
              onClick={() => setOpen(!open)}
            >
              {dropdownItems.find((i) => i.value === dropdownValue)?.label ||
                "Select"}
              <span>▾</span>
            </button>

            {/* Options - same width as button */}
            {open && (
              <ul
                className="
                  absolute 
                  top-[105%] 
                  left-0 
                  w-full 
                  bg-base-100 
                  border 
                  rounded-lg 
                  shadow 
                  z-[50] 
                  max-h-40 

                  overflow-auto
                "
              >
                {dropdownItems.map((item, idx) => (
                  <li
                    key={idx}
                    onClick={() => {
                      onDropdownChange(item.value);
                      setOpen((prev) => !prev);
                    }}
                    className="px-3 py-2 cursor-pointer hover:bg-info/10 text-sm "
                  >
                    {item.label}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </fieldset>
    </div>
  );
};

export default CombinedInputDropdown;
