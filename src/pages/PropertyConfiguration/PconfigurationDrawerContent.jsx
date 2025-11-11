import React, { useEffect, useMemo, useState } from "react";
import InputTag from "../../components/Input/InputTag";
import PopoverDropdown from "../../components/Dropdown/Dropdown";
import { getMasterConfigg } from "../../components/APICalls/masterConfig";

const PconfigurationDrawerContent = React.memo(
  function PconfigurationDrawerContent({
    formData,
    handleChange,
    validationObj,
    field,
    dropdownOptions = {},
    refreshDropdown,
  }) {
    const [ConstructionData, setConstructionData] = useState([]);

    const getConstructionData = async () => {
      //   if (
      //     field === "PROPERTY_SPECIFIC_TYPE" ||
      //     field === "PROPERTY_PLAN_TYPE"
      //   ) {
      const params = {
        key: ["PROPERTY_CONSTRUCTION_TYPE"].join(","),
      };

      const response = await getMasterConfigg(params);
      console.log(response, "responseresponse");

      const formatted = response?.data?.data?.PROPERTY_CONSTRUCTION_TYPE?.map(
        (pc) => ({ label: pc.name, value: pc._id })
      );
      setConstructionData(formatted);
      //   }
    };

    useEffect(() => {
      getConstructionData();
      console.log("lisndie helko");
    }, [field, refreshDropdown]);

    const configFieldMap = useMemo(
      () => ({
        PROPERTY_CONSTRUCTION_TYPE: [
          { name: "name", label: "Construction Name", type: "text" },
        ],
        PROPERTY_SPECIFIC_TYPE: [
          { name: "name", label: "Specific Name", type: "text" },
          {
            name: "propertyConstructionType",
            label: "Property Construction Type",
            type: "dropdown",
            required: true,
            items: ConstructionData, // dynamic link
          },
        ],
        PROPERTY_PLAN_TYPE: [
          { name: "name", label: "Property Plan Type", type: "text" },
          {
            name: "propertyConstructionType",
            label: "Property Construction Type",
            type: "dropdown",
            required: true,
            items: ConstructionData, // dynamic link
          },
        ],
        PROPERTY_FOR: [
          { name: "name", label: "Property For Name", type: "text" },
        ],
        PROPERTY_OWNER_TYPE: [
          { name: "name", label: "Owner Type", type: "text" },
        ],
        PROPERTY_FURNITURE_TYPE: [
          { name: "name", label: "Furniture Type", type: "text" },
        ],
        PROPERTY_PRIORITY_TYPE: [
          { name: "name", label: "Priority Type", type: "text" },
        ],
        PROPERTY_SOURCE: [
          { name: "name", label: "Property Source", type: "text" },
        ],
        PROPERTY_MEASUREMENT_TYPE: [
          { name: "name", label: "Property Measurement Type", type: "text" },
        ],
      }),
      [ConstructionData]
    );

    const currentFields = configFieldMap[field] || [];

    return (
      <div className="p-4 space-y-4">
        {currentFields.map((f) => (
          <div key={f.name} className="relative">
            {/* 🔹 Input Fields */}
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

            {/* 🔹 Dropdown Fields */}
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
                {validationObj?.propertyConstructionType && (
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
  }
);

export default PconfigurationDrawerContent;
