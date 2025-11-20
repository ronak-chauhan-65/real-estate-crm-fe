import React from "react";
import InputTag from "./InputTag";
import Dropdown from "../Dropdown/Dropdown";

const RangeSelector = ({
  label,
  required = false,
  fromValue = [],
  toValue,
  unitValue,
  unitItems = [],
  placeholderFrom = "",
  placeholderTo = "",
  onFromChange,
  onToChange,
  onUnitChange,
}) => {
  return (
    <div className="w-full">
      <div className="text-[12px] font-bold">
        {label && (
          <legend className="fieldset-legend w-fit">
            {label}
            {required && <span className="text-error">*</span>}
          </legend>
        )}
      </div>

      <div className="grid grid-cols-12 gap-2">
        {/* FROM */}
        <div className="col-span-4">
          <InputTag
            type="number"
            placeholder={placeholderFrom}
            value={fromValue || ""}
            onChange={(e) => onFromChange(e.target.value)}
          />
        </div>

        {/* TO */}
        <div className="col-span-4">
          <InputTag
            type="number"
            placeholder={placeholderTo}
            value={toValue || ""}
            onChange={(e) => onToChange(e.target.value)}
          />
        </div>

        {/* UNIT */}
        <div className="col-span-4">
          <Dropdown
            items={unitItems}
            buttonLabel={unitValue || "Unit"}
            value={unitValue}
            onSelect={(item) => onUnitChange(item)}
          />
        </div>
      </div>
    </div>
  );
};

export default RangeSelector;
