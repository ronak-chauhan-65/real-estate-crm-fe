import React from "react";
import InputTag from "../../components/Input/InputTag";
import Dropdown from "../../components/Dropdown/Dropdown";

const statusOptions = [
  { label: "Active", value: true },
  { label: "Inactive", value: false },
];

const BconfigurationDrawerContent = React.memo(function ({
  formData,
  handleChange,
  validationObj,
  field, // 👈 tells us which config type is open
}) {
  // 🧠 Define field structure per config type
  const configFieldMap = {
    BUILDING_RESTRICTION: [
      { name: "name", label: "Restriction Name", type: "text" },
    ],
    BUILDING_PROGRESS: [{ name: "name", label: "Progress Name", type: "text" }],
    BUILDING_ARCHITECTURE_TYPE: [
      { name: "name", label: "Architecture Type", type: "text" },
    ],
  };

  const currentFields = configFieldMap[field] || [];

  return (
    <div className="p-4 space-y-4">
      {/* Render all fields dynamically */}
      {currentFields.map((f) => (
        <div key={f.name} className="relative">
          <InputTag
            label={f.label}
            placeholder={`Type your ${f.label.toLowerCase()}`}
            type={f.type}
            value={formData?.name}
            onChange={(e) => handleChange(f.name, e.target.value)}
            required
          />
          {validationObj?.nameError && (
            <p className="text-red-500 text-[12px] absolute bottom-[-17px]">
              {!formData?.name
                ? `${f.label} must be at least 2 characters long`
                : ""}
            </p>
          )}
        </div>
      ))}
    </div>
  );
});

export default BconfigurationDrawerContent;
