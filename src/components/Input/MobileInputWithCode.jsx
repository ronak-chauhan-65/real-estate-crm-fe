import React from "react";
import InputTag from "./InputTag";
import PopoverDropdown from "../Dropdown/Dropdown";

const MobileInputWithCode = ({
  label = "Mobile Number",
  required = false,

  codeValue, // e.g., "+91"
  numberValue, // e.g., "9876543210"

  codeItems = [
    { label: "+91", value: "+91" },
    { label: "+1", value: "+1" },
  ],

  onCodeChange, // update country code
  onNumberChange, // update mobile number
}) => {
  return (
    <div className="relative w-full ">
      {/* LABEL */}
      <div className="text-[12px] font-bold">
        {label && (
          <legend className="fieldset-legend w-fit">
            {label}
            {required && <span className="text-error">*</span>}
          </legend>
        )}
      </div>

      <div className="grid grid-cols-12 gap-2 items-center">
        {/* COUNTRY CODE DROPDOWN */}
        <div className=" sm:col-span-3 xs:col-span-5 col-span-3">
          <PopoverDropdown
            items={codeItems}
            buttonLabel={codeValue || "Code"}
            value={codeValue}
            onSelect={(item) => onCodeChange(item)}
          />
        </div>

        {/* MOBILE NUMBER INPUT */}
        <div className="sm:col-span-9 xs:col-span-7 col-span-9">
          <InputTag
            type="number"
            placeholder="Enter mobile number"
            value={numberValue || ""}
            onChange={(e) => {
              const val = e.target.value;

              // allow max 10 digits
              if (val.length <= 10) {
                onNumberChange(val);
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default MobileInputWithCode;
