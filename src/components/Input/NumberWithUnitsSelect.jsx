import React, { useState, useEffect } from "react";

export default function NumberWithUnitsSelect({
  label,
  placeholder,
  required,
  value, // value coming from parent (edit mode)
  onChange,
}) {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const units = [
    { label: "Thousand", multiplier: 1000 },
    { label: "Lakh", multiplier: 100000 },
    { label: "Crore", multiplier: 10000000 },
  ];

  /* 🔥 Sync input with EDIT value */
  useEffect(() => {
    if (!value) return;

    if (typeof value === "string") {
      // e.g. "5 Crore"
      setInputValue(value);
    } else if (value.display) {
      // e.g. {display: "5 Crore", value: 50000000}
      setInputValue(value.display);
    }
  }, [value]);

  const handleInputChange = (e) => {
    const val = e.target.value;
    setInputValue(val);

    if (!isNaN(val) && val !== "") setOpen(true);
    else setOpen(false);
  };

  const handleSelect = (unit) => {
    const finalLabel = `${inputValue} ${unit.label}`;
    const finalNumber = Number(inputValue) * unit.multiplier;

    onChange({
      display: finalLabel,
      value: finalNumber,
    });

    setInputValue(finalLabel);
    setOpen(false);
  };

  return (
    <div className="relative w-full">
      {label && (
        <legend className="text-[12px] py-[8px] w-fit fieldset-legend">
          {label}
          {required && <span className="text-error">*</span>}
        </legend>
      )}

      <input
        type="text"
        className="input input-bordered w-full mt-1 focus:outline-none focus:ring-0"
        placeholder={placeholder}
        value={inputValue}
        onChange={handleInputChange}
      />

      {open && inputValue && !isNaN(inputValue) && (
        <div className="absolute w-full bg-base-100 border rounded shadow-md mt-1 z-50 p-1">
          {units.map((u, index) => (
            <div
              key={index}
              className="p-2 hover:bg-gray-200 cursor-pointer rounded text-[14px]"
              onClick={() => handleSelect(u)}
            >
              {inputValue} {u.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
