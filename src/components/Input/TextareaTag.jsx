import React from "react";

const TextareaTag = ({
  label,
  placeholder = "",
  value,
  onChange,
  className = "",
  required = false,
  disabled = false,
  rows = 3,
}) => {
  return (
    <div className={`w-full ${className}`}>
      <fieldset className="fieldset">
        {label && (
          <legend className="fieldset-legend">
            {label} {required && <span className="text-error">*</span>}
          </legend>
        )}
        <textarea
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          rows={rows}
          className="textarea textarea-bordered w-full focus:outline-none focus:ring-0"
        />
      </fieldset>
    </div>
  );
};

export default TextareaTag;
