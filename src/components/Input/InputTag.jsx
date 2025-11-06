import React from "react";

const InputTag = ({
  label,
  type = "text",
  placeholder = "",
  value,
  onChange,
  className = "",
  required = false,
  disabled = false,
}) => {
  return (
    <div className={`w-full ${className}`}>
      <fieldset className="fieldset">
        {label && (
          <legend className="fieldset-legend">
            {label} {required && <span className="text-error">*</span>}
          </legend>
        )}
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          className="input w-full"
        />
      </fieldset>
    </div>
  );
};

export default InputTag;
