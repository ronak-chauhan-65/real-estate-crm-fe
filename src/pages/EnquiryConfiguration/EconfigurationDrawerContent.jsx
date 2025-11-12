import React from "react";
import InputTag from "../../components/Input/InputTag";
import Dropdown from "../../components/Dropdown/Dropdown";
import PopoverDropdown from "../../components/Dropdown/Dropdown";
import { itemCategoryOptions } from "./ItemCategoryOptions";

const statusOptions = [
  { label: "Active", value: true },
  { label: "Inactive", value: false },
];

const EconfigurationDrawerContent = React.memo(function ({
  formData,
  handleChange,
  validationObj,
  field, // 👈 tells us which config type is open
}) {
  // 🧠 Define field structure per config type
  const configFieldMap = {
    ENQUIRY_SALES_COMMENT: [
      { name: "name", label: "Enquiry Name", type: "text", required: true },
      {
        name: "itemCategory",
        label: "Item Category",
        type: "dropdown",
        required: true,
        items: itemCategoryOptions(),
      },
    ],
  };

  const currentFields = configFieldMap[field] || [];

  return (
    <div className="p-4 space-y-4">
      {/* Render all fields dynamically */}
      {currentFields.map((f) => (
        <div key={f.name} className="relative">
          {["text", "number", "email"].includes(f.type) && (
            <div className="relative">
              <InputTag
                label={f.label}
                placeholder={`Type your ${f.label.toLowerCase()}`}
                type={f.type}
                value={formData?.name || ""}
                onChange={(e) => handleChange(f.name, e.target.value)}
                required
              />
              {validationObj?.nameError && !formData.name && (
                <p className="text-red-500 text-[12px] absolute bottom-[-17px]">
                  Name must be at least 2 characters long
                </p>
              )}
            </div>
          )}

          {f.type === "dropdown" && (
            <div className="relative">
              <PopoverDropdown
                label={f.label}
                required={f.required}
                items={f.items || []}
                buttonLabel={formData?.[f.name]?.name || f.label}
                value={formData?.[f.name]}
                onSelect={(item) => handleChange(f.name, item)}
                widthClass="w-[90%]"
              />
              {validationObj?.itemCategoryError && !formData.itemCategory && (
                <p className="text-red-500 text-[12px] absolute bottom-[-17px]">
                  Property Construction Type is required
                </p>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
});

export default EconfigurationDrawerContent;
